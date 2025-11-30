/**
 * Mojang API Client
 */

import type { MojangProfile, SkinTextureInfo } from '../shared/types';
import { MOJANG_API } from '../shared/constants';
import { validateUuid } from '../shared/utils';

/**
 * Fetch player profile from Mojang Session Server
 */
export async function fetchMojangProfile(uuid: string): Promise<MojangProfile> {
  const cleanUuid = validateUuid(uuid);
  const url = `${MOJANG_API.SESSION_SERVER}/${cleanUuid}`;

  const response = await fetch(url, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Mojang API error: ${response.status}`);
  }

  const profile: MojangProfile = await response.json();
  return profile;
}

/**
 * Extract skin texture info from profile
 */
export function extractSkinInfo(profile: MojangProfile): SkinTextureInfo {
  const textureProperty = profile.properties.find((p) => p.name === 'textures');

  if (!textureProperty) {
    throw new Error('No textures property found in profile');
  }

  // Decode base64 texture data
  const textureData = JSON.parse(
    Buffer.from(textureProperty.value, 'base64').toString('utf-8')
  );

  const skinData = textureData.textures?.SKIN;
  if (!skinData?.url) {
    throw new Error('No skin URL found in texture data');
  }

  return {
    skinUrl: skinData.url,
    isSlim: skinData.metadata?.model === 'slim',
    capeUrl: textureData.textures?.CAPE?.url,
  };
}

/**
 * Fetch skin texture as ArrayBuffer
 */
export async function fetchSkinTexture(skinUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(skinUrl, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch skin: ${response.status}`);
  }

  return await response.arrayBuffer();
}
