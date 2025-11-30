<script setup lang="ts">
import { ref, computed, watch } from 'vue';

export interface MinecraftAvatarProps {
  /** Player UUID (required) */
  uuid: string;
  /** Player MCID for alt text */
  mcid?: string;
  /** Output size in pixels (default: 64) */
  size?: number;
  /** Additional CSS class */
  className?: string;
  /** Priority loading (for above-the-fold content) */
  priority?: boolean;
  /** API endpoint for avatar generation (default: '/api/avatar') */
  apiEndpoint?: string;
}

const STEVE_UUID = '8667ba71b85a4004af54457a9734eed7';

const props = withDefaults(defineProps<MinecraftAvatarProps>(), {
  size: 64,
  className: '',
  priority: false,
  apiEndpoint: '/api/avatar',
});

const imgError = ref(false);
const isLoading = ref(true);

const imageUrl = computed(
  () => `${props.apiEndpoint}?uuid=${props.uuid}&size=${props.size}`
);
const fallbackUrl = computed(
  () => `${props.apiEndpoint}?uuid=${STEVE_UUID}&size=${props.size}`
);
const altText = computed(() =>
  props.mcid ? `${props.mcid} のスキン` : 'Minecraft avatar'
);

// Reset state when UUID changes
watch(
  () => props.uuid,
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
      :loading="priority ? 'eager' : 'lazy'"
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
</template>
