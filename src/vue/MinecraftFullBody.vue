<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { PoseName } from '../shared/types';

export interface MinecraftFullBodyProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output width in pixels (default: 300) */
  width?: number;
  /** Output height in pixels (default: 400) */
  height?: number;
  /** Pose name (default: 'standing') */
  pose?: PoseName;
  /** View angle in degrees (default: 25) */
  angle?: number;
  /** View elevation in degrees (default: 10) */
  elevation?: number;
  /** Zoom level (default: 0.9) */
  zoom?: number;
  /** Additional CSS class */
  className?: string;
  /** Background color (default: transparent) */
  background?: string;
  /** Walk animation enabled (default: false) */
  walk?: boolean;
  /** Run animation enabled (default: false) */
  run?: boolean;
  /** Rotate animation enabled (default: false) */
  rotate?: boolean;
  /** API endpoint for server-side rendering. If not specified, renders client-side with skinview3d. */
  apiEndpoint?: string;
}

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

// Pose rotations in radians for skinview3d
const POSE_ROTATIONS: Record<
  Exclude<PoseName, 'custom'>,
  {
    head: { x: number; y: number; z: number };
    body: { x: number; y: number; z: number };
    leftArm: { x: number; y: number; z: number };
    rightArm: { x: number; y: number; z: number };
    leftLeg: { x: number; y: number; z: number };
    rightLeg: { x: number; y: number; z: number };
  }
> = {
  standing: {
    head: { x: 0, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.05 },
    rightArm: { x: 0, y: 0, z: -0.05 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  walking: {
    head: { x: 0, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0.5, y: 0, z: 0.05 },
    rightArm: { x: -0.5, y: 0, z: -0.05 },
    leftLeg: { x: -0.4, y: 0, z: 0 },
    rightLeg: { x: 0.4, y: 0, z: 0 },
  },
  running: {
    head: { x: -0.1, y: 0, z: 0 },
    body: { x: -0.17, y: 0, z: 0 },
    leftArm: { x: 0.9, y: 0, z: 0.1 },
    rightArm: { x: -0.9, y: 0, z: -0.1 },
    leftLeg: { x: -0.7, y: 0, z: 0 },
    rightLeg: { x: 0.7, y: 0, z: 0 },
  },
  waving: {
    head: { x: 0, y: 0.26, z: 0.1 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.05 },
    rightArm: { x: -2.1, y: 0.35, z: -0.35 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  sitting: {
    head: { x: 0.1, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: -0.8, y: 0, z: 0.17 },
    rightArm: { x: -0.8, y: 0, z: -0.17 },
    leftLeg: { x: -1.57, y: 0, z: 0 },
    rightLeg: { x: -1.57, y: 0, z: 0 },
  },
  pointing: {
    head: { x: -0.1, y: -0.17, z: 0 },
    body: { x: 0, y: -0.1, z: 0 },
    leftArm: { x: 0, y: 0, z: 0.1 },
    rightArm: { x: -1.57, y: -0.17, z: 0 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
  crossed_arms: {
    head: { x: 0.1, y: 0, z: 0 },
    body: { x: 0, y: 0, z: 0 },
    leftArm: { x: -0.9, y: 0, z: 0.9 },
    rightArm: { x: -0.9, y: 0, z: -0.9 },
    leftLeg: { x: 0, y: 0, z: 0 },
    rightLeg: { x: 0, y: 0, z: 0 },
  },
};

const props = withDefaults(defineProps<MinecraftFullBodyProps>(), {
  width: 300,
  height: 400,
  pose: 'standing',
  angle: 25,
  elevation: 10,
  zoom: 0.9,
  className: '',
  walk: false,
  run: false,
  rotate: false,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(true);
const imgError = ref(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let viewer: any = null;

const altText = computed(() =>
  props.mcid ? `${props.mcid}'s Minecraft avatar` : 'Minecraft avatar'
);

// Computed properties for server-side mode
const imageUrl = computed(
  () =>
    `${props.apiEndpoint}?uuid=${props.uuid}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}&elevation=${props.elevation}&zoom=${props.zoom}`
);
const fallbackUrl = computed(
  () =>
    `${props.apiEndpoint}?uuid=${STEVE_UUID}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}&elevation=${props.elevation}&zoom=${props.zoom}`
);

function handleLoad() {
  isLoading.value = false;
}

function handleError() {
  imgError.value = true;
  isLoading.value = false;
}

async function initViewer() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  try {
    // Dynamically import skinview3d
    const skinview3d = await import('skinview3d');

    // Clean up existing viewer
    if (viewer) {
      viewer.dispose();
    }

    // Create new viewer
    viewer = new skinview3d.SkinViewer({
      canvas,
      width: props.width,
      height: props.height,
      zoom: props.zoom,
      background: props.background || undefined,
    });

    // Load skin
    const skinUrl = `https://crafatar.com/skins/${props.uuid}`;
    try {
      await viewer.loadSkin(skinUrl);
    } catch {
      // Fallback to Steve skin
      const steveUrl = `https://crafatar.com/skins/${STEVE_UUID}`;
      await viewer.loadSkin(steveUrl);
    }

    // Set camera angle
    const angleRad = (props.angle * Math.PI) / 180;
    const elevationRad = (props.elevation * Math.PI) / 180;
    viewer.camera.rotation.x = elevationRad;
    viewer.camera.rotation.y = angleRad;

    // Apply pose or animation
    if (props.walk && !props.run) {
      viewer.animation = new skinview3d.WalkingAnimation();
    } else if (props.run) {
      viewer.animation = new skinview3d.RunningAnimation();
    } else if (props.pose !== 'custom') {
      const poseRotations = POSE_ROTATIONS[props.pose];
      if (poseRotations && viewer.playerObject?.skin) {
        const skin = viewer.playerObject.skin;
        skin.head.rotation.x = poseRotations.head.x;
        skin.head.rotation.y = poseRotations.head.y;
        skin.head.rotation.z = poseRotations.head.z;
        skin.body.rotation.x = poseRotations.body.x;
        skin.body.rotation.y = poseRotations.body.y;
        skin.body.rotation.z = poseRotations.body.z;
        skin.leftArm.rotation.x = poseRotations.leftArm.x;
        skin.leftArm.rotation.y = poseRotations.leftArm.y;
        skin.leftArm.rotation.z = poseRotations.leftArm.z;
        skin.rightArm.rotation.x = poseRotations.rightArm.x;
        skin.rightArm.rotation.y = poseRotations.rightArm.y;
        skin.rightArm.rotation.z = poseRotations.rightArm.z;
        skin.leftLeg.rotation.x = poseRotations.leftLeg.x;
        skin.leftLeg.rotation.y = poseRotations.leftLeg.y;
        skin.leftLeg.rotation.z = poseRotations.leftLeg.z;
        skin.rightLeg.rotation.x = poseRotations.rightLeg.x;
        skin.rightLeg.rotation.y = poseRotations.rightLeg.y;
        skin.rightLeg.rotation.z = poseRotations.rightLeg.z;
      }
    }

    // Enable rotation if requested
    if (props.rotate) {
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 1;
    }

    viewer.render();
  } catch (error) {
    console.error('Failed to initialize skinview3d:', error);
  }
}

onMounted(() => {
  if (!props.apiEndpoint) {
    initViewer();
  }
});

onUnmounted(() => {
  if (viewer) {
    viewer.dispose();
    viewer = null;
  }
});

// Re-initialize when props change (client-side only)
watch(
  () => [
    props.uuid,
    props.width,
    props.height,
    props.pose,
    props.angle,
    props.elevation,
    props.zoom,
    props.background,
    props.walk,
    props.run,
    props.rotate,
  ],
  () => {
    if (!props.apiEndpoint) {
      initViewer();
    } else {
      imgError.value = false;
      isLoading.value = true;
    }
  }
);
</script>

<template>
  <!-- Server-side rendering mode -->
  <div
    v-if="apiEndpoint"
    :class="className"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
    }"
  >
    <img
      :src="imgError ? fallbackUrl : imageUrl"
      :alt="altText"
      :width="width"
      :height="height"
      :style="{
        imageRendering: 'pixelated',
        display: isLoading ? 'none' : 'block',
        width: `${width}px`,
        height: `${height}px`,
      }"
      loading="lazy"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
    <div
      v-if="isLoading"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#3c3c3c',
        position: 'absolute',
        top: 0,
        left: 0,
      }"
    />
  </div>

  <!-- Client-side rendering mode (skinview3d) -->
  <canvas
    v-else
    ref="canvasRef"
    :class="className"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    :aria-label="altText"
  />
</template>
