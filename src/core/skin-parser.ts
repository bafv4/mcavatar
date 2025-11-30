/**
 * Skin Texture Parser
 */

import type { SkinFormat, SkinRegion } from '../shared/types';
import { HEAD_REGIONS, SKIN_DIMENSIONS } from '../shared/constants';

/**
 * Detect skin format from dimensions
 */
export function detectSkinFormat(width: number, height: number): SkinFormat {
  if (
    width === SKIN_DIMENSIONS.MODERN.width &&
    height === SKIN_DIMENSIONS.MODERN.height
  ) {
    return 'modern';
  }
  if (
    width === SKIN_DIMENSIONS.LEGACY.width &&
    height === SKIN_DIMENSIONS.LEGACY.height
  ) {
    return 'legacy';
  }
  throw new Error(`Unexpected skin dimensions: ${width}x${height}`);
}

/**
 * Check if overlay layer has visible pixels
 * @param pixelData RGBA pixel data (4 bytes per pixel)
 */
export function hasVisibleOverlay(pixelData: Uint8Array | Buffer): boolean {
  // Check every 4th byte (alpha channel)
  for (let i = 3; i < pixelData.length; i += 4) {
    if (pixelData[i] > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Get head region coordinates
 */
export function getBaseHeadRegion(): SkinRegion {
  return { ...HEAD_REGIONS.BASE };
}

/**
 * Get overlay region coordinates
 */
export function getOverlayHeadRegion(): SkinRegion {
  return { ...HEAD_REGIONS.OVERLAY };
}
