/**
 * Body Part Geometry Definitions
 * Based on skinview3d implementation: https://github.com/bs-community/skinview3d
 */

import type {
  Vector3,
  BodyPart,
  ArmModel,
  CubeFace,
  FaceName,
  SkinRegion,
  BodyPartFaceRegions,
} from '../shared/types';
import {
  BODY_REGIONS,
  MODEL_DIMENSIONS,
  BODY_POSITIONS,
  PIVOT_POINTS,
} from '../shared/constants';

/**
 * Face order matching Three.js BoxGeometry:
 * 0: right (+X), 1: left (-X), 2: top (+Y), 3: bottom (-Y), 4: front (+Z), 5: back (-Z)
 */
const FACE_ORDER: FaceName[] = ['right', 'left', 'top', 'bottom', 'front', 'back'];

/**
 * Create vertices for a box face
 * Vertices ordered for UV mapping: [top-left, top-right, bottom-right, bottom-left]
 * UV coordinates: (0,0) at top-left, (1,1) at bottom-right
 *
 * Minecraft coordinate system: +X is right, +Y is up, +Z is front (toward viewer)
 */
function createBoxFaceVertices(
  width: number,
  height: number,
  depth: number,
  face: FaceName
): [Vector3, Vector3, Vector3, Vector3] {
  const w = width / 2;
  const h = height / 2;
  const d = depth / 2;

  // Each face ordered so texture appears correctly when looking at that face
  switch (face) {
    case 'front': // +Z face (facing viewer) - character's front
      return [
        { x: -w, y: h, z: d },   // top-left
        { x: w, y: h, z: d },    // top-right
        { x: w, y: -h, z: d },   // bottom-right
        { x: -w, y: -h, z: d },  // bottom-left
      ];
    case 'back': // -Z face - character's back
      return [
        { x: w, y: h, z: -d },   // top-left (mirrored)
        { x: -w, y: h, z: -d },  // top-right
        { x: -w, y: -h, z: -d }, // bottom-right
        { x: w, y: -h, z: -d },  // bottom-left
      ];
    case 'right': // +X face - character's left arm side
      return [
        { x: w, y: h, z: d },    // top-left
        { x: w, y: h, z: -d },   // top-right
        { x: w, y: -h, z: -d },  // bottom-right
        { x: w, y: -h, z: d },   // bottom-left
      ];
    case 'left': // -X face - character's right arm side
      return [
        { x: -w, y: h, z: -d },  // top-left
        { x: -w, y: h, z: d },   // top-right
        { x: -w, y: -h, z: d },  // bottom-right
        { x: -w, y: -h, z: -d }, // bottom-left
      ];
    case 'top': // +Y face - top of head/body
      return [
        { x: -w, y: h, z: -d },  // top-left (back-left)
        { x: w, y: h, z: -d },   // top-right (back-right)
        { x: w, y: h, z: d },    // bottom-right (front-right)
        { x: -w, y: h, z: d },   // bottom-left (front-left)
      ];
    case 'bottom': // -Y face - bottom of body
      return [
        { x: -w, y: -h, z: d },  // top-left (front-left)
        { x: w, y: -h, z: d },   // top-right (front-right)
        { x: w, y: -h, z: -d },  // bottom-right (back-right)
        { x: -w, y: -h, z: -d }, // bottom-left (back-left)
      ];
  }
}

/**
 * Get normal vector for a face
 */
function getFaceNormal(face: FaceName): Vector3 {
  switch (face) {
    case 'right':
      return { x: 1, y: 0, z: 0 };
    case 'left':
      return { x: -1, y: 0, z: 0 };
    case 'top':
      return { x: 0, y: 1, z: 0 };
    case 'bottom':
      return { x: 0, y: -1, z: 0 };
    case 'front':
      return { x: 0, y: 0, z: 1 };
    case 'back':
      return { x: 0, y: 0, z: -1 };
  }
}

/**
 * Create a cube face with geometry and UV mapping
 */
function createCubeFace(
  width: number,
  height: number,
  depth: number,
  face: FaceName,
  uv: SkinRegion
): CubeFace {
  return {
    name: face,
    vertices: createBoxFaceVertices(width, height, depth, face),
    uv,
    normal: getFaceNormal(face),
  };
}

/**
 * Create all 6 faces for a body part cube
 */
function createBodyPartFaces(
  width: number,
  height: number,
  depth: number,
  regions: BodyPartFaceRegions
): CubeFace[] {
  return FACE_ORDER.map((face) =>
    createCubeFace(width, height, depth, face, regions[face])
  );
}

/**
 * Get texture regions for a body part
 */
export function getBodyPartRegions(
  part: BodyPart,
  layer: 'BASE' | 'OVERLAY',
  armModel: ArmModel = 'classic'
): BodyPartFaceRegions {
  switch (part) {
    case 'head':
      return BODY_REGIONS.HEAD[layer];
    case 'torso':
      return BODY_REGIONS.TORSO[layer];
    case 'leftArm':
      return BODY_REGIONS.LEFT_ARM[armModel === 'slim' ? 'SLIM' : 'CLASSIC'][layer];
    case 'rightArm':
      return BODY_REGIONS.RIGHT_ARM[armModel === 'slim' ? 'SLIM' : 'CLASSIC'][layer];
    case 'leftLeg':
      return BODY_REGIONS.LEFT_LEG[layer];
    case 'rightLeg':
      return BODY_REGIONS.RIGHT_LEG[layer];
  }
}

/**
 * Get model dimensions for a body part
 */
export function getBodyPartDimensions(
  part: BodyPart,
  armModel: ArmModel = 'classic'
): { width: number; height: number; depth: number } {
  switch (part) {
    case 'head':
      return MODEL_DIMENSIONS.HEAD;
    case 'torso':
      return MODEL_DIMENSIONS.TORSO;
    case 'leftArm':
    case 'rightArm':
      return armModel === 'slim' ? MODEL_DIMENSIONS.ARM_SLIM : MODEL_DIMENSIONS.ARM_CLASSIC;
    case 'leftLeg':
    case 'rightLeg':
      return MODEL_DIMENSIONS.LEG;
  }
}

/**
 * Get position key for body part
 */
function getPositionKey(part: BodyPart): string {
  const keyMap: Record<BodyPart, string> = {
    head: 'HEAD',
    torso: 'TORSO',
    leftArm: 'LEFT_ARM',
    rightArm: 'RIGHT_ARM',
    leftLeg: 'LEFT_LEG',
    rightLeg: 'RIGHT_LEG',
  };
  return keyMap[part];
}

/**
 * Get body part position
 */
export function getBodyPartPosition(part: BodyPart): Vector3 {
  const key = getPositionKey(part);
  return { ...BODY_POSITIONS[key] };
}

/**
 * Get pivot point for body part rotation
 */
export function getBodyPartPivot(part: BodyPart): Vector3 {
  const key = getPositionKey(part);
  return { ...PIVOT_POINTS[key] };
}

/**
 * Body part mesh interface
 */
export interface BodyPartMesh {
  part: BodyPart;
  faces: CubeFace[];
  position: Vector3;
  pivot: Vector3;
  width: number;
  height: number;
  depth: number;
  isOverlay: boolean;
}

/**
 * Create mesh for a body part (base or overlay layer)
 */
export function createBodyPartMesh(
  part: BodyPart,
  layer: 'BASE' | 'OVERLAY',
  armModel: ArmModel = 'classic'
): BodyPartMesh {
  const dims = getBodyPartDimensions(part, armModel);
  const position = getBodyPartPosition(part);
  const pivot = getBodyPartPivot(part);
  const regions = getBodyPartRegions(part, layer, armModel);

  // Overlay is slightly larger to prevent z-fighting
  // Based on skinview3d: outer layer is ~0.5 larger for head, ~0.5 for other parts
  let width = dims.width;
  let height = dims.height;
  let depth = dims.depth;

  if (layer === 'OVERLAY') {
    const inflate = part === 'head' ? 0.5 : 0.25;
    width += inflate * 2;
    height += inflate * 2;
    depth += inflate * 2;
  }

  const faces = createBodyPartFaces(width, height, depth, regions);

  return {
    part,
    faces,
    position,
    pivot,
    width,
    height,
    depth,
    isOverlay: layer === 'OVERLAY',
  };
}

/**
 * Create all body part meshes for a character
 */
export function createCharacterMeshes(
  armModel: ArmModel = 'classic',
  includeOverlay: boolean = true
): BodyPartMesh[] {
  const parts: BodyPart[] = [
    'head',
    'torso',
    'leftArm',
    'rightArm',
    'leftLeg',
    'rightLeg',
  ];

  const meshes: BodyPartMesh[] = [];

  for (const part of parts) {
    // Add base layer
    meshes.push(createBodyPartMesh(part, 'BASE', armModel));

    // Add overlay layer if enabled
    if (includeOverlay) {
      meshes.push(createBodyPartMesh(part, 'OVERLAY', armModel));
    }
  }

  return meshes;
}
