<template>
  <div class="list__wrapper">
    <list-item
      class="applicants__list-item"
      v-for="applicant in listOfApplicants"
      :set="totalScore = total(applicant)"
      :key="applicant.id"
    >
      <item-cell class="cell cell__name">
        {{ applicant.name }}
      </item-cell>
      <item-cell class="cell cell__date">
        {{ localeDate(applicant.date) }}
      </item-cell>

      <template v-for="({ score, mark }, i) in applicant.subjects">
        <item-cell
          :class="`cell cell__score cell__score--${mark}`"
          :style="{ color: getColor(score, MAX_SCORE) }"
          :key="`${applicant.id}-${i}`"
        >
          {{ score }}
        </item-cell>
      </template>

      <item-cell
        class="cell cell__total"
        :style="{ color: getColor(totalScore, MAX_TOTAL) }"
      >
        {{ totalScore }}
      </item-cell>
      <item-cell class="cell cell__percent">
        <CircularPercentageBar
          :progress="percent(applicant)"
        />
      </item-cell>
    </list-item>
  </div>
</template>

<script setup>
import CircularPercentageBar from '@/components/CircularPercentageBar'

import { MAX_SCORE, MAX_TOTAL } from '@/composable/constants'
import { useApplicant } from '@/composable/useApplicant'

let totalScore

const {

  listOfApplicants,
  localeDate,
  getColor,
  percent,
  total

} = useApplicant()
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.list__wrapper {
  width: 100%;

  .applicants__list-item {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 64px;
    min-width: 960px;
    width: 100%;

    border-radius: 4px;

    .cell {
      display: flex;
      align-items: center;
      flex: 0 1 10%;

      padding: 12px 18px;
      min-width: 150px;
      height: 100%;

      border: 1px solid $blue-super-light;
      background-color: $white;

      &:first-child {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }
      &__name {
        min-width: 290px;
        flex: 1 0 30%;
      }
      &__date {
        min-width: 160px;
        flex: 0 1 10%;
      }
      &__score {
        font-weight: 700;

        &--comp {
          min-width: 152px;
          flex: 0 1 11%;
        }
      }
      &__total {
        font-weight: 700;
        min-width: 130px;
        flex: 0 1 10%;
      }
      &__percent {
        min-width: 100px;
        flex: 0 1 8%;
      }
    }
    &:hover .cell {
      border: 1px solid $blue-light;
      background-color: transparent;
    }
  }
}
</style>
