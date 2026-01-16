/**
 * 3D Full Body Renderer
 * Based on skinview3d implementation: https://github.com/bs-community/skinview3d
 * Renders Minecraft character models with pose support using @napi-rs/canvas
 */

import type {
  FullBodyOptions,
  FullBodyResult,
  SkinFormat,
  ArmModel,
  PoseDefinition,
  PoseName,
  ViewConfig,
  Vector3,
  Point2D,
  ProjectedQuad,
} from '../shared/types';
import { DEFAULT_FULLBODY_OPTIONS, DEFAULT_VIEW } from '../shared/constants';
import { detectSkinFormat } from './skin-parser';
import { createCharacterMeshes, type BodyPartMesh } from '../3d/geometry';
import { getPose, POSE_STANDING } from '../3d/poses';
import {
  applyRotation,
  addVec3,
  subVec3,
  rotateAroundPivot,
  dotVec3,
} from '../3d/projection';
import {
  extractTextureRegion,
  hasVisiblePixels,
} from '../3d/texture-mapper';

// Texture dimensions
const SKIN_WIDTH = 64;
const SKIN_HEIGHT = 64;

/**
 * Render a 3D full body avatar from skin texture data
 */
export async function renderFullBody(
  skinBuffer: Buffer,
  options: FullBodyOptions = {}
): Promise<FullBodyResult> {
  const { createCanvas } = await import('@napi-rs/canvas');
  const sharp = (await import('sharp')).default;

  // Get skin metadata
  const skinImage = sharp(skinBuffer);
  const metadata = await skinImage.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid skin texture: unable to read dimensions');
  }

  const skinFormat = detectSkinFormat(metadata.width, metadata.height);
  const skinData = await skinImage.ensureAlpha().raw().toBuffer();

  // Merge options with defaults
  const opts = {
    width: options.width ?? DEFAULT_FULLBODY_OPTIONS.width,
    height: options.height ?? DEFAULT_FULLBODY_OPTIONS.height,
    includeOverlay: options.includeOverlay ?? DEFAULT_FULLBODY_OPTIONS.includeOverlay,
    view: { ...DEFAULT_VIEW, ...options.view } as ViewConfig,
    background: options.background ?? DEFAULT_FULLBODY_OPTIONS.background,
  };

  const armModel: ArmModel = options.armModel ?? 'classic';

  // Get pose
  let pose: PoseDefinition;
  let poseName: PoseName;

  if (typeof options.pose === 'string') {
    pose = getPose(options.pose) ?? POSE_STANDING;
    poseName = options.pose;
  } else if (options.pose && typeof options.pose === 'object') {
    pose = options.pose;
    poseName = 'custom';
  } else {
    pose = POSE_STANDING;
    poseName = 'standing';
  }

  // Create canvas
  const canvas = createCanvas(opts.width, opts.height);
  const ctx = canvas.getContext('2d');

  // Clear canvas with background or transparent
  if (opts.background) {
    ctx.fillStyle = opts.background;
    ctx.fillRect(0, 0, opts.width, opts.height);
  }

  // Create character meshes
  const meshes = createCharacterMeshes(armModel, opts.includeOverlay && skinFormat === 'modern');

  // Calculate scale to fit character in canvas
  // Character total height is about 32 units, we want it to fit with some padding
  const modelHeight = 32;
  const scale = (opts.height * 0.85) / modelHeight;

  // Collect all projected quads for sorting
  const quads: ProjectedQuad[] = [];

  // View transformation angles in radians
  const angleRad = (opts.view.angle * Math.PI) / 180;
  const elevationRad = (opts.view.elevation * Math.PI) / 180;

  // Camera direction (looking from front)
  const cosAngle = Math.cos(angleRad);
  const sinAngle = Math.sin(angleRad);
  const cosElev = Math.cos(elevationRad);
  const sinElev = Math.sin(elevationRad);

  // Process each mesh
  for (const mesh of meshes) {
    const bodyPartPose = pose[mesh.part as keyof PoseDefinition] as {
      rotation: { pitch: number; yaw: number; roll: number };
      offset?: Vector3;
    };

    if (!bodyPartPose || !bodyPartPose.rotation) continue;

    const poseOffset = bodyPartPose.offset ?? { x: 0, y: 0, z: 0 };

    // Process each face
    for (const face of mesh.faces) {
      // Transform vertices
      const transformedVertices = face.vertices.map((vertex) => {
        // 1. Apply pose rotation around pivot
        let point = rotateAroundPivot(vertex, mesh.pivot, bodyPartPose.rotation);

        // 2. Translate to body part position
        point = addVec3(point, mesh.position);
        point = addVec3(point, poseOffset);

        // 3. Apply view rotation (rotate model around Y axis)
        // We rotate the model so that angle=0 shows front face (+Z becomes -Z after rotation)
        // This is equivalent to rotating camera around the model
        const x1 = point.x * cosAngle - point.z * sinAngle;
        const z1 = point.x * sinAngle + point.z * cosAngle;

        // Then rotate around X axis (elevation)
        const y2 = point.y * cosElev - z1 * sinElev;
        const z2 = point.y * sinElev + z1 * cosElev;

        return { x: x1, y: y2, z: z2 };
      }) as [Vector3, Vector3, Vector3, Vector3];

      // Calculate face normal after transformation for back-face culling
      const edge1 = subVec3(transformedVertices[1], transformedVertices[0]);
      const edge2 = subVec3(transformedVertices[3], transformedVertices[0]);

      // Cross product for normal (edge1 x edge2)
      const normal: Vector3 = {
        x: edge1.y * edge2.z - edge1.z * edge2.y,
        y: edge1.z * edge2.x - edge1.x * edge2.z,
        z: edge1.x * edge2.y - edge1.y * edge2.x,
      };

      // Back-face culling: skip faces pointing away from camera
      // After rotation, camera looks in +Z direction, visible faces have negative Z normal
      if (normal.z >= 0) {
        continue;
      }

      // Project to 2D (orthographic projection)
      const projectedPoints = transformedVertices.map((v) => ({
        x: opts.width / 2 + v.x * scale,
        y: opts.height / 2 - v.y * scale, // Flip Y for canvas coordinates
      })) as [Point2D, Point2D, Point2D, Point2D];

      // Calculate depth for sorting (average Z)
      const depth =
        (transformedVertices[0].z +
          transformedVertices[1].z +
          transformedVertices[2].z +
          transformedVertices[3].z) /
        4;

      quads.push({
        points: projectedPoints,
        textureRegion: face.uv,
        depth,
        isOverlay: mesh.isOverlay,
        bodyPart: mesh.part,
        face: face.name,
      });
    }
  }

  // Sort quads by depth (painter's algorithm - back to front)
  quads.sort((a, b) => {
    // First sort by depth (farther = smaller Z = render first)
    if (Math.abs(a.depth - b.depth) > 0.1) {
      return a.depth - b.depth;
    }
    // Then base layers before overlays
    if (a.isOverlay !== b.isOverlay) {
      return a.isOverlay ? 1 : -1;
    }
    return 0;
  });

  // Track which overlays have visible content
  let hasVisibleOverlay = false;

  // Render each quad
  for (const quad of quads) {
    const textureData = extractTextureRegion(
      skinData,
      metadata.width!,
      quad.textureRegion
    );

    // Skip empty overlay textures
    if (quad.isOverlay && !hasVisiblePixels(textureData)) {
      continue;
    }

    if (quad.isOverlay) {
      hasVisibleOverlay = true;
    }

    // Render the textured quad
    renderTexturedQuad(
      ctx,
      quad.points,
      textureData,
      quad.textureRegion.width,
      quad.textureRegion.height
    );
  }

  const pngBuffer = canvas.toBuffer('image/png');

  return {
    data: pngBuffer,
    contentType: 'image/png',
    usedFallback: false,
    skinFormat,
    armModel,
    pose: poseName,
    hasOverlay: hasVisibleOverlay,
  };
}

/**
 * Render a textured quadrilateral onto the canvas
 */
function renderTexturedQuad(
  ctx: CanvasRenderingContext2D,
  points: [Point2D, Point2D, Point2D, Point2D],
  textureData: Buffer,
  texWidth: number,
  texHeight: number
): void {
  // Calculate bounding box
  const minX = Math.floor(Math.min(points[0].x, points[1].x, points[2].x, points[3].x));
  const maxX = Math.ceil(Math.max(points[0].x, points[1].x, points[2].x, points[3].x));
  const minY = Math.floor(Math.min(points[0].y, points[1].y, points[2].y, points[3].y));
  const maxY = Math.ceil(Math.max(points[0].y, points[1].y, points[2].y, points[3].y));

  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  // Clamp to canvas bounds
  const startX = Math.max(0, minX);
  const startY = Math.max(0, minY);
  const endX = Math.min(canvasWidth, maxX);
  const endY = Math.min(canvasHeight, maxY);

  const width = endX - startX;
  const height = endY - startY;

  if (width <= 0 || height <= 0) return;

  const imageData = ctx.getImageData(startX, startY, width, height);
  const data = imageData.data;

  // Precompute vectors for bilinear interpolation
  const [p0, p1, p2, p3] = points;

  // For each pixel in the bounding box
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      // Check if point is inside the quad using cross product method
      if (!isPointInQuad(x, y, points)) {
        continue;
      }

      // Calculate UV coordinates using bilinear interpolation
      const { u, v } = getQuadUV(x, y, p0, p1, p2, p3);

      // Sample texture (nearest neighbor for pixel art)
      const texX = Math.min(Math.floor(u * texWidth), texWidth - 1);
      const texY = Math.min(Math.floor(v * texHeight), texHeight - 1);
      const texIdx = (texY * texWidth + texX) * 4;

      const r = textureData[texIdx];
      const g = textureData[texIdx + 1];
      const b = textureData[texIdx + 2];
      const a = textureData[texIdx + 3];

      // Skip fully transparent pixels
      if (a === 0) continue;

      // Calculate pixel index in image data
      const idx = ((y - startY) * width + (x - startX)) * 4;

      // Alpha blending
      const srcAlpha = a / 255;
      const dstAlpha = data[idx + 3] / 255;
      const outAlpha = srcAlpha + dstAlpha * (1 - srcAlpha);

      if (outAlpha > 0) {
        data[idx] = (r * srcAlpha + data[idx] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 1] = (g * srcAlpha + data[idx + 1] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 2] = (b * srcAlpha + data[idx + 2] * dstAlpha * (1 - srcAlpha)) / outAlpha;
        data[idx + 3] = outAlpha * 255;
      }
    }
  }

  ctx.putImageData(imageData, startX, startY);
}

/**
 * Check if a point is inside a quadrilateral using cross product
 */
function isPointInQuad(x: number, y: number, quad: [Point2D, Point2D, Point2D, Point2D]): boolean {
  const [p0, p1, p2, p3] = quad;

  // Check all four edges using cross product
  const cross0 = (p1.x - p0.x) * (y - p0.y) - (p1.y - p0.y) * (x - p0.x);
  const cross1 = (p2.x - p1.x) * (y - p1.y) - (p2.y - p1.y) * (x - p1.x);
  const cross2 = (p3.x - p2.x) * (y - p2.y) - (p3.y - p2.y) * (x - p2.x);
  const cross3 = (p0.x - p3.x) * (y - p3.y) - (p0.y - p3.y) * (x - p3.x);

  // All cross products should have the same sign (or be zero)
  const allPositive = cross0 >= 0 && cross1 >= 0 && cross2 >= 0 && cross3 >= 0;
  const allNegative = cross0 <= 0 && cross1 <= 0 && cross2 <= 0 && cross3 <= 0;

  return allPositive || allNegative;
}

/**
 * Calculate UV coordinates for a point in a quadrilateral
 * Uses bilinear interpolation inverse
 */
function getQuadUV(
  x: number,
  y: number,
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D
): { u: number; v: number } {
  // Simplified bilinear interpolation for parallelogram-like quads
  // p0 = top-left (u=0, v=0)
  // p1 = top-right (u=1, v=0)
  // p2 = bottom-right (u=1, v=1)
  // p3 = bottom-left (u=0, v=1)

  // Use linear algebra approach for better accuracy
  const dx = x - p0.x;
  const dy = y - p0.y;

  // Edge vectors
  const e0x = p1.x - p0.x; // top edge
  const e0y = p1.y - p0.y;
  const e1x = p3.x - p0.x; // left edge
  const e1y = p3.y - p0.y;

  // Solve 2x2 linear system: [e0x, e1x] [u]   [dx]
  //                         [e0y, e1y] [v] = [dy]
  const det = e0x * e1y - e0y * e1x;

  if (Math.abs(det) < 0.0001) {
    return { u: 0.5, v: 0.5 };
  }

  const u = (dx * e1y - dy * e1x) / det;
  const v = (e0x * dy - e0y * dx) / det;

  return {
    u: Math.max(0, Math.min(1, u)),
    v: Math.max(0, Math.min(1, v)),
  };
}

// Type declaration for canvas context
type CanvasRenderingContext2D = ReturnType<
  Awaited<ReturnType<typeof import('@napi-rs/canvas')['createCanvas']>>['getContext']
>;
