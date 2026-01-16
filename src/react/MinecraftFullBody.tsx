'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import type { MinecraftFullBodyProps, PoseName } from '../shared/types';
import { STEVE_UUID } from '../shared/constants';

const MinecraftFullBodyComponent = ({
  uuid,
  mcid,
  width = 128,
  height = 256,
  pose = 'standing',
  angle = 25,
  className = '',
  priority = false,
  apiEndpoint = '/api/fullbody',
}: MinecraftFullBodyProps) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Construct API URL
  const imageUrl = `${apiEndpoint}?uuid=${uuid}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;
  const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&width=${width}&height=${height}&pose=${pose}&angle=${angle}`;

  // Reset state when props change
  useEffect(() => {
    setImgError(false);
    setIsLoading(true);
  }, [uuid, pose, angle, width, height]);

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
        width,
        height,
        position: 'relative',
      }}
    >
      <img
        src={imgError ? fallbackUrl : imageUrl}
        alt={mcid ? `${mcid} のフルボディ` : 'Minecraft full body avatar'}
        width={width}
        height={height}
        style={{
          imageRendering: 'pixelated',
          display: isLoading ? 'none' : 'block',
          width,
          height,
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {isLoading && (
        <div
          style={{
            width,
            height,
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
export const MinecraftFullBody = memo(MinecraftFullBodyComponent);
