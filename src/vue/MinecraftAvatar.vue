<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

export interface MinecraftAvatarProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output size in pixels (default: 64) */
  size?: number;
  /** Include overlay/hat layer (default: true) */
  overlay?: boolean;
  /** Additional CSS class */
  className?: string;
  /** API endpoint for server-side rendering. If not specified, renders client-side. */
  apiEndpoint?: string;
}

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

// Head region coordinates in skin texture (8x8 pixels)
const HEAD_BASE = { x: 8, y: 8, width: 8, height: 8 };
const HEAD_OVERLAY = { x: 40, y: 8, width: 8, height: 8 };

const props = withDefaults(defineProps<MinecraftAvatarProps>(), {
  size: 64,
  overlay: true,
  className: '',
});

const imgError = ref(false);
const isLoading = ref(true);
const imgSrc = ref<string | null>(null);

// Computed properties for server-side mode
const imageUrl = computed(
  () => `${props.apiEndpoint}?uuid=${props.uuid}&size=${props.size}&overlay=${props.overlay}`
);
const fallbackUrl = computed(
  () => `${props.apiEndpoint}?uuid=${STEVE_UUID}&size=${props.size}&overlay=${props.overlay}`
);
const altText = computed(() =>
  props.mcid ? `${props.mcid}'s avatar` : 'Minecraft avatar'
);

// Reset state when UUID changes
watch(
  () => props.uuid,
  () => {
    imgError.value = false;
    isLoading.value = true;
    if (!props.apiEndpoint) {
      renderAvatar();
    }
  }
);

watch(
  () => [props.size, props.overlay],
  () => {
    if (!props.apiEndpoint) {
      renderAvatar();
    }
  }
);

function handleLoad() {
  isLoading.value = false;
}

function handleError() {
  imgError.value = true;
  isLoading.value = false;
}

// Client-side rendering function
async function renderAvatar() {
  isLoading.value = true;
  imgError.value = false;

  const skinUrl = `https://crafatar.com/skins/${props.uuid}`;
  const fallbackSkinUrl = `https://crafatar.com/skins/${STEVE_UUID}`;

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  try {
    let skinImage: HTMLImageElement;
    try {
      skinImage = await loadImage(skinUrl);
    } catch {
      skinImage = await loadImage(fallbackSkinUrl);
    }

    // Create offscreen canvas for extraction
    const extractCanvas = document.createElement('canvas');
    extractCanvas.width = 8;
    extractCanvas.height = 8;
    const extractCtx = extractCanvas.getContext('2d');
    if (!extractCtx) return;

    extractCtx.imageSmoothingEnabled = false;

    // Draw base head
    extractCtx.drawImage(
      skinImage,
      HEAD_BASE.x,
      HEAD_BASE.y,
      HEAD_BASE.width,
      HEAD_BASE.height,
      0,
      0,
      8,
      8
    );

    // Draw overlay if enabled
    if (props.overlay) {
      extractCtx.drawImage(
        skinImage,
        HEAD_OVERLAY.x,
        HEAD_OVERLAY.y,
        HEAD_OVERLAY.width,
        HEAD_OVERLAY.height,
        0,
        0,
        8,
        8
      );
    }

    // Scale to output size
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = props.size;
    outputCanvas.height = props.size;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) return;

    outputCtx.imageSmoothingEnabled = false;
    outputCtx.drawImage(extractCanvas, 0, 0, props.size, props.size);

    imgSrc.value = outputCanvas.toDataURL('image/png');
    isLoading.value = false;
  } catch (err) {
    console.error('Failed to render avatar:', err);
    imgError.value = true;
    isLoading.value = false;
  }
}

onMounted(() => {
  if (!props.apiEndpoint) {
    renderAvatar();
  }
});
</script>

<template>
  <!-- Server-side rendering mode -->
  <div
    v-if="apiEndpoint"
    :class="className"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      position: 'relative',
    }"
  >
    <img
      :src="imgError ? fallbackUrl : imageUrl"
      :alt="altText"
      :width="size"
      :height="size"
      :style="{
        imageRendering: 'pixelated',
        display: isLoading ? 'none' : 'block',
        width: `${size}px`,
        height: `${size}px`,
      }"
      loading="lazy"
      decoding="async"
      @load="handleLoad"
      @error="handleError"
    />
    <div
      v-if="isLoading"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#3c3c3c',
        position: 'absolute',
        top: 0,
        left: 0,
      }"
    />
  </div>

  <!-- Client-side rendering mode -->
  <div
    v-else
    :class="className"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      position: 'relative',
    }"
  >
    <img
      v-if="imgSrc && !isLoading"
      :src="imgSrc"
      :alt="altText"
      :width="size"
      :height="size"
      :style="{
        imageRendering: 'pixelated',
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
    <div
      v-if="isLoading || imgError"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#3c3c3c',
        position: 'absolute',
        top: 0,
        left: 0,
      }"
    />
  </div>
</template>
