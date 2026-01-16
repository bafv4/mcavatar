<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { PoseName } from '../shared/types';

export interface MinecraftFullBodyProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output width in pixels (default: 128) */
  width?: number;
  /** Output height in pixels (default: 256) */
  height?: number;
  /** Pose name (default: 'standing') */
  pose?: PoseName;
  /** View angle in degrees (default: 25) */
  angle?: number;
  /** Additional CSS class */
  className?: string;
  /** Priority loading (for above-the-fold content) */
  priority?: boolean;
  /** API endpoint for avatar generation (default: '/api/fullbody') */
  apiEndpoint?: string;
}

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

const props = withDefaults(defineProps<MinecraftFullBodyProps>(), {
  width: 128,
  height: 256,
  pose: 'standing',
  angle: 25,
  className: '',
  priority: false,
  apiEndpoint: '/api/fullbody',
});

const imgError = ref(false);
const isLoading = ref(true);

const imageUrl = computed(
  () =>
    `${props.apiEndpoint}?uuid=${props.uuid}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
);
const fallbackUrl = computed(
  () =>
    `${props.apiEndpoint}?uuid=${STEVE_UUID}&width=${props.width}&height=${props.height}&pose=${props.pose}&angle=${props.angle}`
);
const altText = computed(() =>
  props.mcid ? `${props.mcid} のフルボディ` : 'Minecraft full body avatar'
);

// Reset state when props change
watch(
  () => [props.uuid, props.pose, props.angle, props.width, props.height],
  () => {
    imgError.value = false;
    isLoading.value = true;
  }
);

function handleLoad() {
  isLoading.value = false;
}

function handleError() {
  imgError.value = true;
  isLoading.value = false;
}
</script>

<template>
  <div
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
      :loading="priority ? 'eager' : 'lazy'"
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
</template>
