/**
 * Minecraft Avatar Constants
 */

import type {
  AvatarOptions,
  SkinRegion,
  FullBodyOptions,
  BodyPartLayerRegions,
  ArmRegions,
  ViewConfig,
  Vector3,
} from './types';

/**
 * Steve's UUID for fallback
 */
export const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

/**
 * Mojang API endpoints
 */
export const MOJANG_API = {
  SESSION_SERVER: 'https://sessionserver.mojang.com/session/minecraft/profile',
} as const;

/**
 * Skin texture dimensions
 */
export const SKIN_DIMENSIONS = {
  LEGACY: { width: 64, height: 32 },
  MODERN: { width: 64, height: 64 },
} as const;

/**
 * Head region coordinates (8x8 pixels)
 */
export const HEAD_REGIONS: {
  BASE: SkinRegion;
  OVERLAY: SkinRegion;
} = {
  /** Base head layer */
  BASE: { x: 8, y: 8, width: 8, height: 8 },
  /** Overlay/hat layer (modern skins only) */
  OVERLAY: { x: 40, y: 8, width: 8, height: 8 },
};

/**
 * Default avatar options
 */
export const DEFAULT_OPTIONS: Required<AvatarOptions> = {
  size: 64,
  includeOverlay: true,
  fallbackUuid: STEVE_UUID,
};

// ============================================================
// 3D Full Body Constants
// ============================================================

/**
 * Body part skin regions for 64x64 modern skins
 * Each body part has base and overlay layers
 * Each layer has 6 faces: front, back, left, right, top, bottom
 */
export const BODY_REGIONS = {
  // Note: In Minecraft skin format, "right" and "left" refer to the character's perspective
  // In our 3D coordinate system (+X is viewer's right), we need to swap them:
  // - +X face (our "right") shows character's left side texture
  // - -X face (our "left") shows character's right side texture
  HEAD: {
    BASE: {
      right: { x: 16, y: 8, width: 8, height: 8 },  // +X face shows left texture
      front: { x: 8, y: 8, width: 8, height: 8 },
      left: { x: 0, y: 8, width: 8, height: 8 },    // -X face shows right texture
      back: { x: 24, y: 8, width: 8, height: 8 },
      top: { x: 8, y: 0, width: 8, height: 8 },
      bottom: { x: 16, y: 0, width: 8, height: 8 },
    },
    OVERLAY: {
      right: { x: 48, y: 8, width: 8, height: 8 },  // +X face shows left texture
      front: { x: 40, y: 8, width: 8, height: 8 },
      left: { x: 32, y: 8, width: 8, height: 8 },   // -X face shows right texture
      back: { x: 56, y: 8, width: 8, height: 8 },
      top: { x: 40, y: 0, width: 8, height: 8 },
      bottom: { x: 48, y: 0, width: 8, height: 8 },
    },
  } as BodyPartLayerRegions,

  TORSO: {
    BASE: {
      right: { x: 28, y: 20, width: 4, height: 12 },  // +X shows left texture
      front: { x: 20, y: 20, width: 8, height: 12 },
      left: { x: 16, y: 20, width: 4, height: 12 },   // -X shows right texture
      back: { x: 32, y: 20, width: 8, height: 12 },
      top: { x: 20, y: 16, width: 8, height: 4 },
      bottom: { x: 28, y: 16, width: 8, height: 4 },
    },
    OVERLAY: {
      right: { x: 28, y: 36, width: 4, height: 12 },
      front: { x: 20, y: 36, width: 8, height: 12 },
      left: { x: 16, y: 36, width: 4, height: 12 },
      back: { x: 32, y: 36, width: 8, height: 12 },
      top: { x: 20, y: 32, width: 8, height: 4 },
      bottom: { x: 28, y: 32, width: 8, height: 4 },
    },
  } as BodyPartLayerRegions,

  RIGHT_ARM: {
    CLASSIC: {
      BASE: {
        right: { x: 48, y: 20, width: 4, height: 12 },  // +X shows left texture
        front: { x: 44, y: 20, width: 4, height: 12 },
        left: { x: 40, y: 20, width: 4, height: 12 },   // -X shows right texture
        back: { x: 52, y: 20, width: 4, height: 12 },
        top: { x: 44, y: 16, width: 4, height: 4 },
        bottom: { x: 48, y: 16, width: 4, height: 4 },
      },
      OVERLAY: {
        right: { x: 48, y: 36, width: 4, height: 12 },
        front: { x: 44, y: 36, width: 4, height: 12 },
        left: { x: 40, y: 36, width: 4, height: 12 },
        back: { x: 52, y: 36, width: 4, height: 12 },
        top: { x: 44, y: 32, width: 4, height: 4 },
        bottom: { x: 48, y: 32, width: 4, height: 4 },
      },
    },
    SLIM: {
      BASE: {
        right: { x: 47, y: 20, width: 4, height: 12 },
        front: { x: 44, y: 20, width: 3, height: 12 },
        left: { x: 40, y: 20, width: 4, height: 12 },
        back: { x: 51, y: 20, width: 3, height: 12 },
        top: { x: 44, y: 16, width: 3, height: 4 },
        bottom: { x: 47, y: 16, width: 3, height: 4 },
      },
      OVERLAY: {
        right: { x: 47, y: 36, width: 4, height: 12 },
        front: { x: 44, y: 36, width: 3, height: 12 },
        left: { x: 40, y: 36, width: 4, height: 12 },
        back: { x: 51, y: 36, width: 3, height: 12 },
        top: { x: 44, y: 32, width: 3, height: 4 },
        bottom: { x: 47, y: 32, width: 3, height: 4 },
      },
    },
  } as ArmRegions,

  LEFT_ARM: {
    CLASSIC: {
      BASE: {
        right: { x: 40, y: 52, width: 4, height: 12 },  // +X shows left texture
        front: { x: 36, y: 52, width: 4, height: 12 },
        left: { x: 32, y: 52, width: 4, height: 12 },   // -X shows right texture
        back: { x: 44, y: 52, width: 4, height: 12 },
        top: { x: 36, y: 48, width: 4, height: 4 },
        bottom: { x: 40, y: 48, width: 4, height: 4 },
      },
      OVERLAY: {
        right: { x: 56, y: 52, width: 4, height: 12 },
        front: { x: 52, y: 52, width: 4, height: 12 },
        left: { x: 48, y: 52, width: 4, height: 12 },
        back: { x: 60, y: 52, width: 4, height: 12 },
        top: { x: 52, y: 48, width: 4, height: 4 },
        bottom: { x: 56, y: 48, width: 4, height: 4 },
      },
    },
    SLIM: {
      BASE: {
        right: { x: 39, y: 52, width: 4, height: 12 },
        front: { x: 36, y: 52, width: 3, height: 12 },
        left: { x: 32, y: 52, width: 4, height: 12 },
        back: { x: 43, y: 52, width: 3, height: 12 },
        top: { x: 36, y: 48, width: 3, height: 4 },
        bottom: { x: 39, y: 48, width: 3, height: 4 },
      },
      OVERLAY: {
        right: { x: 55, y: 52, width: 4, height: 12 },
        front: { x: 52, y: 52, width: 3, height: 12 },
        left: { x: 48, y: 52, width: 4, height: 12 },
        back: { x: 59, y: 52, width: 3, height: 12 },
        top: { x: 52, y: 48, width: 3, height: 4 },
        bottom: { x: 55, y: 48, width: 3, height: 4 },
      },
    },
  } as ArmRegions,

  RIGHT_LEG: {
    BASE: {
      right: { x: 8, y: 20, width: 4, height: 12 },   // +X shows left texture
      front: { x: 4, y: 20, width: 4, height: 12 },
      left: { x: 0, y: 20, width: 4, height: 12 },    // -X shows right texture
      back: { x: 12, y: 20, width: 4, height: 12 },
      top: { x: 4, y: 16, width: 4, height: 4 },
      bottom: { x: 8, y: 16, width: 4, height: 4 },
    },
    OVERLAY: {
      right: { x: 8, y: 36, width: 4, height: 12 },
      front: { x: 4, y: 36, width: 4, height: 12 },
      left: { x: 0, y: 36, width: 4, height: 12 },
      back: { x: 12, y: 36, width: 4, height: 12 },
      top: { x: 4, y: 32, width: 4, height: 4 },
      bottom: { x: 8, y: 32, width: 4, height: 4 },
    },
  } as BodyPartLayerRegions,

  LEFT_LEG: {
    BASE: {
      right: { x: 24, y: 52, width: 4, height: 12 },  // +X shows left texture
      front: { x: 20, y: 52, width: 4, height: 12 },
      left: { x: 16, y: 52, width: 4, height: 12 },   // -X shows right texture
      back: { x: 28, y: 52, width: 4, height: 12 },
      top: { x: 20, y: 48, width: 4, height: 4 },
      bottom: { x: 24, y: 48, width: 4, height: 4 },
    },
    OVERLAY: {
      right: { x: 8, y: 52, width: 4, height: 12 },
      front: { x: 4, y: 52, width: 4, height: 12 },
      left: { x: 0, y: 52, width: 4, height: 12 },
      back: { x: 12, y: 52, width: 4, height: 12 },
      top: { x: 4, y: 48, width: 4, height: 4 },
      bottom: { x: 8, y: 48, width: 4, height: 4 },
    },
  } as BodyPartLayerRegions,
} as const;

/**
 * Model dimensions in Minecraft units (1 unit = 1 pixel on skin)
 */
export const MODEL_DIMENSIONS = {
  HEAD: { width: 8, height: 8, depth: 8 },
  TORSO: { width: 8, height: 12, depth: 4 },
  ARM_CLASSIC: { width: 4, height: 12, depth: 4 },
  ARM_SLIM: { width: 3, height: 12, depth: 4 },
  LEG: { width: 4, height: 12, depth: 4 },
} as const;

/**
 * Body part positions (based on skinview3d coordinate system)
 * Origin at model center, Y-axis up
 * Reference: https://github.com/bs-community/skinview3d/blob/master/src/model.ts
 */
export const BODY_POSITIONS: Record<string, Vector3> = {
  HEAD: { x: 0, y: 4, z: 0 },
  TORSO: { x: 0, y: -6, z: 0 },
  // Arms positioned so their front face appears to touch body
  // x=4: arm inner edge at x=2, visually adjacent to body edge at x=4
  LEFT_ARM: { x: 4, y: -2, z: 2 },
  RIGHT_ARM: { x: -4, y: -2, z: 2 },
  LEFT_LEG: { x: 2, y: -12, z: 0 },
  RIGHT_LEG: { x: -2, y: -12, z: 0 },
};

/**
 * Pivot points for rotation (relative to body part position)
 * Based on skinview3d implementation
 */
export const PIVOT_POINTS: Record<string, Vector3> = {
  HEAD: { x: 0, y: -4, z: 0 },       // Pivot at neck (bottom of head)
  TORSO: { x: 0, y: 6, z: 0 },       // Pivot at top of body
  LEFT_ARM: { x: -1, y: 4, z: 0 },   // Pivot at shoulder joint
  RIGHT_ARM: { x: 1, y: 4, z: 0 },
  LEFT_LEG: { x: 0, y: 6, z: 0 },    // Pivot at hip joint (top of leg)
  RIGHT_LEG: { x: 0, y: 6, z: 0 },
};

/**
 * Default view configuration
 */
export const DEFAULT_VIEW: ViewConfig = {
  angle: 25,
  elevation: 10,
  zoom: 1.0,
};

/**
 * Default full body rendering options
 */
export const DEFAULT_FULLBODY_OPTIONS: Required<
  Omit<FullBodyOptions, 'armModel' | 'pose'>
> & { pose: 'standing' } = {
  width: 300,
  height: 400,
  scale: 1,
  includeOverlay: true,
  pose: 'standing',
  view: DEFAULT_VIEW,
  background: null,
  fallbackUuid: STEVE_UUID,
  shadow: false,
};
