import * as react from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { M as MinecraftAvatarProps, d as MinecraftFullBodyProps } from './types-DVuTXly0.cjs';
export { P as PoseName } from './types-DVuTXly0.cjs';

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

/**
 * Minecraft Full Body Avatar Component
 *
 * Displays a player's 3D full-body Minecraft avatar by fetching from the API endpoint.
 *
 * @example
 * ```tsx
 * import { MinecraftFullBody } from '@bafv4/mcavatar/react';
 *
 * <MinecraftFullBody
 *   uuid={player.uuid}
 *   mcid={player.mcid}
 *   width={128}
 *   height={256}
 *   pose="waving"
 *   angle={30}
 * />
 * ```
 */
declare const MinecraftFullBody: react.MemoExoticComponent<({ uuid, mcid, width, height, pose, angle, className, priority, apiEndpoint, }: MinecraftFullBodyProps) => react_jsx_runtime.JSX.Element>;

export { MinecraftAvatar, MinecraftAvatarProps, MinecraftFullBody, MinecraftFullBodyProps };
