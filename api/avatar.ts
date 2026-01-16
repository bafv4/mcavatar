/**
 * Vercel API Route: Face Avatar
 * GET /api/avatar?uuid=<uuid>&size=<size>&overlay=<true|false>
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateAvatar, STEVE_UUID } from '../src/core/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uuid, size, overlay } = req.query;

    // Validate UUID
    const playerUuid = typeof uuid === 'string' ? uuid : STEVE_UUID;

    // Parse options
    const avatarSize = typeof size === 'string' ? parseInt(size, 10) : 64;
    const includeOverlay = overlay !== 'false';

    // Validate size
    if (isNaN(avatarSize) || avatarSize < 8 || avatarSize > 512) {
      return res.status(400).json({ error: 'Invalid size. Must be between 8 and 512.' });
    }

    // Generate avatar
    const result = await generateAvatar(playerUuid, {
      size: avatarSize,
      includeOverlay,
      fallbackUuid: STEVE_UUID,
    });

    // Set cache headers (cache for 1 hour)
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Content-Type', 'image/png');

    return res.send(result.data);
  } catch (error) {
    console.error('Avatar generation error:', error);
    return res.status(500).json({ error: 'Failed to generate avatar' });
  }
}
