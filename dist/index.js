// src/shared/constants.ts
var STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
var MOJANG_API = {
  SESSION_SERVER: "https://sessionserver.mojang.com/session/minecraft/profile"
};
var SKIN_DIMENSIONS = {
  LEGACY: { width: 64, height: 32 },
  MODERN: { width: 64, height: 64 }
};
var HEAD_REGIONS = {
  /** Base head layer */
  BASE: { x: 8, y: 8, width: 8, height: 8 },
  /** Overlay/hat layer (modern skins only) */
  OVERLAY: { x: 40, y: 8, width: 8, height: 8 }
};
var DEFAULT_OPTIONS = {
  size: 64,
  includeOverlay: true,
  fallbackUuid: STEVE_UUID
};

// src/shared/utils.ts
function validateUuid(uuid) {
  const cleanUuid = uuid.replace(/-/g, "");
  if (!/^[0-9a-f]{32}$/i.test(cleanUuid)) {
    throw new Error(`Invalid UUID format: ${uuid}`);
  }
  return cleanUuid;
}
function formatUuid(uuid) {
  const clean = validateUuid(uuid);
  return [
    clean.slice(0, 8),
    clean.slice(8, 12),
    clean.slice(12, 16),
    clean.slice(16, 20),
    clean.slice(20, 32)
  ].join("-");
}

// src/core/mojang-api.ts
async function fetchMojangProfile(uuid) {
  const cleanUuid = validateUuid(uuid);
  const url = `${MOJANG_API.SESSION_SERVER}/${cleanUuid}`;
  const response = await fetch(url, {
    cache: "force-cache"
  });
  if (!response.ok) {
    throw new Error(`Mojang API error: ${response.status}`);
  }
  const profile = await response.json();
  return profile;
}
function extractSkinInfo(profile) {
  const textureProperty = profile.properties.find((p) => p.name === "textures");
  if (!textureProperty) {
    throw new Error("No textures property found in profile");
  }
  const textureData = JSON.parse(
    Buffer.from(textureProperty.value, "base64").toString("utf-8")
  );
  const skinData = textureData.textures?.SKIN;
  if (!skinData?.url) {
    throw new Error("No skin URL found in texture data");
  }
  return {
    skinUrl: skinData.url,
    isSlim: skinData.metadata?.model === "slim",
    capeUrl: textureData.textures?.CAPE?.url
  };
}
async function fetchSkinTexture(skinUrl) {
  const response = await fetch(skinUrl, {
    cache: "force-cache"
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch skin: ${response.status}`);
  }
  return await response.arrayBuffer();
}

// src/core/skin-parser.ts
function detectSkinFormat(width, height) {
  if (width === SKIN_DIMENSIONS.MODERN.width && height === SKIN_DIMENSIONS.MODERN.height) {
    return "modern";
  }
  if (width === SKIN_DIMENSIONS.LEGACY.width && height === SKIN_DIMENSIONS.LEGACY.height) {
    return "legacy";
  }
  throw new Error(`Unexpected skin dimensions: ${width}x${height}`);
}
function hasVisibleOverlay(pixelData) {
  for (let i = 3; i < pixelData.length; i += 4) {
    if (pixelData[i] > 0) {
      return true;
    }
  }
  return false;
}
function getBaseHeadRegion() {
  return { ...HEAD_REGIONS.BASE };
}
function getOverlayHeadRegion() {
  return { ...HEAD_REGIONS.OVERLAY };
}

// src/core/renderer.ts
async function renderAvatar(skinBuffer, options = {}) {
  const sharp = (await import("sharp")).default;
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const skinImage = sharp(Buffer.from(skinBuffer));
  const metadata = await skinImage.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Invalid skin texture: missing dimensions");
  }
  const skinFormat = detectSkinFormat(metadata.width, metadata.height);
  const hasModernOverlay = skinFormat === "modern" && opts.includeOverlay;
  const baseRegion = getBaseHeadRegion();
  const baseHead = await sharp(Buffer.from(skinBuffer)).extract({
    left: baseRegion.x,
    top: baseRegion.y,
    width: baseRegion.width,
    height: baseRegion.height
  }).toBuffer();
  let hasOverlay = false;
  let finalHead;
  if (hasModernOverlay) {
    const overlayRegion = getOverlayHeadRegion();
    const overlayHead = await sharp(Buffer.from(skinBuffer)).extract({
      left: overlayRegion.x,
      top: overlayRegion.y,
      width: overlayRegion.width,
      height: overlayRegion.height
    }).toBuffer();
    const overlayData = await sharp(overlayHead).ensureAlpha().raw().toBuffer();
    hasOverlay = hasVisibleOverlay(overlayData);
    if (hasOverlay) {
      const baseSize = Math.round(opts.size * 0.925);
      const baseOffset = Math.round((opts.size - baseSize) / 2);
      const resizedBase = await sharp(baseHead).resize(baseSize, baseSize, { kernel: "nearest" }).png().toBuffer();
      const resizedOverlay = await sharp(overlayHead).resize(opts.size, opts.size, { kernel: "nearest" }).png().toBuffer();
      finalHead = await sharp({
        create: {
          width: opts.size,
          height: opts.size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      }).composite([
        { input: resizedBase, top: baseOffset, left: baseOffset },
        { input: resizedOverlay, top: 0, left: 0 }
      ]).png().toBuffer();
    } else {
      finalHead = await sharp(baseHead).resize(opts.size, opts.size, { kernel: "nearest" }).png().toBuffer();
    }
  } else {
    finalHead = await sharp(baseHead).resize(opts.size, opts.size, { kernel: "nearest" }).png().toBuffer();
  }
  return {
    data: finalHead,
    contentType: "image/png",
    usedFallback: false,
    skinFormat,
    hasOverlay
  };
}

// src/core/index.ts
async function generateAvatar(uuid, options = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  try {
    const cleanUuid = validateUuid(uuid);
    const profile = await fetchMojangProfile(cleanUuid);
    const skinInfo = extractSkinInfo(profile);
    const skinBuffer = await fetchSkinTexture(skinInfo.skinUrl);
    return await renderAvatar(skinBuffer, opts);
  } catch (error) {
    if (opts.fallbackUuid && opts.fallbackUuid !== uuid) {
      try {
        const fallbackProfile = await fetchMojangProfile(opts.fallbackUuid);
        const fallbackSkinInfo = extractSkinInfo(fallbackProfile);
        const fallbackSkinBuffer = await fetchSkinTexture(fallbackSkinInfo.skinUrl);
        const result = await renderAvatar(fallbackSkinBuffer, opts);
        return { ...result, usedFallback: true };
      } catch {
        throw error;
      }
    }
    throw error;
  }
}
export {
  DEFAULT_OPTIONS,
  STEVE_UUID,
  formatUuid,
  generateAvatar,
  validateUuid
};
//# sourceMappingURL=index.js.map