<template>
  <span class="linear-bar">
    {{ progress }}%
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 100 14"
      class="line-container"
      height="14px"
      width="100%"
    >
      <line
        class="line-container__background"
        stroke-linecap="round"
        stroke-width="4px"
        x1="4px"
        x2="97%"
        y2="7px"
        y1="7px"
      />
      <line
        class="line-container__progress"
        stroke-linecap="round"
        stroke-width="4px"
        :x2="`${progress * .97}%`"
        x1="4px"
        y2="7px"
        y1="7px"
      />
    </svg>
  </span>
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

const stroke = computed(() => {
  return progress.value <= 25 ? COLOR_MAP.RED : progress.value <= 50 ? COLOR_MAP.ORANGE : COLOR_MAP.GREEN
})
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.linear-bar {
  display: flex;
  align-items: center;
  width: 100%;

  .line-container {
    margin-left: 4px;

    &__background {
      stroke: $blue-light;
    }
    &__progress {
      stroke: v-bind(stroke);
    }
    &__text {
      font: 400 11px "Proxima Nova", sans-serif;
    }
  }
}
</style>
