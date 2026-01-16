/**
 * Vercel API Route: 3D Full Body Avatar
 * GET /api/fullbody?uuid=<uuid>&width=<width>&height=<height>&scale=<scale>&pose=<pose>&angle=<angle>&elevation=<elevation>
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateFullBody, closeBrowser, STEVE_UUID } from '../src/core/index';
import type { PoseName } from '../src/shared/types';

const VALID_POSES: PoseName[] = [
  'standing',
  'walking',
  'running',
  'waving',
  'sitting',
  'pointing',
  'crossed_arms',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uuid, width, height, scale, pose, angle, elevation, zoom, overlay } = req.query;

    // Validate UUID
    const playerUuid = typeof uuid === 'string' ? uuid : STEVE_UUID;

    // Parse dimensions
    const imgWidth = typeof width === 'string' ? parseInt(width, 10) : 300;
    const imgHeight = typeof height === 'string' ? parseInt(height, 10) : 400;
    const imgScale = typeof scale === 'string' ? parseFloat(scale) : 1;

    // Validate dimensions
    if (isNaN(imgWidth) || imgWidth < 50 || imgWidth > 1000) {
      return res.status(400).json({ error: 'Invalid width. Must be between 50 and 1000.' });
    }
    if (isNaN(imgHeight) || imgHeight < 50 || imgHeight > 1000) {
      return res.status(400).json({ error: 'Invalid height. Must be between 50 and 1000.' });
    }
    if (isNaN(imgScale) || imgScale < 1 || imgScale > 4) {
      return res.status(400).json({ error: 'Invalid scale. Must be between 1 and 4.' });
    }

    // Parse pose
    const poseName = typeof pose === 'string' && VALID_POSES.includes(pose as PoseName)
      ? (pose as PoseName)
      : 'standing';

    // Parse view options
    const viewAngle = typeof angle === 'string' ? parseFloat(angle) : 25;
    const viewElevation = typeof elevation === 'string' ? parseFloat(elevation) : 10;
    const viewZoom = typeof zoom === 'string' ? parseFloat(zoom) : 1;
    const includeOverlay = overlay !== 'false';

    // Generate full body avatar
    const result = await generateFullBody(playerUuid, {
      width: imgWidth,
      height: imgHeight,
      scale: imgScale,
      pose: poseName,
      view: {
        angle: viewAngle,
        elevation: viewElevation,
        zoom: viewZoom,
      },
      includeOverlay,
      fallbackUuid: STEVE_UUID,
    });

    // Set cache headers (cache for 1 hour)
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Content-Type', 'image/png');

    return res.send(result.data);
  } catch (error) {
    console.error('Full body generation error:', error);
    return res.status(500).json({ error: 'Failed to generate full body avatar' });
  }
}
