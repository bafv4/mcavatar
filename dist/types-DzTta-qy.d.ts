/**
 * Minecraft Avatar Types
 */
/**
 * Skin format enumeration
 */
type SkinFormat = 'legacy' | 'modern';
/**
 * Avatar rendering options
 */
interface AvatarOptions {
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
interface AvatarResult {
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
 * React/Vue component props
 */
interface MinecraftAvatarProps {
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

export type { AvatarOptions as A, MinecraftAvatarProps as M, SkinFormat as S, AvatarResult as a };
