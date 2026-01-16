/**
 * 3D Projection and Vector Math Utilities
 */

import type { Vector3, Point2D, Rotation3D, ViewConfig } from '../shared/types';

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Add two vectors
 */
export function addVec3(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/**
 * Subtract vector b from vector a
 */
export function subVec3(a: Vector3, b: Vector3): Vector3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/**
 * Scale a vector by a scalar
 */
export function scaleVec3(v: Vector3, s: number): Vector3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

/**
 * Calculate dot product of two vectors
 */
export function dotVec3(a: Vector3, b: Vector3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Calculate cross product of two vectors
 */
export function crossVec3(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Normalize a vector to unit length
 */
export function normalizeVec3(v: Vector3): Vector3 {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

/**
 * Rotate a point around the X axis (pitch)
 */
export function rotateX(point: Vector3, angleDeg: number): Vector3 {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Y axis (yaw)
 */
export function rotateY(point: Vector3, angleDeg: number): Vector3 {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Z axis (roll)
 */
export function rotateZ(point: Vector3, angleDeg: number): Vector3 {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z,
  };
}

/**
 * Apply Euler rotation (pitch, yaw, roll) to a point
 * Order: Roll -> Pitch -> Yaw (ZXY convention)
 */
export function applyRotation(point: Vector3, rotation: Rotation3D): Vector3 {
  let result = point;
  result = rotateZ(result, rotation.roll);
  result = rotateX(result, rotation.pitch);
  result = rotateY(result, rotation.yaw);
  return result;
}

/**
 * Apply rotation around a pivot point
 */
export function rotateAroundPivot(
  point: Vector3,
  pivot: Vector3,
  rotation: Rotation3D
): Vector3 {
  // Translate to pivot origin
  const translated = subVec3(point, pivot);
  // Apply rotation
  const rotated = applyRotation(translated, rotation);
  // Translate back
  return addVec3(rotated, pivot);
}

/**
 * Apply view transformation (camera angle and elevation)
 * angle=0 shows front of character, angle=90 shows left side, angle=180 shows back
 */
export function applyViewTransform(point: Vector3, view: ViewConfig): Vector3 {
  // Negate angle so positive angles rotate camera around model (not model itself)
  // This makes angle=0 show the front, angle=90 show the left side
  let result = rotateY(point, -view.angle);
  // Then rotate around X axis (elevation) - negative to tilt camera up when elevation > 0
  result = rotateX(result, -view.elevation);
  // Apply zoom
  result = scaleVec3(result, view.zoom);
  return result;
}

/**
 * Project a 3D point to 2D using orthographic projection
 * Returns screen coordinates where Y is flipped (screen Y increases downward)
 */
export function projectOrthographic(
  point: Vector3,
  canvasWidth: number,
  canvasHeight: number,
  scale: number = 1
): Point2D {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  return {
    x: centerX + point.x * scale,
    y: centerY - point.y * scale, // Flip Y for screen coordinates
  };
}

/**
 * Project a 3D point to 2D using perspective projection
 */
export function projectPerspective(
  point: Vector3,
  canvasWidth: number,
  canvasHeight: number,
  fov: number = 50,
  distance: number = 100
): Point2D {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  const fovRad = degToRad(fov);
  const scale = distance / (distance + point.z);

  return {
    x: centerX + point.x * scale * (canvasWidth / (2 * Math.tan(fovRad / 2))),
    y: centerY - point.y * scale * (canvasWidth / (2 * Math.tan(fovRad / 2))),
  };
}

/**
 * Calculate the average depth (Z) of multiple points
 */
export function calculateAverageDepth(points: Vector3[]): number {
  if (points.length === 0) return 0;
  const sum = points.reduce((acc, p) => acc + p.z, 0);
  return sum / points.length;
}

/**
 * Calculate face normal from 3 vertices (counter-clockwise winding)
 */
export function calculateFaceNormal(
  v0: Vector3,
  v1: Vector3,
  v2: Vector3
): Vector3 {
  const edge1 = subVec3(v1, v0);
  const edge2 = subVec3(v2, v0);
  return normalizeVec3(crossVec3(edge1, edge2));
}

/**
 * Check if a face is visible from the camera (back-face culling)
 * Returns true if the face is facing toward the camera
 */
export function isFaceVisible(normal: Vector3, viewDirection: Vector3): boolean {
  return dotVec3(normal, viewDirection) < 0;
}

/**
 * Transform all vertices of a quad and return projected 2D points
 */
export function transformAndProjectQuad(
  vertices: [Vector3, Vector3, Vector3, Vector3],
  position: Vector3,
  pivot: Vector3,
  rotation: Rotation3D,
  view: ViewConfig,
  canvasWidth: number,
  canvasHeight: number,
  scale: number
): {
  points: [Point2D, Point2D, Point2D, Point2D];
  transformedVertices: [Vector3, Vector3, Vector3, Vector3];
  depth: number;
} {
  const transformedVertices = vertices.map((vertex) => {
    // 1. Apply local rotation around pivot
    let point = rotateAroundPivot(vertex, pivot, rotation);
    // 2. Translate to world position
    point = addVec3(point, position);
    // 3. Apply view transformation
    point = applyViewTransform(point, view);
    return point;
  }) as [Vector3, Vector3, Vector3, Vector3];

  const points = transformedVertices.map((v) =>
    projectOrthographic(v, canvasWidth, canvasHeight, scale)
  ) as [Point2D, Point2D, Point2D, Point2D];

  const depth = calculateAverageDepth(transformedVertices);

  return { points, transformedVertices, depth };
}
