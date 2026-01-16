/**
 * 3D Module Exports
 * Provides access to 3D rendering utilities for advanced usage
 */

// Projection and math utilities
export {
  degToRad,
  addVec3,
  subVec3,
  scaleVec3,
  dotVec3,
  crossVec3,
  normalizeVec3,
  rotateX,
  rotateY,
  rotateZ,
  applyRotation,
  rotateAroundPivot,
  applyViewTransform,
  projectOrthographic,
  projectPerspective,
  calculateAverageDepth,
  calculateFaceNormal,
  isFaceVisible,
  transformAndProjectQuad,
} from './projection';

// Geometry utilities
export {
  getBodyPartRegions,
  getBodyPartDimensions,
  getBodyPartPosition,
  getBodyPartPivot,
  createBodyPartMesh,
  createCharacterMeshes,
  type BodyPartMesh,
} from './geometry';

// Pose utilities
export {
  POSES,
  POSE_STANDING,
  POSE_WALKING,
  POSE_RUNNING,
  POSE_WAVING,
  POSE_SITTING,
  POSE_POINTING,
  POSE_CROSSED_ARMS,
  getPose,
  validatePose,
  getBodyPartPose,
  createCustomPose,
  interpolatePoses,
} from './poses';

// Texture mapping utilities
export {
  extractTextureRegion,
  hasVisiblePixels,
  calculatePerspectiveMatrix,
  sampleTextureBilinear,
  sampleTextureNearest,
  calculateBoundingBox,
  isPointInQuad,
  getBarycentricCoords,
} from './texture-mapper';
