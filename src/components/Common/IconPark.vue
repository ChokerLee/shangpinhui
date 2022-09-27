<template>
  <Component
    :is="icon"
    :theme="theme"
    :size="size"
    :fill="fill"
    :strokeWidth="strokeWidth"
    :strokeLinejoin="strokeLinejoin"
    :strokeLinecap="strokeLinecap"
    :spin="spin"
  />
</template>

<script setup lang="ts">
  import type { Icon } from '@icon-park/vue-next/lib/runtime'

  defineProps<{
    icon: Icon
    theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color'
    size?: number | string
    fill?: string | string[]
    strokeWidth?: number
    strokeLinejoin?: 'miter' | 'round' | 'bevel'
    strokeLinecap?: 'butt' | 'round' | 'square'
    spin?: boolean
  }>()
</script>

<style></style>
