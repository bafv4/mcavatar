/**
 * Texture Mapping Utilities
 * Handles extraction and transformation of texture regions from skin images
 */

import type { SkinRegion, Point2D } from '../shared/types';

/**
 * Extract a rectangular region from skin pixel data
 */
export function extractTextureRegion(
  skinData: Buffer,
  skinWidth: number,
  region: SkinRegion
): Buffer {
  const { x, y, width, height } = region;
  const regionData = Buffer.alloc(width * height * 4); // RGBA

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const srcIdx = ((y + row) * skinWidth + (x + col)) * 4;
      const dstIdx = (row * width + col) * 4;

      regionData[dstIdx] = skinData[srcIdx]; // R
      regionData[dstIdx + 1] = skinData[srcIdx + 1]; // G
      regionData[dstIdx + 2] = skinData[srcIdx + 2]; // B
      regionData[dstIdx + 3] = skinData[srcIdx + 3]; // A
    }
  }

  return regionData;
}

/**
 * Check if a texture region has any visible (non-transparent) pixels
 */
export function hasVisiblePixels(textureData: Buffer): boolean {
  for (let i = 3; i < textureData.length; i += 4) {
    if (textureData[i] > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Calculate perspective transformation matrix for a quad
 * Maps source rectangle to destination quadrilateral
 */
export function calculatePerspectiveMatrix(
  srcWidth: number,
  srcHeight: number,
  dstPoints: [Point2D, Point2D, Point2D, Point2D]
): number[] {
  // Source corners (rectangle)
  const sx0 = 0,
    sy0 = 0;
  const sx1 = srcWidth,
    sy1 = 0;
  const sx2 = srcWidth,
    sy2 = srcHeight;
  const sx3 = 0,
    sy3 = srcHeight;

  // Destination corners (quadrilateral)
  const [d0, d1, d2, d3] = dstPoints;
  const dx0 = d0.x,
    dy0 = d0.y;
  const dx1 = d1.x,
    dy1 = d1.y;
  const dx2 = d2.x,
    dy2 = d2.y;
  const dx3 = d3.x,
    dy3 = d3.y;

  // Calculate perspective transformation coefficients
  // Using the standard 8-parameter perspective transform

  const denom =
    (sx0 - sx1 + sx2 - sx3) * (sy1 - sy2) - (sx1 - sx2) * (sy0 - sy1 + sy2 - sy3);

  if (Math.abs(denom) < 1e-10) {
    // Fallback to affine transformation
    return calculateAffineMatrix(srcWidth, srcHeight, dstPoints);
  }

  const a13 =
    ((dx0 - dx1 + dx2 - dx3) * (sy1 - sy2) - (dx1 - dx2) * (sy0 - sy1 + sy2 - sy3)) /
    denom;
  const a23 =
    ((sx0 - sx1 + sx2 - sx3) * (dx1 - dx2) - (dx0 - dx1 + dx2 - dx3) * (sx1 - sx2)) /
    denom;

  const a11 = dx1 - dx0 + a13 * dx1;
  const a21 = dx3 - dx0 + a23 * dx3;
  const a31 = dx0;

  const a12 = dy1 - dy0 + a13 * dy1;
  const a22 = dy3 - dy0 + a23 * dy3;
  const a32 = dy0;

  // Return 3x3 matrix coefficients [a11, a12, a13, a21, a22, a23, a31, a32, 1]
  return [
    a11 / srcWidth,
    a12 / srcWidth,
    a13 / srcWidth,
    a21 / srcHeight,
    a22 / srcHeight,
    a23 / srcHeight,
    a31,
    a32,
    1,
  ];
}

/**
 * Calculate affine transformation matrix (fallback for degenerate cases)
 */
function calculateAffineMatrix(
  srcWidth: number,
  srcHeight: number,
  dstPoints: [Point2D, Point2D, Point2D, Point2D]
): number[] {
  const [d0, d1, , d3] = dstPoints;

  // Simple affine: scale and translate
  const scaleX = (d1.x - d0.x) / srcWidth;
  const scaleY = (d3.y - d0.y) / srcHeight;

  return [scaleX, 0, 0, 0, scaleY, 0, d0.x, d0.y, 1];
}

/**
 * Apply perspective transformation to get source coordinates
 * Given destination coordinates, returns the corresponding source coordinates
 */
export function inversePerspectiveTransform(
  matrix: number[],
  dstX: number,
  dstY: number,
  srcWidth: number,
  srcHeight: number
): { x: number; y: number } | null {
  // Invert the perspective transformation
  const [a, b, c, d, e, f, g, h] = matrix;

  // For perspective transform: dst = (ax + by + g, dx + ey + h) / (cx + fy + 1)
  // We need to solve for source coordinates

  // This is a simplification - for rendering, we'll use forward mapping
  const w = c * dstX + f * dstY + 1;
  if (Math.abs(w) < 1e-10) return null;

  const srcX = (dstX - g) / (a || 1);
  const srcY = (dstY - h) / (e || 1);

  if (srcX < 0 || srcX >= srcWidth || srcY < 0 || srcY >= srcHeight) {
    return null;
  }

  return { x: srcX, y: srcY };
}

/**
 * Bilinear interpolation for texture sampling
 */
export function sampleTextureBilinear(
  textureData: Buffer,
  texWidth: number,
  texHeight: number,
  u: number,
  v: number
): [number, number, number, number] {
  // Clamp coordinates
  const x = Math.max(0, Math.min(texWidth - 1, u));
  const y = Math.max(0, Math.min(texHeight - 1, v));

  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, texWidth - 1);
  const y1 = Math.min(y0 + 1, texHeight - 1);

  const fx = x - x0;
  const fy = y - y0;

  // Get pixel values at four corners
  const getPixel = (px: number, py: number): [number, number, number, number] => {
    const idx = (py * texWidth + px) * 4;
    return [
      textureData[idx] || 0,
      textureData[idx + 1] || 0,
      textureData[idx + 2] || 0,
      textureData[idx + 3] || 0,
    ];
  };

  const p00 = getPixel(x0, y0);
  const p10 = getPixel(x1, y0);
  const p01 = getPixel(x0, y1);
  const p11 = getPixel(x1, y1);

  // Bilinear interpolation
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  return [
    Math.round(lerp(lerp(p00[0], p10[0], fx), lerp(p01[0], p11[0], fx), fy)),
    Math.round(lerp(lerp(p00[1], p10[1], fx), lerp(p01[1], p11[1], fx), fy)),
    Math.round(lerp(lerp(p00[2], p10[2], fx), lerp(p01[2], p11[2], fx), fy)),
    Math.round(lerp(lerp(p00[3], p10[3], fx), lerp(p01[3], p11[3], fx), fy)),
  ];
}

/**
 * Nearest-neighbor texture sampling (for pixelated Minecraft look)
 */
export function sampleTextureNearest(
  textureData: Buffer,
  texWidth: number,
  texHeight: number,
  u: number,
  v: number
): [number, number, number, number] {
  const x = Math.max(0, Math.min(texWidth - 1, Math.floor(u)));
  const y = Math.max(0, Math.min(texHeight - 1, Math.floor(v)));

  const idx = (y * texWidth + x) * 4;
  return [
    textureData[idx] || 0,
    textureData[idx + 1] || 0,
    textureData[idx + 2] || 0,
    textureData[idx + 3] || 0,
  ];
}

/**
 * Calculate bounding box for a set of 2D points
 */
export function calculateBoundingBox(
  points: Point2D[]
): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }

  return { minX, minY, maxX, maxY };
}

/**
 * Check if a point is inside a quadrilateral using cross product method
 */
export function isPointInQuad(
  point: Point2D,
  quad: [Point2D, Point2D, Point2D, Point2D]
): boolean {
  const [p0, p1, p2, p3] = quad;

  // Check if point is on the same side of all edges
  const cross = (a: Point2D, b: Point2D, c: Point2D) =>
    (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

  const d1 = cross(p0, p1, point);
  const d2 = cross(p1, p2, point);
  const d3 = cross(p2, p3, point);
  const d4 = cross(p3, p0, point);

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0 || d4 > 0;

  return !(hasNeg && hasPos);
}

/**
 * Calculate UV coordinates for a point in a quad using bilinear interpolation
 * Quad vertices are ordered: [top-left, top-right, bottom-right, bottom-left]
 * UV mapping: top-left=(0,0), top-right=(1,0), bottom-right=(1,1), bottom-left=(0,1)
 */
export function getBarycentricCoords(
  point: Point2D,
  quad: [Point2D, Point2D, Point2D, Point2D]
): { u: number; v: number } {
  const [p0, p1, p2, p3] = quad;

  // For near-rectangular quads (common case after orthographic projection),
  // use a simpler and more robust approach

  // Calculate the quad's basis vectors
  // Top edge: p0 -> p1 (u direction at v=0)
  // Left edge: p0 -> p3 (v direction at u=0)
  const topEdgeX = p1.x - p0.x;
  const topEdgeY = p1.y - p0.y;
  const leftEdgeX = p3.x - p0.x;
  const leftEdgeY = p3.y - p0.y;

  // Point relative to top-left corner
  const px = point.x - p0.x;
  const py = point.y - p0.y;

  // Solve using 2x2 linear system (works well for parallelograms/rectangles):
  // px = u * topEdgeX + v * leftEdgeX
  // py = u * topEdgeY + v * leftEdgeY

  const det = topEdgeX * leftEdgeY - topEdgeY * leftEdgeX;

  if (Math.abs(det) < 1e-10) {
    // Degenerate quad (edges are parallel), fallback
    return { u: 0.5, v: 0.5 };
  }

  // Cramer's rule
  const u = (px * leftEdgeY - py * leftEdgeX) / det;
  const v = (topEdgeX * py - topEdgeY * px) / det;

  return {
    u: Math.max(0, Math.min(1, u)),
    v: Math.max(0, Math.min(1, v)),
  };
}
