/**
 * Core Avatar Generation
 */

import type { AvatarOptions, AvatarResult } from '../shared/types';
import { DEFAULT_OPTIONS } from '../shared/constants';
import { validateUuid } from '../shared/utils';
import { fetchMojangProfile, extractSkinInfo, fetchSkinTexture } from './mojang-api';
import { renderAvatar } from './renderer';

/**
 * Generate Minecraft avatar from UUID
 *
 * @param uuid - Minecraft player UUID
 * @param options - Avatar generation options
 * @returns Avatar result with image data
 *
 * @example
 * ```typescript
 * import { generateAvatar } from '@bafv4/mcavatar';
 *
 * const result = await generateAvatar('uuid-here', { size: 64 });
 * // result.data is a Buffer containing PNG image
 * ```
 */
export async function generateAvatar(
  uuid: string,
  options: AvatarOptions = {}
): Promise<AvatarResult> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Fetch skin from Mojang API
    const cleanUuid = validateUuid(uuid);
    const profile = await fetchMojangProfile(cleanUuid);
    const skinInfo = extractSkinInfo(profile);
    const skinBuffer = await fetchSkinTexture(skinInfo.skinUrl);

    return await renderAvatar(skinBuffer, opts);
  } catch (error) {
    // Use fallback if enabled and different from requested UUID
    if (opts.fallbackUuid && opts.fallbackUuid !== uuid) {
      try {
        const fallbackProfile = await fetchMojangProfile(opts.fallbackUuid);
        const fallbackSkinInfo = extractSkinInfo(fallbackProfile);
        const fallbackSkinBuffer = await fetchSkinTexture(fallbackSkinInfo.skinUrl);

        const result = await renderAvatar(fallbackSkinBuffer, opts);
        return { ...result, usedFallback: true };
      } catch {
        // Re-throw original error if fallback also fails
        throw error;
      }
    }

    throw error;
  }
}

// Re-export types and utilities
export type { AvatarOptions, AvatarResult, SkinFormat, MinecraftAvatarProps } from '../shared/types';
export { STEVE_UUID, DEFAULT_OPTIONS } from '../shared/constants';
export { validateUuid, formatUuid } from '../shared/utils';
