/**
 * Minecraft Avatar Types
 */

/**
 * Skin format enumeration
 */
export type SkinFormat = 'legacy' | 'modern';
// legacy: 64x32 (pre-1.8)
// modern: 64x64 (1.8+)

/**
 * Avatar rendering options
 */
export interface AvatarOptions {
  /** Output size in pixels (default: 64) */
  size?: number;
  /** Include overlay/hat layer (default: true) */
  includeOverlay?: boolean;
  /** Fallback UUID if skin fetch fails (default: Steve) */
  fallbackUuid?: string;
}

/**
 * Result of avatar generation
 */
export interface AvatarResult {
  /** Image data as Buffer */
  data: Buffer;
  /** Content type (always 'image/png') */
  contentType: 'image/png';
  /** Whether fallback was used */
  usedFallback: boolean;
  /** Skin format detected */
  skinFormat: SkinFormat;
  /** Whether overlay was applied */
  hasOverlay: boolean;
}

/**
 * Skin texture information from Mojang API
 */
export interface SkinTextureInfo {
  /** Skin texture URL */
  skinUrl: string;
  /** Whether skin is slim (Alex) model */
  isSlim: boolean;
  /** Cape URL if present */
  capeUrl?: string;
}

/**
 * Mojang profile response
 */
export interface MojangProfile {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * Skin region coordinates for extraction
 */
export interface SkinRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * React/Vue component props
 */
export interface MinecraftAvatarProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output size in pixels (default: 64) */
  size?: number;
  /** Additional CSS class */
  className?: string;
  /** Priority loading (for above-the-fold content) */
  priority?: boolean;
  /** API endpoint for avatar generation (default: '/api/avatar') */
  apiEndpoint?: string;
}
