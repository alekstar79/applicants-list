<template>
  <div class="list__wrapper">
    <list-item
      class="applicants__list-item"
      v-for="applicant in listOfApplicants"
      :set="totalScore = total(applicant)"
      :key="applicant.id"
    >
      <item-cell class="cell cell__name">
        <summary>{{ convert('name') }}</summary> {{ applicant.name }}
      </item-cell>
      <item-cell class="cell cell__date">
        <summary>{{ convert('date') }}</summary> {{ localeDate(applicant.date) }}
      </item-cell>

      <template v-for="({ score, mark }, i) in applicant.subjects">
        <item-cell
          :class="`cell cell__score cell__score--${mark}`"
          :style="{ color: getColor(score, MAX_SCORE) }"
          :key="`${applicant.id}-${i}`"
        >
          <summary>{{ convert(mark) }}</summary> {{ score }}
        </item-cell>
      </template>

      <item-cell
        class="cell cell__total"
        :style="{ color: getColor(totalScore, MAX_TOTAL) }"
      >
        <summary>{{ convert('total') }}</summary> {{ totalScore }}
      </item-cell>
      <item-cell class="cell cell__percent">
        <summary>{{ convert('percent') }}</summary>

        <LinearPercentageBar
          :progress="percent(applicant)"
        />
      </item-cell>
    </list-item>
  </div>
</template>

<script setup>
import LinearPercentageBar from '@/components/LinearPercentageBar'

import { MAX_SCORE, MAX_TOTAL } from '@/composable/constants'
import { useApplicant } from '@/composable/useApplicant'

let totalScore

/**
* @typedef Applicant
* @property {Number} id
* @property {String} name
* @property {String} date
* @property {Subject[]} subjects
*/

const {

  listOfApplicants,
  localeDate,
  getColor,
  percent,
  convert,
  total

} = useApplicant()
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.list__wrapper {
  width: 100%;

  .applicants__list-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    .cell {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 0 1 10%;

      padding: 8px 12px;
      min-height: 33px;
      height: 100%;
      width: 100%;

      border: 1px solid $blue-super-light;
      background-color: $white;
      font-weight: 700;
      font-size: 14px;

      &:hover {
        border: 1px solid $blue-light;
        background-color: transparent;
      }
      &__name {
        font-weight: 400;
      }
      &__date {
        font-weight: 400;
      }
      &__percent {
        font-weight: 400;
      }
      summary {
        min-width: 155px;
        width: 40%;

        font-weight: 700;
        font-size: 12px;

        color: $grey;
      }
    }
  }
}
</style>
