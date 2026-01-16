import * as react from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { M as MinecraftAvatarProps, d as MinecraftFullBodyProps } from './types-qoLitC4k.js';
export { P as PoseName } from './types-qoLitC4k.js';

/**
 * Minecraft Avatar Component
 *
 * Displays a player's Minecraft face avatar.
 * Supports both client-side (default) and server-side rendering modes.
 *
 * @example
 * ```tsx
 * import { MinecraftAvatar } from '@bafv4/mcavatar/react';
 *
 * // Client-side rendering (default)
 * <MinecraftAvatar uuid={player.uuid} size={64} />
 *
 * // Server-side rendering (with API endpoint)
 * <MinecraftAvatar uuid={player.uuid} apiEndpoint="/api/avatar" />
 * ```
 */
declare const MinecraftAvatar: react.MemoExoticComponent<({ uuid, mcid, size, overlay, className, apiEndpoint, }: MinecraftAvatarProps) => react_jsx_runtime.JSX.Element>;

/**
 * Minecraft Full Body Avatar Component
 *
 * Renders a 3D full-body Minecraft avatar.
 * Supports both client-side (skinview3d, default) and server-side rendering modes.
 *
 * @example
 * ```tsx
 * import { MinecraftFullBody } from '@bafv4/mcavatar/react';
 *
 * // Client-side rendering (default, requires skinview3d)
 * <MinecraftFullBody
 *   uuid={player.uuid}
 *   width={300}
 *   height={400}
 *   pose="waving"
 *   angle={30}
 * />
 *
 * // With animation (client-side only)
 * <MinecraftFullBody
 *   uuid={player.uuid}
 *   walk={true}
 *   rotate={true}
 * />
 *
 * // Server-side rendering (with API endpoint)
 * <MinecraftFullBody
 *   uuid={player.uuid}
 *   apiEndpoint="/api/fullbody"
 * />
 * ```
 */
declare const MinecraftFullBody: react.MemoExoticComponent<({ uuid, mcid, width, height, pose, angle, elevation, zoom, className, background, walk, run, rotate, apiEndpoint, }: MinecraftFullBodyProps) => react_jsx_runtime.JSX.Element>;

export { MinecraftAvatar, MinecraftAvatarProps, MinecraftFullBody, MinecraftFullBodyProps };
