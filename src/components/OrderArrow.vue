<template>
  <span class="order__arrow" :class="{ offset }">
    <svg
      v-if="order === 'asc'"
      class="order__arrow--asc"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      height="8"
      width="8"
    >
      <path d="M4 8L7.5 4L0.5 4L4 8Z" />
      <path d="M4 0L4 4" stroke-width="2"/>
    </svg>
    <svg
      v-else
      class="order__arrow--desc"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      height="8"
      width="8"
    >
      <path d="M3.5 0.5L7 4.5L-1.74846e-07 4.5L3.5 0.5Z" />
      <path d="M3.5 8.5L3.5 4.5" stroke-width="2" />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  offset: {
    type: Boolean,
    default: true
  },
  order: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.order__arrow.offset {
  margin-left: 5px;
}
</style>
