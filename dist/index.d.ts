import { A as AvatarOptions, F as FullBodyOptions, P as PoseName, a as PoseDefinition, B as BodyPartPose, b as AvatarResult, c as FullBodyResult } from './types-qoLitC4k.js';
export { f as ArmModel, g as BodyPart, M as MinecraftAvatarProps, d as MinecraftFullBodyProps, R as Rotation3D, S as SkinFormat, V as Vector3, e as ViewConfig } from './types-qoLitC4k.js';

/**
 * 3D Full Body Renderer using skinview3d + Puppeteer
 * Renders Minecraft character models with accurate proportions via headless browser
 */

/**
 * Close the browser instance (call when shutting down)
 */
declare function closeBrowser(): Promise<void>;

/**
 * Minecraft Avatar Constants
 */

/**
 * Steve's UUID for fallback
 */
declare const STEVE_UUID = "8667ba71b85a4004af54457a9734eed7";
/**
 * Default avatar options
 */
declare const DEFAULT_OPTIONS: Required<AvatarOptions>;
/**
 * Default full body rendering options
 */
declare const DEFAULT_FULLBODY_OPTIONS: Required<Omit<FullBodyOptions, 'armModel' | 'pose'>> & {
    pose: 'standing';
};

/**
 * Minecraft Avatar Utilities
 */
/**
 * Validate and normalize UUID format
 * Removes hyphens and validates the format
 */
declare function validateUuid(uuid: string): string;
/**
 * Format UUID with hyphens (8-4-4-4-12)
 */
declare function formatUuid(uuid: string): string;

/**
 * Predefined Pose Definitions
 */

/**
 * Map of pose names to definitions
 */
declare const POSES: Record<Exclude<PoseName, 'custom'>, PoseDefinition>;
/**
 * Get pose definition by name
 */
declare function getPose(name: PoseName): PoseDefinition | null;
/**
 * Validate custom pose definition
 */
declare function validatePose(pose: PoseDefinition): boolean;
/**
 * Create a custom pose from individual body part configurations
 */
declare function createCustomPose(head: BodyPartPose, torso: BodyPartPose, leftArm: BodyPartPose, rightArm: BodyPartPose, leftLeg: BodyPartPose, rightLeg: BodyPartPose): PoseDefinition;

/**
 * Core Avatar Generation
 */

/**
 * Generate Minecraft avatar from UUID
 *
 * @param uuid - Minecraft player UUID
 * @param options - Avatar generation options
 * @returns Avatar result with image data
 *
 * @example
 * ```typescript
 * import { generateAvatar } from '@bafv4/mcavatar';
 *
 * const result = await generateAvatar('uuid-here', { size: 64 });
 * // result.data is a Buffer containing PNG image
 * ```
 */
declare function generateAvatar(uuid: string, options?: AvatarOptions): Promise<AvatarResult>;
/**
 * Generate 3D full-body Minecraft avatar from UUID
 *
 * @param uuid - Minecraft player UUID
 * @param options - Full body generation options
 * @returns Full body result with image data
 *
 * @example
 * ```typescript
 * import { generateFullBody } from '@bafv4/mcavatar';
 *
 * // Simple usage
 * const result = await generateFullBody('uuid-here');
 *
 * // With options
 * const result = await generateFullBody('uuid-here', {
 *   width: 256,
 *   height: 512,
 *   pose: 'waving',
 *   view: { angle: 45, elevation: 15 },
 * });
 *
 * // Custom pose
 * const result = await generateFullBody('uuid-here', {
 *   pose: {
 *     name: 'custom',
 *     head: { rotation: { pitch: -10, yaw: 20, roll: 0 } },
 *     torso: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *     leftArm: { rotation: { pitch: 45, yaw: 0, roll: 10 } },
 *     rightArm: { rotation: { pitch: -30, yaw: 0, roll: -5 } },
 *     leftLeg: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *     rightLeg: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
 *   },
 * });
 * ```
 */
declare function generateFullBody(uuid: string, options?: FullBodyOptions): Promise<FullBodyResult>;

export { AvatarOptions, AvatarResult, BodyPartPose, DEFAULT_FULLBODY_OPTIONS, DEFAULT_OPTIONS, FullBodyOptions, FullBodyResult, POSES, PoseDefinition, PoseName, STEVE_UUID, closeBrowser, createCustomPose, formatUuid, generateAvatar, generateFullBody, getPose, validatePose, validateUuid };
