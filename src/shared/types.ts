/**
 * Minecraft Avatar Types
 */

/**
 * Skin format enumeration
 */
export type SkinFormat = 'legacy' | 'modern';
// legacy: 64x32 (pre-1.8)
// modern: 64x64 (1.8+)

/**
 * Avatar rendering options
 */
export interface AvatarOptions {
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
export interface AvatarResult {
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
 * Skin texture information from Mojang API
 */
export interface SkinTextureInfo {
  /** Skin texture URL */
  skinUrl: string;
  /** Whether skin is slim (Alex) model */
  isSlim: boolean;
  /** Cape URL if present */
  capeUrl?: string;
}

/**
 * Mojang profile response
 */
export interface MojangProfile {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * Skin region coordinates for extraction
 */
export interface SkinRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * React/Vue component props
 */
export interface MinecraftAvatarProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output size in pixels (default: 64) */
  size?: number;
  /** Include overlay/hat layer (default: true) */
  overlay?: boolean;
  /** Additional CSS class */
  className?: string;
  /** API endpoint for server-side rendering. If not specified, renders client-side. */
  apiEndpoint?: string;
}

// ============================================================
// 3D Full Body Types
// ============================================================

/**
 * 3D Vector representation
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D Point after projection
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Euler rotation angles in degrees
 */
export interface Rotation3D {
  /** Pitch - rotation around X axis */
  pitch: number;
  /** Yaw - rotation around Y axis */
  yaw: number;
  /** Roll - rotation around Z axis */
  roll: number;
}

/**
 * Body part identifier
 */
export type BodyPart =
  | 'head'
  | 'torso'
  | 'leftArm'
  | 'rightArm'
  | 'leftLeg'
  | 'rightLeg';

/**
 * Arm model type
 */
export type ArmModel = 'classic' | 'slim';

/**
 * Predefined pose names
 */
export type PoseName =
  | 'standing'
  | 'walking'
  | 'waving'
  | 'running'
  | 'sitting'
  | 'pointing'
  | 'crossed_arms'
  | 'custom';

/**
 * Individual body part pose configuration
 */
export interface BodyPartPose {
  /** Rotation angles for this body part */
  rotation: Rotation3D;
  /** Optional position offset from default */
  offset?: Vector3;
}

/**
 * Complete pose definition for all body parts
 */
export interface PoseDefinition {
  /** Pose identifier */
  name: PoseName;
  /** Head pose */
  head: BodyPartPose;
  /** Torso pose (usually identity) */
  torso: BodyPartPose;
  /** Left arm pose */
  leftArm: BodyPartPose;
  /** Right arm pose */
  rightArm: BodyPartPose;
  /** Left leg pose */
  leftLeg: BodyPartPose;
  /** Right leg pose */
  rightLeg: BodyPartPose;
}

/**
 * Camera/view configuration
 */
export interface ViewConfig {
  /** Camera rotation around the model (degrees, 0 = front view) */
  angle: number;
  /** Camera elevation angle (degrees, 0 = eye level) */
  elevation: number;
  /** Zoom level (1.0 = default) */
  zoom: number;
}

/**
 * Full body rendering options
 */
export interface FullBodyOptions {
  /** Output width in pixels (default: 300) */
  width?: number;
  /** Output height in pixels (default: 400) */
  height?: number;
  /** Pixel density scale factor for high-DPI rendering (default: 1, use 2 for Retina) */
  scale?: number;
  /** Include overlay layers (default: true) */
  includeOverlay?: boolean;
  /** Pose to use (default: 'standing') */
  pose?: PoseName | PoseDefinition;
  /** View/camera configuration */
  view?: Partial<ViewConfig>;
  /** Arm model override (auto-detected from skin if not specified) */
  armModel?: ArmModel;
  /** Background color (default: transparent) */
  background?: string | null;
  /** Fallback UUID if skin fetch fails */
  fallbackUuid?: string;
  /** Enable shadow/ground plane (default: false) */
  shadow?: boolean;
}

/**
 * Result of full body generation
 */
export interface FullBodyResult {
  /** Image data as Buffer */
  data: Buffer;
  /** Content type */
  contentType: 'image/png';
  /** Whether fallback was used */
  usedFallback: boolean;
  /** Detected skin format */
  skinFormat: SkinFormat;
  /** Detected or specified arm model */
  armModel: ArmModel;
  /** Pose used */
  pose: PoseName;
  /** Whether overlays were applied */
  hasOverlay: boolean;
}

/**
 * React/Vue full body component props
 */
export interface MinecraftFullBodyProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output width in pixels (default: 300) */
  width?: number;
  /** Output height in pixels (default: 400) */
  height?: number;
  /** Pose name (default: 'standing') */
  pose?: PoseName;
  /** View angle in degrees (default: 25) */
  angle?: number;
  /** View elevation in degrees (default: 10) */
  elevation?: number;
  /** Zoom level (default: 0.9) */
  zoom?: number;
  /** Additional CSS class */
  className?: string;
  /** Background color (default: transparent) */
  background?: string;
  /** Walk animation enabled (default: false) */
  walk?: boolean;
  /** Run animation enabled (default: false) */
  run?: boolean;
  /** Rotate animation enabled (default: false) */
  rotate?: boolean;
  /** API endpoint for server-side rendering. If not specified, renders client-side with skinview3d. */
  apiEndpoint?: string;
}

/**
 * Face name for a cube
 */
export type FaceName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

/**
 * 3D Face of a cube (for rendering)
 */
export interface CubeFace {
  /** Face identifier */
  name: FaceName;
  /** 4 vertices in 3D space (before transformation) */
  vertices: [Vector3, Vector3, Vector3, Vector3];
  /** UV coordinates for texture mapping */
  uv: SkinRegion;
  /** Normal vector for lighting/visibility */
  normal: Vector3;
}

/**
 * Body part geometry definition
 */
export interface BodyPartGeometry {
  /** Body part identifier */
  part: BodyPart;
  /** 6 faces of the cube */
  faces: CubeFace[];
  /** Pivot point for rotation */
  pivot: Vector3;
  /** Default position in model space */
  position: Vector3;
  /** Size in model units (width, height, depth) */
  size: Vector3;
}

/**
 * Projected quad ready for rendering
 */
export interface ProjectedQuad {
  /** 4 corners in 2D screen space */
  points: [Point2D, Point2D, Point2D, Point2D];
  /** Texture region to sample */
  textureRegion: SkinRegion;
  /** Depth for z-sorting (average Z of vertices) */
  depth: number;
  /** Whether this is an overlay layer */
  isOverlay: boolean;
  /** Source body part */
  bodyPart: BodyPart;
  /** Face name */
  face: FaceName;
}

/**
 * Body part face regions for skin texture
 */
export interface BodyPartFaceRegions {
  front: SkinRegion;
  back: SkinRegion;
  left: SkinRegion;
  right: SkinRegion;
  top: SkinRegion;
  bottom: SkinRegion;
}

/**
 * Body part layer regions (base and overlay)
 */
export interface BodyPartLayerRegions {
  BASE: BodyPartFaceRegions;
  OVERLAY: BodyPartFaceRegions;
}

/**
 * Arm regions with classic and slim variants
 */
export interface ArmRegions {
  CLASSIC: BodyPartLayerRegions;
  SLIM: BodyPartLayerRegions;
}
