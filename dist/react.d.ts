import * as react from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { M as MinecraftAvatarProps } from './types-DzTta-qy.js';

/**
 * Minecraft Avatar Component
 *
 * Displays a player's Minecraft avatar by fetching from the API endpoint.
 *
 * @example
 * ```tsx
 * import { MinecraftAvatar } from '@bafv4/mcavatar/react';
 *
 * <MinecraftAvatar uuid={player.uuid} mcid={player.mcid} size={64} />
 * ```
 */
declare const MinecraftAvatar: react.MemoExoticComponent<({ uuid, mcid, size, className, priority, apiEndpoint, }: MinecraftAvatarProps) => react_jsx_runtime.JSX.Element>;

export { MinecraftAvatar, MinecraftAvatarProps };
