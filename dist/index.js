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
var BODY_REGIONS = {
  HEAD: {
    BASE: {
      right: { x: 0, y: 8, width: 8, height: 8 },
      front: { x: 8, y: 8, width: 8, height: 8 },
      left: { x: 16, y: 8, width: 8, height: 8 },
      back: { x: 24, y: 8, width: 8, height: 8 },
      top: { x: 8, y: 0, width: 8, height: 8 },
      bottom: { x: 16, y: 0, width: 8, height: 8 }
    },
    OVERLAY: {
      right: { x: 32, y: 8, width: 8, height: 8 },
      front: { x: 40, y: 8, width: 8, height: 8 },
      left: { x: 48, y: 8, width: 8, height: 8 },
      back: { x: 56, y: 8, width: 8, height: 8 },
      top: { x: 40, y: 0, width: 8, height: 8 },
      bottom: { x: 48, y: 0, width: 8, height: 8 }
    }
  },
  TORSO: {
    BASE: {
      right: { x: 16, y: 20, width: 4, height: 12 },
      front: { x: 20, y: 20, width: 8, height: 12 },
      left: { x: 28, y: 20, width: 4, height: 12 },
      back: { x: 32, y: 20, width: 8, height: 12 },
      top: { x: 20, y: 16, width: 8, height: 4 },
      bottom: { x: 28, y: 16, width: 8, height: 4 }
    },
    OVERLAY: {
      right: { x: 16, y: 36, width: 4, height: 12 },
      front: { x: 20, y: 36, width: 8, height: 12 },
      left: { x: 28, y: 36, width: 4, height: 12 },
      back: { x: 32, y: 36, width: 8, height: 12 },
      top: { x: 20, y: 32, width: 8, height: 4 },
      bottom: { x: 28, y: 32, width: 8, height: 4 }
    }
  },
  RIGHT_ARM: {
    CLASSIC: {
      BASE: {
        right: { x: 40, y: 20, width: 4, height: 12 },
        front: { x: 44, y: 20, width: 4, height: 12 },
        left: { x: 48, y: 20, width: 4, height: 12 },
        back: { x: 52, y: 20, width: 4, height: 12 },
        top: { x: 44, y: 16, width: 4, height: 4 },
        bottom: { x: 48, y: 16, width: 4, height: 4 }
      },
      OVERLAY: {
        right: { x: 40, y: 36, width: 4, height: 12 },
        front: { x: 44, y: 36, width: 4, height: 12 },
        left: { x: 48, y: 36, width: 4, height: 12 },
        back: { x: 52, y: 36, width: 4, height: 12 },
        top: { x: 44, y: 32, width: 4, height: 4 },
        bottom: { x: 48, y: 32, width: 4, height: 4 }
      }
    },
    SLIM: {
      BASE: {
        right: { x: 40, y: 20, width: 4, height: 12 },
        front: { x: 44, y: 20, width: 3, height: 12 },
        left: { x: 47, y: 20, width: 4, height: 12 },
        back: { x: 51, y: 20, width: 3, height: 12 },
        top: { x: 44, y: 16, width: 3, height: 4 },
        bottom: { x: 47, y: 16, width: 3, height: 4 }
      },
      OVERLAY: {
        right: { x: 40, y: 36, width: 4, height: 12 },
        front: { x: 44, y: 36, width: 3, height: 12 },
        left: { x: 47, y: 36, width: 4, height: 12 },
        back: { x: 51, y: 36, width: 3, height: 12 },
        top: { x: 44, y: 32, width: 3, height: 4 },
        bottom: { x: 47, y: 32, width: 3, height: 4 }
      }
    }
  },
  LEFT_ARM: {
    CLASSIC: {
      BASE: {
        right: { x: 32, y: 52, width: 4, height: 12 },
        front: { x: 36, y: 52, width: 4, height: 12 },
        left: { x: 40, y: 52, width: 4, height: 12 },
        back: { x: 44, y: 52, width: 4, height: 12 },
        top: { x: 36, y: 48, width: 4, height: 4 },
        bottom: { x: 40, y: 48, width: 4, height: 4 }
      },
      OVERLAY: {
        right: { x: 48, y: 52, width: 4, height: 12 },
        front: { x: 52, y: 52, width: 4, height: 12 },
        left: { x: 56, y: 52, width: 4, height: 12 },
        back: { x: 60, y: 52, width: 4, height: 12 },
        top: { x: 52, y: 48, width: 4, height: 4 },
        bottom: { x: 56, y: 48, width: 4, height: 4 }
      }
    },
    SLIM: {
      BASE: {
        right: { x: 32, y: 52, width: 4, height: 12 },
        front: { x: 36, y: 52, width: 3, height: 12 },
        left: { x: 39, y: 52, width: 4, height: 12 },
        back: { x: 43, y: 52, width: 3, height: 12 },
        top: { x: 36, y: 48, width: 3, height: 4 },
        bottom: { x: 39, y: 48, width: 3, height: 4 }
      },
      OVERLAY: {
        right: { x: 48, y: 52, width: 4, height: 12 },
        front: { x: 52, y: 52, width: 3, height: 12 },
        left: { x: 55, y: 52, width: 4, height: 12 },
        back: { x: 59, y: 52, width: 3, height: 12 },
        top: { x: 52, y: 48, width: 3, height: 4 },
        bottom: { x: 55, y: 48, width: 3, height: 4 }
      }
    }
  },
  RIGHT_LEG: {
    BASE: {
      right: { x: 0, y: 20, width: 4, height: 12 },
      front: { x: 4, y: 20, width: 4, height: 12 },
      left: { x: 8, y: 20, width: 4, height: 12 },
      back: { x: 12, y: 20, width: 4, height: 12 },
      top: { x: 4, y: 16, width: 4, height: 4 },
      bottom: { x: 8, y: 16, width: 4, height: 4 }
    },
    OVERLAY: {
      right: { x: 0, y: 36, width: 4, height: 12 },
      front: { x: 4, y: 36, width: 4, height: 12 },
      left: { x: 8, y: 36, width: 4, height: 12 },
      back: { x: 12, y: 36, width: 4, height: 12 },
      top: { x: 4, y: 32, width: 4, height: 4 },
      bottom: { x: 8, y: 32, width: 4, height: 4 }
    }
  },
  LEFT_LEG: {
    BASE: {
      right: { x: 16, y: 52, width: 4, height: 12 },
      front: { x: 20, y: 52, width: 4, height: 12 },
      left: { x: 24, y: 52, width: 4, height: 12 },
      back: { x: 28, y: 52, width: 4, height: 12 },
      top: { x: 20, y: 48, width: 4, height: 4 },
      bottom: { x: 24, y: 48, width: 4, height: 4 }
    },
    OVERLAY: {
      right: { x: 0, y: 52, width: 4, height: 12 },
      front: { x: 4, y: 52, width: 4, height: 12 },
      left: { x: 8, y: 52, width: 4, height: 12 },
      back: { x: 12, y: 52, width: 4, height: 12 },
      top: { x: 4, y: 48, width: 4, height: 4 },
      bottom: { x: 8, y: 48, width: 4, height: 4 }
    }
  }
};
var MODEL_DIMENSIONS = {
  HEAD: { width: 8, height: 8, depth: 8 },
  TORSO: { width: 8, height: 12, depth: 4 },
  ARM_CLASSIC: { width: 4, height: 12, depth: 4 },
  ARM_SLIM: { width: 3, height: 12, depth: 4 },
  LEG: { width: 4, height: 12, depth: 4 }
};
var BODY_POSITIONS = {
  HEAD: { x: 0, y: 24, z: 0 },
  TORSO: { x: 0, y: 18, z: 0 },
  LEFT_ARM: { x: 6, y: 22, z: 0 },
  RIGHT_ARM: { x: -6, y: 22, z: 0 },
  LEFT_LEG: { x: 2, y: 6, z: 0 },
  RIGHT_LEG: { x: -2, y: 6, z: 0 }
};
var PIVOT_POINTS = {
  HEAD: { x: 0, y: -4, z: 0 },
  TORSO: { x: 0, y: 0, z: 0 },
  LEFT_ARM: { x: -2, y: 4, z: 0 },
  RIGHT_ARM: { x: 2, y: 4, z: 0 },
  LEFT_LEG: { x: 0, y: 6, z: 0 },
  RIGHT_LEG: { x: 0, y: 6, z: 0 }
};
var DEFAULT_VIEW = {
  angle: 25,
  elevation: 10,
  zoom: 1
};
var DEFAULT_FULLBODY_OPTIONS = {
  width: 300,
  height: 400,
  includeOverlay: true,
  pose: "standing",
  view: DEFAULT_VIEW,
  background: null,
  fallbackUuid: STEVE_UUID,
  shadow: false
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

// src/3d/geometry.ts
function createFaceVertices(center, size, face) {
  const hw = size.x / 2;
  const hh = size.y / 2;
  const hd = size.z / 2;
  switch (face) {
    case "front":
      return [
        { x: center.x - hw, y: center.y + hh, z: center.z + hd },
        // top-left
        { x: center.x + hw, y: center.y + hh, z: center.z + hd },
        // top-right
        { x: center.x + hw, y: center.y - hh, z: center.z + hd },
        // bottom-right
        { x: center.x - hw, y: center.y - hh, z: center.z + hd }
        // bottom-left
      ];
    case "back":
      return [
        { x: center.x + hw, y: center.y + hh, z: center.z - hd },
        // top-left
        { x: center.x - hw, y: center.y + hh, z: center.z - hd },
        // top-right
        { x: center.x - hw, y: center.y - hh, z: center.z - hd },
        // bottom-right
        { x: center.x + hw, y: center.y - hh, z: center.z - hd }
        // bottom-left
      ];
    case "left":
      return [
        { x: center.x - hw, y: center.y + hh, z: center.z - hd },
        // top-left
        { x: center.x - hw, y: center.y + hh, z: center.z + hd },
        // top-right
        { x: center.x - hw, y: center.y - hh, z: center.z + hd },
        // bottom-right
        { x: center.x - hw, y: center.y - hh, z: center.z - hd }
        // bottom-left
      ];
    case "right":
      return [
        { x: center.x + hw, y: center.y + hh, z: center.z + hd },
        // top-left
        { x: center.x + hw, y: center.y + hh, z: center.z - hd },
        // top-right
        { x: center.x + hw, y: center.y - hh, z: center.z - hd },
        // bottom-right
        { x: center.x + hw, y: center.y - hh, z: center.z + hd }
        // bottom-left
      ];
    case "top":
      return [
        { x: center.x - hw, y: center.y + hh, z: center.z - hd },
        // top-left (back-left)
        { x: center.x + hw, y: center.y + hh, z: center.z - hd },
        // top-right (back-right)
        { x: center.x + hw, y: center.y + hh, z: center.z + hd },
        // bottom-right (front-right)
        { x: center.x - hw, y: center.y + hh, z: center.z + hd }
        // bottom-left (front-left)
      ];
    case "bottom":
      return [
        { x: center.x - hw, y: center.y - hh, z: center.z + hd },
        // top-left (front-left)
        { x: center.x + hw, y: center.y - hh, z: center.z + hd },
        // top-right (front-right)
        { x: center.x + hw, y: center.y - hh, z: center.z - hd },
        // bottom-right (back-right)
        { x: center.x - hw, y: center.y - hh, z: center.z - hd }
        // bottom-left (back-left)
      ];
  }
}
function getFaceNormal(face) {
  switch (face) {
    case "front":
      return { x: 0, y: 0, z: 1 };
    case "back":
      return { x: 0, y: 0, z: -1 };
    case "left":
      return { x: -1, y: 0, z: 0 };
    case "right":
      return { x: 1, y: 0, z: 0 };
    case "top":
      return { x: 0, y: 1, z: 0 };
    case "bottom":
      return { x: 0, y: -1, z: 0 };
  }
}
function createCubeFace(center, size, face, uv) {
  return {
    name: face,
    vertices: createFaceVertices(center, size, face),
    uv,
    normal: getFaceNormal(face)
  };
}
function createBodyPartFaces(center, size, regions) {
  const faceNames = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "bottom"
  ];
  return faceNames.map((face) => createCubeFace(center, size, face, regions[face]));
}
function getBodyPartRegions(part, layer, armModel = "classic") {
  switch (part) {
    case "head":
      return BODY_REGIONS.HEAD[layer];
    case "torso":
      return BODY_REGIONS.TORSO[layer];
    case "leftArm":
      return BODY_REGIONS.LEFT_ARM[armModel === "slim" ? "SLIM" : "CLASSIC"][layer];
    case "rightArm":
      return BODY_REGIONS.RIGHT_ARM[armModel === "slim" ? "SLIM" : "CLASSIC"][layer];
    case "leftLeg":
      return BODY_REGIONS.LEFT_LEG[layer];
    case "rightLeg":
      return BODY_REGIONS.RIGHT_LEG[layer];
  }
}
function getBodyPartDimensions(part, armModel = "classic") {
  switch (part) {
    case "head":
      return {
        x: MODEL_DIMENSIONS.HEAD.width,
        y: MODEL_DIMENSIONS.HEAD.height,
        z: MODEL_DIMENSIONS.HEAD.depth
      };
    case "torso":
      return {
        x: MODEL_DIMENSIONS.TORSO.width,
        y: MODEL_DIMENSIONS.TORSO.height,
        z: MODEL_DIMENSIONS.TORSO.depth
      };
    case "leftArm":
    case "rightArm":
      const armDim = armModel === "slim" ? MODEL_DIMENSIONS.ARM_SLIM : MODEL_DIMENSIONS.ARM_CLASSIC;
      return {
        x: armDim.width,
        y: armDim.height,
        z: armDim.depth
      };
    case "leftLeg":
    case "rightLeg":
      return {
        x: MODEL_DIMENSIONS.LEG.width,
        y: MODEL_DIMENSIONS.LEG.height,
        z: MODEL_DIMENSIONS.LEG.depth
      };
  }
}
function getPositionKey(part) {
  const keyMap = {
    head: "HEAD",
    torso: "TORSO",
    leftArm: "LEFT_ARM",
    rightArm: "RIGHT_ARM",
    leftLeg: "LEFT_LEG",
    rightLeg: "RIGHT_LEG"
  };
  return keyMap[part];
}
function getBodyPartPosition(part) {
  const key = getPositionKey(part);
  return { ...BODY_POSITIONS[key] };
}
function getBodyPartPivot(part) {
  const key = getPositionKey(part);
  return { ...PIVOT_POINTS[key] };
}
function createBodyPartMesh(part, layer, armModel = "classic") {
  const size = getBodyPartDimensions(part, armModel);
  const position = getBodyPartPosition(part);
  const pivot = getBodyPartPivot(part);
  const regions = getBodyPartRegions(part, layer, armModel);
  const center = { x: 0, y: 0, z: 0 };
  const faces = createBodyPartFaces(center, size, regions);
  const overlayScale = layer === "OVERLAY" ? 1.1 : 1;
  const scaledSize = {
    x: size.x * overlayScale,
    y: size.y * overlayScale,
    z: size.z * overlayScale
  };
  return {
    part,
    faces: layer === "OVERLAY" ? createBodyPartFaces(center, scaledSize, regions) : faces,
    position,
    pivot,
    size: layer === "OVERLAY" ? scaledSize : size,
    isOverlay: layer === "OVERLAY"
  };
}
function createCharacterMeshes(armModel = "classic", includeOverlay = true) {
  const parts = [
    "head",
    "torso",
    "leftArm",
    "rightArm",
    "leftLeg",
    "rightLeg"
  ];
  const meshes = [];
  for (const part of parts) {
    meshes.push(createBodyPartMesh(part, "BASE", armModel));
    if (includeOverlay) {
      meshes.push(createBodyPartMesh(part, "OVERLAY", armModel));
    }
  }
  return meshes;
}

// src/3d/poses.ts
var NO_ROTATION = { pitch: 0, yaw: 0, roll: 0 };
var DEFAULT_POSE = { rotation: NO_ROTATION };
var POSE_STANDING = {
  name: "standing",
  head: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: 0, yaw: 0, roll: -3 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE
};
var POSE_WALKING = {
  name: "walking",
  head: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 30, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: -30, yaw: 0, roll: -3 } },
  leftLeg: { rotation: { pitch: -25, yaw: 0, roll: 0 } },
  rightLeg: { rotation: { pitch: 25, yaw: 0, roll: 0 } }
};
var POSE_RUNNING = {
  name: "running",
  head: { rotation: { pitch: -5, yaw: 0, roll: 0 } },
  torso: { rotation: { pitch: -10, yaw: 0, roll: 0 } },
  leftArm: { rotation: { pitch: 50, yaw: 0, roll: 5 } },
  rightArm: { rotation: { pitch: -50, yaw: 0, roll: -5 } },
  leftLeg: { rotation: { pitch: -40, yaw: 0, roll: 0 } },
  rightLeg: { rotation: { pitch: 40, yaw: 0, roll: 0 } }
};
var POSE_WAVING = {
  name: "waving",
  head: { rotation: { pitch: 0, yaw: 15, roll: 5 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: -120, yaw: 20, roll: -20 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE
};
var POSE_SITTING = {
  name: "sitting",
  head: { rotation: { pitch: 5, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: -45, yaw: 0, roll: 10 } },
  rightArm: { rotation: { pitch: -45, yaw: 0, roll: -10 } },
  leftLeg: {
    rotation: { pitch: -90, yaw: 0, roll: 0 },
    offset: { x: 0, y: -3, z: 4 }
  },
  rightLeg: {
    rotation: { pitch: -90, yaw: 0, roll: 0 },
    offset: { x: 0, y: -3, z: 4 }
  }
};
var POSE_POINTING = {
  name: "pointing",
  head: { rotation: { pitch: -5, yaw: -10, roll: 0 } },
  torso: { rotation: { pitch: 0, yaw: -5, roll: 0 } },
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 5 } },
  rightArm: { rotation: { pitch: -90, yaw: -10, roll: 0 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE
};
var POSE_CROSSED_ARMS = {
  name: "crossed_arms",
  head: { rotation: { pitch: 5, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: {
    rotation: { pitch: -50, yaw: 0, roll: 50 },
    offset: { x: -2, y: -2, z: 2 }
  },
  rightArm: {
    rotation: { pitch: -50, yaw: 0, roll: -50 },
    offset: { x: 2, y: -2, z: 2 }
  },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE
};
var POSES = {
  standing: POSE_STANDING,
  walking: POSE_WALKING,
  running: POSE_RUNNING,
  waving: POSE_WAVING,
  sitting: POSE_SITTING,
  pointing: POSE_POINTING,
  crossed_arms: POSE_CROSSED_ARMS
};
function getPose(name) {
  if (name === "custom") return null;
  return POSES[name] ?? null;
}
function validatePose(pose) {
  const requiredParts = [
    "head",
    "torso",
    "leftArm",
    "rightArm",
    "leftLeg",
    "rightLeg"
  ];
  for (const part of requiredParts) {
    const bodyPart = pose[part];
    if (!bodyPart || typeof bodyPart !== "object" || !("rotation" in bodyPart)) {
      return false;
    }
    const rotation = bodyPart.rotation;
    if (typeof rotation.pitch !== "number" || typeof rotation.yaw !== "number" || typeof rotation.roll !== "number") {
      return false;
    }
  }
  return true;
}
function createCustomPose(head, torso, leftArm, rightArm, leftLeg, rightLeg) {
  return {
    name: "custom",
    head,
    torso,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
  };
}

// src/3d/projection.ts
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}
function addVec3(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
function subVec3(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function scaleVec3(v, s) {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}
function dotVec3(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
function rotateX(point, angleDeg) {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos
  };
}
function rotateY(point, angleDeg) {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos
  };
}
function rotateZ(point, angleDeg) {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z
  };
}
function applyRotation(point, rotation) {
  let result = point;
  result = rotateZ(result, rotation.roll);
  result = rotateX(result, rotation.pitch);
  result = rotateY(result, rotation.yaw);
  return result;
}
function rotateAroundPivot(point, pivot, rotation) {
  const translated = subVec3(point, pivot);
  const rotated = applyRotation(translated, rotation);
  return addVec3(rotated, pivot);
}
function applyViewTransform(point, view) {
  let result = rotateY(point, -view.angle);
  result = rotateX(result, -view.elevation);
  result = scaleVec3(result, view.zoom);
  return result;
}
function projectOrthographic(point, canvasWidth, canvasHeight, scale = 1) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  return {
    x: centerX + point.x * scale,
    y: centerY - point.y * scale
    // Flip Y for screen coordinates
  };
}
function calculateAverageDepth(points) {
  if (points.length === 0) return 0;
  const sum = points.reduce((acc, p) => acc + p.z, 0);
  return sum / points.length;
}

// src/3d/texture-mapper.ts
function extractTextureRegion(skinData, skinWidth, region) {
  const { x, y, width, height } = region;
  const regionData = Buffer.alloc(width * height * 4);
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const srcIdx = ((y + row) * skinWidth + (x + col)) * 4;
      const dstIdx = (row * width + col) * 4;
      regionData[dstIdx] = skinData[srcIdx];
      regionData[dstIdx + 1] = skinData[srcIdx + 1];
      regionData[dstIdx + 2] = skinData[srcIdx + 2];
      regionData[dstIdx + 3] = skinData[srcIdx + 3];
    }
  }
  return regionData;
}
function hasVisiblePixels(textureData) {
  for (let i = 3; i < textureData.length; i += 4) {
    if (textureData[i] > 0) {
      return true;
    }
  }
  return false;
}
function sampleTextureNearest(textureData, texWidth, texHeight, u, v) {
  const x = Math.max(0, Math.min(texWidth - 1, Math.floor(u)));
  const y = Math.max(0, Math.min(texHeight - 1, Math.floor(v)));
  const idx = (y * texWidth + x) * 4;
  return [
    textureData[idx] || 0,
    textureData[idx + 1] || 0,
    textureData[idx + 2] || 0,
    textureData[idx + 3] || 0
  ];
}
function calculateBoundingBox(points) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return { minX, minY, maxX, maxY };
}
function isPointInQuad(point, quad) {
  const [p0, p1, p2, p3] = quad;
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const d1 = cross(p0, p1, point);
  const d2 = cross(p1, p2, point);
  const d3 = cross(p2, p3, point);
  const d4 = cross(p3, p0, point);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0 || d4 > 0;
  return !(hasNeg && hasPos);
}
function getBarycentricCoords(point, quad) {
  const [p0, p1, p2, p3] = quad;
  const topEdgeX = p1.x - p0.x;
  const topEdgeY = p1.y - p0.y;
  const leftEdgeX = p3.x - p0.x;
  const leftEdgeY = p3.y - p0.y;
  const px = point.x - p0.x;
  const py = point.y - p0.y;
  const det = topEdgeX * leftEdgeY - topEdgeY * leftEdgeX;
  if (Math.abs(det) < 1e-10) {
    return { u: 0.5, v: 0.5 };
  }
  const u = (px * leftEdgeY - py * leftEdgeX) / det;
  const v = (topEdgeX * py - topEdgeY * px) / det;
  return {
    u: Math.max(0, Math.min(1, u)),
    v: Math.max(0, Math.min(1, v))
  };
}

// src/core/renderer-3d.ts
async function renderFullBody(skinBuffer, options = {}) {
  const { createCanvas } = await import("@napi-rs/canvas");
  const sharp = (await import("sharp")).default;
  const skinImage = sharp(skinBuffer);
  const metadata = await skinImage.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error("Invalid skin texture: unable to read dimensions");
  }
  const skinFormat = detectSkinFormat(metadata.width, metadata.height);
  const skinData = await skinImage.ensureAlpha().raw().toBuffer();
  const opts = {
    width: options.width ?? DEFAULT_FULLBODY_OPTIONS.width,
    height: options.height ?? DEFAULT_FULLBODY_OPTIONS.height,
    includeOverlay: options.includeOverlay ?? DEFAULT_FULLBODY_OPTIONS.includeOverlay,
    view: { ...DEFAULT_VIEW, ...options.view },
    background: options.background ?? DEFAULT_FULLBODY_OPTIONS.background,
    shadow: options.shadow ?? DEFAULT_FULLBODY_OPTIONS.shadow
  };
  const armModel = options.armModel ?? "classic";
  let pose;
  let poseName;
  if (typeof options.pose === "string") {
    pose = getPose(options.pose) ?? POSE_STANDING;
    poseName = options.pose;
  } else if (options.pose && typeof options.pose === "object") {
    pose = options.pose;
    poseName = "custom";
  } else {
    pose = POSE_STANDING;
    poseName = "standing";
  }
  const canvas = createCanvas(opts.width, opts.height);
  const ctx = canvas.getContext("2d");
  if (opts.background) {
    ctx.fillStyle = opts.background;
    ctx.fillRect(0, 0, opts.width, opts.height);
  }
  const meshes = createCharacterMeshes(armModel, opts.includeOverlay && skinFormat === "modern");
  const characterHeight = 32;
  const scale = opts.height * 0.75 / characterHeight;
  const modelCenterOffset = { x: 0, y: -14, z: 0 };
  const quads = [];
  const viewDirection = { x: 0, y: 0, z: -1 };
  for (const mesh of meshes) {
    const bodyPartPose = pose[mesh.part];
    if (!bodyPartPose || !bodyPartPose.rotation) continue;
    const poseOffset = bodyPartPose.offset ?? { x: 0, y: 0, z: 0 };
    const worldPosition = addVec3(mesh.position, poseOffset);
    for (const face of mesh.faces) {
      const transformedVertices = face.vertices.map((vertex) => {
        let point = rotateAroundPivot(vertex, mesh.pivot, bodyPartPose.rotation);
        point = addVec3(point, worldPosition);
        point = addVec3(point, modelCenterOffset);
        point = applyViewTransform(point, opts.view);
        return point;
      });
      const edge1 = subVec3(transformedVertices[1], transformedVertices[0]);
      const edge2 = subVec3(transformedVertices[3], transformedVertices[0]);
      const transformedNormal = {
        x: edge2.y * edge1.z - edge2.z * edge1.y,
        y: edge2.z * edge1.x - edge2.x * edge1.z,
        z: edge2.x * edge1.y - edge2.y * edge1.x
      };
      if (dotVec3(transformedNormal, viewDirection) >= 0) {
        continue;
      }
      const projectedPoints = transformedVertices.map(
        (v) => projectOrthographic(v, opts.width, opts.height, scale)
      );
      const depth = calculateAverageDepth(transformedVertices);
      quads.push({
        points: projectedPoints,
        textureRegion: face.uv,
        depth,
        isOverlay: mesh.isOverlay,
        bodyPart: mesh.part,
        face: face.name
      });
    }
  }
  quads.sort((a, b) => {
    if (Math.abs(a.depth - b.depth) > 0.01) {
      return b.depth - a.depth;
    }
    if (a.isOverlay !== b.isOverlay) {
      return a.isOverlay ? 1 : -1;
    }
    return 0;
  });
  let hasVisibleOverlay2 = false;
  for (const quad of quads) {
    const textureData = extractTextureRegion(
      skinData,
      metadata.width,
      quad.textureRegion
    );
    if (quad.isOverlay && !hasVisiblePixels(textureData)) {
      continue;
    }
    if (quad.isOverlay) {
      hasVisibleOverlay2 = true;
    }
    renderTexturedQuad(
      ctx,
      quad.points,
      textureData,
      quad.textureRegion.width,
      quad.textureRegion.height
    );
  }
  const pngBuffer = canvas.toBuffer("image/png");
  return {
    data: pngBuffer,
    contentType: "image/png",
    usedFallback: false,
    skinFormat,
    armModel,
    pose: poseName,
    hasOverlay: hasVisibleOverlay2
  };
}
function renderTexturedQuad(ctx, points, textureData, texWidth, texHeight) {
  const bbox = calculateBoundingBox(points);
  const minX = Math.floor(bbox.minX);
  const minY = Math.floor(bbox.minY);
  const maxX = Math.ceil(bbox.maxX);
  const maxY = Math.ceil(bbox.maxY);
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;
  if (maxX < 0 || minX >= canvasWidth || maxY < 0 || minY >= canvasHeight) {
    return;
  }
  const startX = Math.max(0, minX);
  const startY = Math.max(0, minY);
  const endX = Math.min(canvasWidth, maxX);
  const endY = Math.min(canvasHeight, maxY);
  const width = endX - startX;
  const height = endY - startY;
  if (width <= 0 || height <= 0) return;
  const imageData = ctx.getImageData(startX, startY, width, height);
  const data = imageData.data;
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const point = { x, y };
      if (!isPointInQuad(point, points)) {
        continue;
      }
      const { u, v } = getBarycentricCoords(point, points);
      const texX = u * (texWidth - 1);
      const texY = v * (texHeight - 1);
      const [r, g, b, a] = sampleTextureNearest(
        textureData,
        texWidth,
        texHeight,
        texX,
        texY
      );
      if (a === 0) continue;
      const idx = ((y - startY) * width + (x - startX)) * 4;
      const srcAlpha = a / 255;
      const dstAlpha = data[idx + 3] / 255;
      const outAlpha = srcAlpha + dstAlpha * (1 - srcAlpha);
      if (outAlpha > 0) {
        data[idx] = (r * srcAlpha + data[idx] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 1] = (g * srcAlpha + data[idx + 1] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 2] = (b * srcAlpha + data[idx + 2] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 3] = outAlpha * 255;
      }
    }
  }
  ctx.putImageData(imageData, startX, startY);
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
async function generateFullBody(uuid, options = {}) {
  const opts = {
    ...DEFAULT_FULLBODY_OPTIONS,
    ...options,
    view: { ...DEFAULT_FULLBODY_OPTIONS.view, ...options.view }
  };
  try {
    const cleanUuid = validateUuid(uuid);
    const profile = await fetchMojangProfile(cleanUuid);
    const skinInfo = extractSkinInfo(profile);
    const skinArrayBuffer = await fetchSkinTexture(skinInfo.skinUrl);
    const skinBuffer = Buffer.from(skinArrayBuffer);
    const armModel = options.armModel ?? (skinInfo.isSlim ? "slim" : "classic");
    return await renderFullBody(skinBuffer, { ...opts, armModel });
  } catch (error) {
    if (opts.fallbackUuid && opts.fallbackUuid !== uuid) {
      try {
        const fallbackProfile = await fetchMojangProfile(opts.fallbackUuid);
        const fallbackSkinInfo = extractSkinInfo(fallbackProfile);
        const fallbackArrayBuffer = await fetchSkinTexture(fallbackSkinInfo.skinUrl);
        const fallbackSkinBuffer = Buffer.from(fallbackArrayBuffer);
        const armModel = options.armModel ?? (fallbackSkinInfo.isSlim ? "slim" : "classic");
        const result = await renderFullBody(fallbackSkinBuffer, { ...opts, armModel });
        return { ...result, usedFallback: true };
      } catch {
        throw error;
      }
    }
    throw error;
  }
}
export {
  DEFAULT_FULLBODY_OPTIONS,
  DEFAULT_OPTIONS,
  POSES,
  STEVE_UUID,
  createCustomPose,
  formatUuid,
  generateAvatar,
  generateFullBody,
  getPose,
  validatePose,
  validateUuid
};
//# sourceMappingURL=index.js.map