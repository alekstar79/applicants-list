<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="circle-container"
    viewBox="2 -2 28 36"
  >
    <circle
      class="circle-container__background"
      cx="16"
      cy="16"
      r="16"
    />
    <circle
      class="circle-container__progress"
      cx="16"
      cy="16"
      r="16"
    />
    <text
      class="circle-container__text"
      dy="-13"
      :dx="dx"
    >
      {{ progress }}%
    </text>
  </svg>
</template>

<script setup>
import { COLOR_MAP } from '@/composable/constants'
import { computed, toRefs } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true
  }
})

const { progress } = toRefs(props)

const dx = computed(() => progress.value >= 100 ? 3.5 : 6.5)
const strokeDashoffset = computed(() => 100 - progress.value)
const stroke = computed(() => {
  return progress.value <= 25 ? COLOR_MAP.RED : progress.value <= 50 ? COLOR_MAP.ORANGE : COLOR_MAP.GREEN
})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.circle-container {
  --progress-border-width: 3px;
  --circle-border-width: 1px;
  --dot-diameter: 46px;

  height: var(--dot-diameter);
  width: var(--dot-diameter);
  transform: rotate(-90deg);

  &__background {
    fill: none;
    stroke: $blue-light;
    stroke-width: var(--circle-border-width);
  }
  &__progress {
    fill: none;
    stroke: v-bind(stroke);
    stroke-linecap: round;
    stroke-dasharray: 100 100;
    stroke-dashoffset: v-bind(strokeDashoffset);
    stroke-width: var(--progress-border-width);
  }
  &__text {
    font: 400 11px "Proxima Nova", sans-serif;
    transform: rotate(90deg);
  }
}
</style>
