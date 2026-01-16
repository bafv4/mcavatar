/**
 * Core Avatar Generation
 */

import type {
  AvatarOptions,
  AvatarResult,
  FullBodyOptions,
  FullBodyResult,
  ArmModel,
} from '../shared/types';
import { DEFAULT_OPTIONS, DEFAULT_FULLBODY_OPTIONS } from '../shared/constants';
import { validateUuid } from '../shared/utils';
import { fetchMojangProfile, extractSkinInfo, fetchSkinTexture } from './mojang-api';
import { renderAvatar } from './renderer';
import { renderFullBodySkinview3d, closeBrowser } from './renderer-skinview3d';

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

/**
 * Generate 3D full-body Minecraft avatar from UUID
 *
 * @param uuid - Minecraft player UUID
 * @param options - Full body generation options
 * @returns Full body result with image data
 *
 * @example
 * ```typescript
 * import { generateFullBody } from '@bafv4/mcavatar';
 *
 * // Simple usage
 * const result = await generateFullBody('uuid-here');
 *
 * // With options
 * const result = await generateFullBody('uuid-here', {
 *   width: 256,
 *   height: 512,
 *   pose: 'waving',
 *   view: { angle: 45, elevation: 15 },
 * });
 *
 * // Custom pose
 * const result = await generateFullBody('uuid-here', {
 *   pose: {
 *     name: 'custom',
 *     head: { rotation: { pitch: -10, yaw: 20, roll: 0 } },
 *     torso: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *     leftArm: { rotation: { pitch: 45, yaw: 0, roll: 10 } },
 *     rightArm: { rotation: { pitch: -30, yaw: 0, roll: -5 } },
 *     leftLeg: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *     rightLeg: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *   },
 * });
 * ```
 */
export async function generateFullBody(
  uuid: string,
  options: FullBodyOptions = {}
): Promise<FullBodyResult> {
  const opts = {
    ...DEFAULT_FULLBODY_OPTIONS,
    ...options,
    view: { ...DEFAULT_FULLBODY_OPTIONS.view, ...options.view },
  };

  try {
    // Fetch skin from Mojang API
    const cleanUuid = validateUuid(uuid);
    const profile = await fetchMojangProfile(cleanUuid);
    const skinInfo = extractSkinInfo(profile);
    const skinArrayBuffer = await fetchSkinTexture(skinInfo.skinUrl);
    const skinBuffer = Buffer.from(skinArrayBuffer);

    // Determine arm model from skin info if not specified
    const armModel: ArmModel = options.armModel ?? (skinInfo.isSlim ? 'slim' : 'classic');

    return await renderFullBodySkinview3d(skinBuffer, { ...opts, armModel });
  } catch (error) {
    // Use fallback if enabled and different from requested UUID
    if (opts.fallbackUuid && opts.fallbackUuid !== uuid) {
      try {
        const fallbackProfile = await fetchMojangProfile(opts.fallbackUuid);
        const fallbackSkinInfo = extractSkinInfo(fallbackProfile);
        const fallbackArrayBuffer = await fetchSkinTexture(fallbackSkinInfo.skinUrl);
        const fallbackSkinBuffer = Buffer.from(fallbackArrayBuffer);

        const armModel: ArmModel =
          options.armModel ?? (fallbackSkinInfo.isSlim ? 'slim' : 'classic');

        const result = await renderFullBodySkinview3d(fallbackSkinBuffer, { ...opts, armModel });
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
export type {
  AvatarOptions,
  AvatarResult,
  SkinFormat,
  MinecraftAvatarProps,
  // 3D types
  FullBodyOptions,
  FullBodyResult,
  MinecraftFullBodyProps,
  PoseName,
  PoseDefinition,
  BodyPartPose,
  Rotation3D,
  Vector3,
  ViewConfig,
  ArmModel,
  BodyPart,
} from '../shared/types';
export { STEVE_UUID, DEFAULT_OPTIONS, DEFAULT_FULLBODY_OPTIONS } from '../shared/constants';
export { validateUuid, formatUuid } from '../shared/utils';

// Re-export pose utilities
export { POSES, getPose, validatePose, createCustomPose } from '../3d/poses';

// Re-export browser cleanup utility
export { closeBrowser };
