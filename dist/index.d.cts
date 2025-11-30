import { A as AvatarOptions, a as AvatarResult } from './types-DzTta-qy.cjs';
export { M as MinecraftAvatarProps, S as SkinFormat } from './types-DzTta-qy.cjs';

/**
 * Minecraft Avatar Constants
 */

/**
 * Steve's UUID for fallback
 */
declare const STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
/**
 * Default avatar options
 */
declare const DEFAULT_OPTIONS: Required<AvatarOptions>;

/**
 * Minecraft Avatar Utilities
 */
/**
 * Validate and normalize UUID format
 * Removes hyphens and validates the format
 */
declare function validateUuid(uuid: string): string;
/**
 * Format UUID with hyphens (8-4-4-4-12)
 */
declare function formatUuid(uuid: string): string;

/**
 * Core Avatar Generation
 */

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
declare function generateAvatar(uuid: string, options?: AvatarOptions): Promise<AvatarResult>;

export { AvatarOptions, AvatarResult, DEFAULT_OPTIONS, STEVE_UUID, formatUuid, generateAvatar, validateUuid };
