/**
 * Avatar Renderer using Sharp
 */

import type { AvatarOptions, AvatarResult, SkinFormat } from '../shared/types';
import { DEFAULT_OPTIONS } from '../shared/constants';
import {
  detectSkinFormat,
  hasVisibleOverlay,
  getBaseHeadRegion,
  getOverlayHeadRegion,
} from './skin-parser';

/**
 * Render avatar from skin buffer using Sharp
 */
export async function renderAvatar(
  skinBuffer: ArrayBuffer,
  options: AvatarOptions = {}
): Promise<AvatarResult> {
  const sharp = (await import('sharp')).default;
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const skinImage = sharp(Buffer.from(skinBuffer));
  const metadata = await skinImage.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid skin texture: missing dimensions');
  }

  const skinFormat: SkinFormat = detectSkinFormat(metadata.width, metadata.height);
  const hasModernOverlay = skinFormat === 'modern' && opts.includeOverlay;

  // Extract base head (8x8)
  const baseRegion = getBaseHeadRegion();
  const baseHead = await sharp(Buffer.from(skinBuffer))
    .extract({
      left: baseRegion.x,
      top: baseRegion.y,
      width: baseRegion.width,
      height: baseRegion.height,
    })
    .toBuffer();

  let hasOverlay = false;
  let finalHead: Buffer;

  if (hasModernOverlay) {
    // Extract overlay head (8x8)
    const overlayRegion = getOverlayHeadRegion();
    const overlayHead = await sharp(Buffer.from(skinBuffer))
      .extract({
        left: overlayRegion.x,
        top: overlayRegion.y,
        width: overlayRegion.width,
        height: overlayRegion.height,
      })
      .toBuffer();

    // Check if overlay has visible pixels
    const overlayData = await sharp(overlayHead)
      .ensureAlpha()
      .raw()
      .toBuffer();

    hasOverlay = hasVisibleOverlay(overlayData);

    if (hasOverlay) {
      // Composite base (slightly smaller) with overlay
      const baseSize = Math.round(opts.size * 0.925);
      const baseOffset = Math.round((opts.size - baseSize) / 2);

      const resizedBase = await sharp(baseHead)
        .resize(baseSize, baseSize, { kernel: 'nearest' })
        .png()
        .toBuffer();

      const resizedOverlay = await sharp(overlayHead)
        .resize(opts.size, opts.size, { kernel: 'nearest' })
        .png()
        .toBuffer();

      finalHead = await sharp({
        create: {
          width: opts.size,
          height: opts.size,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([
          { input: resizedBase, top: baseOffset, left: baseOffset },
          { input: resizedOverlay, top: 0, left: 0 },
        ])
        .png()
        .toBuffer();
    } else {
      // No visible overlay, just resize base
      finalHead = await sharp(baseHead)
        .resize(opts.size, opts.size, { kernel: 'nearest' })
        .png()
        .toBuffer();
    }
  } else {
    // Legacy skin or overlay disabled
    finalHead = await sharp(baseHead)
      .resize(opts.size, opts.size, { kernel: 'nearest' })
      .png()
      .toBuffer();
  }

  return {
    data: finalHead,
    contentType: 'image/png',
    usedFallback: false,
    skinFormat,
    hasOverlay,
  };
}
