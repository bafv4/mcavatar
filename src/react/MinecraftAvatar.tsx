'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import type { MinecraftAvatarProps } from '../shared/types';
import { STEVE_UUID } from '../shared/constants';

const MinecraftAvatarComponent = ({
  uuid,
  mcid,
  size = 64,
  className = '',
  priority = false,
  apiEndpoint = '/api/avatar',
}: MinecraftAvatarProps) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Construct API URL
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&size=${size}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&size=${size}`;

  // Reset state when UUID changes
  useEffect(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setImgError(true);
    setIsLoading(false);
  }, []);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      <img
        src={imgError ? fallbackUrl : imageUrl}
        alt={mcid ? `${mcid} のスキン` : 'Minecraft avatar'}
        width={size}
        height={size}
        style={{
          imageRendering: 'pixelated',
          display: isLoading ? 'none' : 'block',
          width: size,
          height: size,
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {isLoading && (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: '#3c3c3c',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
    </div>
  );
};

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
export const MinecraftAvatar = memo(MinecraftAvatarComponent);
