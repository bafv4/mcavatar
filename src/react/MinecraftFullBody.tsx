'use client';

import { useRef, useEffect, useState, memo, useCallback } from 'react';
import type { MinecraftFullBodyProps, PoseName } from '../shared/types';

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

// Skinview3d types (dynamically imported)
type SkinViewer = {
  dispose: () => void;
  loadSkin: (url: string, options?: { model?: 'default' | 'slim' }) => Promise<void>;
  playerObject: {
    skin: {
      head: { rotation: { x: number; y: number; z: number } };
      body: { rotation: { x: number; y: number; z: number } };
      leftArm: { rotation: { x: number; y: number; z: number } };
      rightArm: { rotation: { x: number; y: number; z: number } };
      leftLeg: { rotation: { x: number; y: number; z: number } };
      rightLeg: { rotation: { x: number; y: number; z: number } };
    };
  };
  camera: {
    rotation: { x: number; y: number; z: number };
  };
  animation: unknown;
  autoRotate: boolean;
  autoRotateSpeed: number;
  width: number;
  height: number;
  render: () => void;
};

type SkinviewModule = {
  SkinViewer: new (options: {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    skin?: string;
    zoom?: number;
    background?: string;
  }) => SkinViewer;
  WalkingAnimation: new () => unknown;
  RunningAnimation: new () => unknown;
};

// Pose rotations in radians for skinview3d
const POSE_ROTATIONS: Record<
  Exclude<PoseName, 'custom'>,
  {
    head: { x: number; y: number; z: number };
    body: { x: number; y: number; z: number };
    leftArm: { x: number; y: number; z: number };
    rightArm: { x: number; y: number; z: number };
    leftLeg: { x: number; y: number; z: number };
    rightLeg: { x: number; y: number; z: number };
  }
> = {
  standing: {
    head: { x: 0, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.05 },
    rightArm: { x: 0, y: 0, z: -0.05 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  walking: {
    head: { x: 0, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0.5, y: 0, z: 0.05 },
    rightArm: { x: -0.5, y: 0, z: -0.05 },
    leftLeg: { x: -0.4, y: 0, z: 0 },
    rightLeg: { x: 0.4, y: 0, z: 0 },
  },
  running: {
    head: { x: -0.1, y: 0, z: 0 },
    body: { x: -0.17, y: 0, z: 0 },
    leftArm: { x: 0.9, y: 0, z: 0.1 },
    rightArm: { x: -0.9, y: 0, z: -0.1 },
    leftLeg: { x: -0.7, y: 0, z: 0 },
    rightLeg: { x: 0.7, y: 0, z: 0 },
  },
  waving: {
    head: { x: 0, y: 0.26, z: 0.1 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.05 },
    rightArm: { x: -2.1, y: 0.35, z: -0.35 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  sitting: {
    head: { x: 0.1, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: -0.8, y: 0, z: 0.17 },
    rightArm: { x: -0.8, y: 0, z: -0.17 },
    leftLeg: { x: -1.57, y: 0, z: 0 },
    rightLeg: { x: -1.57, y: 0, z: 0 },
  },
  pointing: {
    head: { x: -0.1, y: -0.17, z: 0 },
    body: { x: 0, y: -0.1, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.1 },
    rightArm: { x: -1.57, y: -0.17, z: 0 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  crossed_arms: {
    head: { x: 0.1, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: -0.9, y: 0, z: 0.9 },
    rightArm: { x: -0.9, y: 0, z: -0.9 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
};

const MinecraftFullBodyComponent = ({
  uuid,
  mcid,
  width = 300,
  height = 400,
  pose = 'standing',
  angle = 25,
  elevation = 10,
  zoom = 0.9,
  className = '',
  background,
  walk = false,
  run = false,
  rotate = false,
  apiEndpoint,
}: MinecraftFullBodyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Server-side rendering mode
  if (apiEndpoint) {
    const imageUrl = `${apiEndpoint}?uuid=${uuid}&width=${width}&height=${height}&pose=${pose}&angle=${angle}&elevation=${elevation}&zoom=${zoom}`;
    const fallbackUrl = `${apiEndpoint}?uuid=${STEVE_UUID}&width=${width}&height=${height}&pose=${pose}&angle=${angle}&elevation=${elevation}&zoom=${zoom}`;

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
    }, [uuid, pose, angle, elevation, zoom, width, height]);

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
          src={error ? fallbackUrl : imageUrl}
          alt={mcid ? `${mcid}'s Minecraft avatar` : 'Minecraft avatar'}
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
          loading="lazy"
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
  }

  // Client-side rendering mode (skinview3d)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;

    const initViewer = async () => {
      try {
        // Dynamically import skinview3d
        const skinview3d = (await import('skinview3d')) as SkinviewModule;

        if (disposed) return;

        // Clean up existing viewer
        if (viewerRef.current) {
          viewerRef.current.dispose();
        }

        // Create new viewer
        const viewer = new skinview3d.SkinViewer({
          canvas,
          width,
          height,
          zoom,
          background: background || undefined,
        });

        viewerRef.current = viewer;

        // Load skin
        const skinUrl = `https://crafatar.com/skins/${uuid}`;
        try {
          await viewer.loadSkin(skinUrl);
        } catch {
          // Fallback to Steve skin
          const steveUrl = `https://crafatar.com/skins/${STEVE_UUID}`;
          await viewer.loadSkin(steveUrl);
        }

        // Set camera angle
        const angleRad = (angle * Math.PI) / 180;
        const elevationRad = (elevation * Math.PI) / 180;
        viewer.camera.rotation.x = elevationRad;
        viewer.camera.rotation.y = angleRad;

        // Apply pose or animation
        if (walk && !run) {
          viewer.animation = new skinview3d.WalkingAnimation();
        } else if (run) {
          viewer.animation = new skinview3d.RunningAnimation();
        } else if (pose !== 'custom') {
          const poseRotations = POSE_ROTATIONS[pose];
          if (poseRotations && viewer.playerObject?.skin) {
            const skin = viewer.playerObject.skin;
            skin.head.rotation.x = poseRotations.head.x;
            skin.head.rotation.y = poseRotations.head.y;
            skin.head.rotation.z = poseRotations.head.z;
            skin.body.rotation.x = poseRotations.body.x;
            skin.body.rotation.y = poseRotations.body.y;
            skin.body.rotation.z = poseRotations.body.z;
            skin.leftArm.rotation.x = poseRotations.leftArm.x;
            skin.leftArm.rotation.y = poseRotations.leftArm.y;
            skin.leftArm.rotation.z = poseRotations.leftArm.z;
            skin.rightArm.rotation.x = poseRotations.rightArm.x;
            skin.rightArm.rotation.y = poseRotations.rightArm.y;
            skin.rightArm.rotation.z = poseRotations.rightArm.z;
            skin.leftLeg.rotation.x = poseRotations.leftLeg.x;
            skin.leftLeg.rotation.y = poseRotations.leftLeg.y;
            skin.leftLeg.rotation.z = poseRotations.leftLeg.z;
            skin.rightLeg.rotation.x = poseRotations.rightLeg.x;
            skin.rightLeg.rotation.y = poseRotations.rightLeg.y;
            skin.rightLeg.rotation.z = poseRotations.rightLeg.z;
          }
        }

        // Enable rotation if requested
        if (rotate) {
          viewer.autoRotate = true;
          viewer.autoRotateSpeed = 1;
        }

        viewer.render();
      } catch (error) {
        console.error('Failed to initialize skinview3d:', error);
      }
    };

    initViewer();

    return () => {
      disposed = true;
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, [uuid, width, height, pose, angle, elevation, zoom, background, walk, run, rotate]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width,
        height,
      }}
      aria-label={mcid ? `${mcid}'s Minecraft avatar` : 'Minecraft avatar'}
    />
  );
};

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
export const MinecraftFullBody = memo(MinecraftFullBodyComponent);
