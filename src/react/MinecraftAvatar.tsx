'use client';

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import type { MinecraftAvatarProps } from '../shared/types';

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

// Head region coordinates in skin texture (8x8 pixels)
const HEAD_BASE = { x: 8, y: 8, width: 8, height: 8 };
const HEAD_OVERLAY = { x: 40, y: 8, width: 8, height: 8 };

const MinecraftAvatarComponent = ({
  uuid,
  mcid,
  size = 64,
  overlay = true,
  className = '',
  apiEndpoint,
}: MinecraftAvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Server-side rendering mode
  if (apiEndpoint) {
    const imageUrl = `${apiEndpoint}?uuid=${uuid}&size=${size}&overlay=${overlay}`;
    const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&size=${size}&overlay=${overlay}`;

    const handleLoad = useCallback(() => {
      setIsLoading(false);
    }, []);

    const handleError = useCallback(() => {
      setError(true);
      setIsLoading(false);
    }, []);

    useEffect(() => {
      setError(false);
      setIsLoading(true);
    }, [uuid]);

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
          src={error ? fallbackUrl : imageUrl}
          alt={mcid ? `${mcid}'s avatar` : 'Minecraft avatar'}
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
          loading="lazy"
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
  }

  // Client-side rendering mode
  useEffect(() => {
    let cancelled = false;

    const renderAvatar = async () => {
      setIsLoading(true);
      setError(false);

      const skinUrl = `https://crafatar.com/skins/${uuid}`;
      const fallbackSkinUrl = `https://crafatar.com/skins/${STEVE_UUID}`;

      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      };

      try {
        let skinImage: HTMLImageElement;
        try {
          skinImage = await loadImage(skinUrl);
        } catch {
          // Fallback to Steve skin
          skinImage = await loadImage(fallbackSkinUrl);
        }

        if (cancelled) return;

        // Create offscreen canvas for extraction
        const extractCanvas = document.createElement('canvas');
        extractCanvas.width = 8;
        extractCanvas.height = 8;
        const extractCtx = extractCanvas.getContext('2d');
        if (!extractCtx) return;

        // Disable image smoothing for pixel-perfect rendering
        extractCtx.imageSmoothingEnabled = false;

        // Draw base head
        extractCtx.drawImage(
          skinImage,
          HEAD_BASE.x,
          HEAD_BASE.y,
          HEAD_BASE.width,
          HEAD_BASE.height,
          0,
          0,
          8,
          8
        );

        // Draw overlay if enabled
        if (overlay) {
          extractCtx.drawImage(
            skinImage,
            HEAD_OVERLAY.x,
            HEAD_OVERLAY.y,
            HEAD_OVERLAY.width,
            HEAD_OVERLAY.height,
            0,
            0,
            8,
            8
          );
        }

        // Scale to output size
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = size;
        outputCanvas.height = size;
        const outputCtx = outputCanvas.getContext('2d');
        if (!outputCtx) return;

        outputCtx.imageSmoothingEnabled = false;
        outputCtx.drawImage(extractCanvas, 0, 0, size, size);

        // Convert to data URL
        const dataUrl = outputCanvas.toDataURL('image/png');

        if (!cancelled) {
          setImgSrc(dataUrl);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to render avatar:', err);
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      }
    };

    renderAvatar();

    return () => {
      cancelled = true;
    };
  }, [uuid, size, overlay]);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    >
      {imgSrc && !isLoading && (
        <img
          src={imgSrc}
          alt={mcid ? `${mcid}'s avatar` : 'Minecraft avatar'}
          width={size}
          height={size}
          style={{
            imageRendering: 'pixelated',
            width: size,
            height: size,
          }}
        />
      )}
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
      {error && !isLoading && (
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
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

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
export const MinecraftAvatar = memo(MinecraftAvatarComponent);
