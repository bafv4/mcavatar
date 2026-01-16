/**
 * Predefined Pose Definitions
 */

import type { PoseDefinition, Rotation3D, BodyPartPose, PoseName } from '../shared/types';

/** Identity rotation (no rotation) */
const NO_ROTATION: Rotation3D = { pitch: 0, yaw: 0, roll: 0 };

/** Default body part pose */
const DEFAULT_POSE: BodyPartPose = { rotation: NO_ROTATION };

/**
 * Standing pose - default neutral stance
 */
export const POSE_STANDING: PoseDefinition = {
  name: 'standing',
  head: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: 0, yaw: 0, roll: -3 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE,
};

/**
 * Walking pose - mid-stride position
 */
export const POSE_WALKING: PoseDefinition = {
  name: 'walking',
  head: { rotation: { pitch: 0, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 30, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: -30, yaw: 0, roll: -3 } },
  leftLeg: { rotation: { pitch: -25, yaw: 0, roll: 0 } },
  rightLeg: { rotation: { pitch: 25, yaw: 0, roll: 0 } },
};

/**
 * Running pose - extended stride
 */
export const POSE_RUNNING: PoseDefinition = {
  name: 'running',
  head: { rotation: { pitch: -5, yaw: 0, roll: 0 } },
  torso: { rotation: { pitch: -10, yaw: 0, roll: 0 } },
  leftArm: { rotation: { pitch: 50, yaw: 0, roll: 5 } },
  rightArm: { rotation: { pitch: -50, yaw: 0, roll: -5 } },
  leftLeg: { rotation: { pitch: -40, yaw: 0, roll: 0 } },
  rightLeg: { rotation: { pitch: 40, yaw: 0, roll: 0 } },
};

/**
 * Waving pose - right arm raised
 */
export const POSE_WAVING: PoseDefinition = {
  name: 'waving',
  head: { rotation: { pitch: 0, yaw: 15, roll: 5 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 3 } },
  rightArm: { rotation: { pitch: -120, yaw: 20, roll: -20 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE,
};

/**
 * Sitting pose
 */
export const POSE_SITTING: PoseDefinition = {
  name: 'sitting',
  head: { rotation: { pitch: 5, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: { rotation: { pitch: -45, yaw: 0, roll: 10 } },
  rightArm: { rotation: { pitch: -45, yaw: 0, roll: -10 } },
  leftLeg: {
    rotation: { pitch: -90, yaw: 0, roll: 0 },
    offset: { x: 0, y: -3, z: 4 },
  },
  rightLeg: {
    rotation: { pitch: -90, yaw: 0, roll: 0 },
    offset: { x: 0, y: -3, z: 4 },
  },
};

/**
 * Pointing pose - right arm extended forward
 */
export const POSE_POINTING: PoseDefinition = {
  name: 'pointing',
  head: { rotation: { pitch: -5, yaw: -10, roll: 0 } },
  torso: { rotation: { pitch: 0, yaw: -5, roll: 0 } },
  leftArm: { rotation: { pitch: 0, yaw: 0, roll: 5 } },
  rightArm: { rotation: { pitch: -90, yaw: -10, roll: 0 } },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE,
};

/**
 * Crossed arms pose
 */
export const POSE_CROSSED_ARMS: PoseDefinition = {
  name: 'crossed_arms',
  head: { rotation: { pitch: 5, yaw: 0, roll: 0 } },
  torso: DEFAULT_POSE,
  leftArm: {
    rotation: { pitch: -50, yaw: 0, roll: 50 },
    offset: { x: -2, y: -2, z: 2 },
  },
  rightArm: {
    rotation: { pitch: -50, yaw: 0, roll: -50 },
    offset: { x: 2, y: -2, z: 2 },
  },
  leftLeg: DEFAULT_POSE,
  rightLeg: DEFAULT_POSE,
};

/**
 * Map of pose names to definitions
 */
export const POSES: Record<Exclude<PoseName, 'custom'>, PoseDefinition> = {
  standing: POSE_STANDING,
  walking: POSE_WALKING,
  running: POSE_RUNNING,
  waving: POSE_WAVING,
  sitting: POSE_SITTING,
  pointing: POSE_POINTING,
  crossed_arms: POSE_CROSSED_ARMS,
};

/**
 * Get pose definition by name
 */
export function getPose(name: PoseName): PoseDefinition | null {
  if (name === 'custom') return null;
  return POSES[name] ?? null;
}

/**
 * Validate custom pose definition
 */
export function validatePose(pose: PoseDefinition): boolean {
  const requiredParts = [
    'head',
    'torso',
    'leftArm',
    'rightArm',
    'leftLeg',
    'rightLeg',
  ] as const;

  for (const part of requiredParts) {
    const bodyPart = pose[part];
    if (!bodyPart || typeof bodyPart !== 'object' || !('rotation' in bodyPart)) {
      return false;
    }
    const rotation = bodyPart.rotation;
    if (
      typeof rotation.pitch !== 'number' ||
      typeof rotation.yaw !== 'number' ||
      typeof rotation.roll !== 'number'
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Get body part pose from pose definition
 */
export function getBodyPartPose(
  pose: PoseDefinition,
  part: 'head' | 'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg'
): BodyPartPose {
  return pose[part];
}

/**
 * Create a custom pose from individual body part configurations
 */
export function createCustomPose(
  head: BodyPartPose,
  torso: BodyPartPose,
  leftArm: BodyPartPose,
  rightArm: BodyPartPose,
  leftLeg: BodyPartPose,
  rightLeg: BodyPartPose
): PoseDefinition {
  return {
    name: 'custom',
    head,
    torso,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
  };
}

/**
 * Interpolate between two poses (for animation)
 */
export function interpolatePoses(
  poseA: PoseDefinition,
  poseB: PoseDefinition,
  t: number
): PoseDefinition {
  const lerp = (a: number, b: number) => a + (b - a) * t;

  const interpolateRotation = (
    a: Rotation3D,
    b: Rotation3D
  ): Rotation3D => ({
    pitch: lerp(a.pitch, b.pitch),
    yaw: lerp(a.yaw, b.yaw),
    roll: lerp(a.roll, b.roll),
  });

  const interpolateBodyPart = (
    a: BodyPartPose,
    b: BodyPartPose
  ): BodyPartPose => {
    const result: BodyPartPose = {
      rotation: interpolateRotation(a.rotation, b.rotation),
    };
    if (a.offset || b.offset) {
      const offsetA = a.offset ?? { x: 0, y: 0, z: 0 };
      const offsetB = b.offset ?? { x: 0, y: 0, z: 0 };
      result.offset = {
        x: lerp(offsetA.x, offsetB.x),
        y: lerp(offsetA.y, offsetB.y),
        z: lerp(offsetA.z, offsetB.z),
      };
    }
    return result;
  };

  return {
    name: 'custom',
    head: interpolateBodyPart(poseA.head, poseB.head),
    torso: interpolateBodyPart(poseA.torso, poseB.torso),
    leftArm: interpolateBodyPart(poseA.leftArm, poseB.leftArm),
    rightArm: interpolateBodyPart(poseA.rightArm, poseB.rightArm),
    leftLeg: interpolateBodyPart(poseA.leftLeg, poseB.leftLeg),
    rightLeg: interpolateBodyPart(poseA.rightLeg, poseB.rightLeg),
  };
}
