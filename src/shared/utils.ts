/**
 * Minecraft Avatar Utilities
 */

/**
 * Validate and normalize UUID format
 * Removes hyphens and validates the format
 */
export function validateUuid(uuid: string): string {
  // Remove hyphens
  const cleanUuid = uuid.replace(/-/g, '');

  // Validate format (32 hex characters)
  if (!/^[0-9a-f]{32}$/i.test(cleanUuid)) {
    throw new Error(`Invalid UUID format: ${uuid}`);
  }

  return cleanUuid;
}

/**
 * Format UUID with hyphens (8-4-4-4-12)
 */
export function formatUuid(uuid: string): string {
  const clean = validateUuid(uuid);
  return [
    clean.slice(0, 8),
    clean.slice(8, 12),
    clean.slice(12, 16),
    clean.slice(16, 20),
    clean.slice(20, 32),
  ].join('-');
}
