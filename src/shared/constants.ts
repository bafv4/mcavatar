/**
 * Minecraft Avatar Constants
 */

import type { AvatarOptions, SkinRegion } from './types';

/**
 * Steve's UUID for fallback
 */
export const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

/**
 * Mojang API endpoints
 */
export const MOJANG_API = {
  SESSION_SERVER: 'https://sessionserver.mojang.com/session/minecraft/profile',
} as const;

/**
 * Skin texture dimensions
 */
export const SKIN_DIMENSIONS = {
  LEGACY: { width: 64, height: 32 },
  MODERN: { width: 64, height: 64 },
} as const;

/**
 * Head region coordinates (8x8 pixels)
 */
export const HEAD_REGIONS: {
  BASE: SkinRegion;
  OVERLAY: SkinRegion;
} = {
  /** Base head layer */
  BASE: { x: 8, y: 8, width: 8, height: 8 },
  /** Overlay/hat layer (modern skins only) */
  OVERLAY: { x: 40, y: 8, width: 8, height: 8 },
};

/**
 * Default avatar options
 */
export const DEFAULT_OPTIONS: Required<AvatarOptions> = {
  size: 64,
  includeOverlay: true,
  fallbackUuid: STEVE_UUID,
};
