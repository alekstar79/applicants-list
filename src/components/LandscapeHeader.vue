<template>
  <list-item class="applicants__list-header applicants__list-header--landscape">
    <item-cell
      @click="toggleSort('name')"
      class="cell cell__name"
    >
      <summary>{{ convert('name') }}</summary>

      <template v-if="orderBy.by === 'name'">
        <OrderArrow :order="orderBy[orderBy.by]" />
      </template>
    </item-cell>
    <item-cell
      @click="toggleSort('date')"
      class="cell cell__date"
    >
      <summary>{{ convert('date') }}</summary>

      <template v-if="orderBy.by === 'date'">
        <OrderArrow :order="orderBy[orderBy.by]" />
      </template>
    </item-cell>

    <template v-for="(subject, i) in ['lang','math','comp']">
      <item-cell
        @click="toggleSort(subject)"
        :class="`cell cell__score cell__score--${subject}`"
        :key="`${subject}-${i}`"
      >
        <summary>{{ convert(subject) }}</summary>

        <template v-if="orderBy.by === subject">
          <OrderArrow :order="orderBy[orderBy.by]" />
        </template>
      </item-cell>
    </template>

    <item-cell
      @click="toggleSort('total')"
      class="cell cell__total"
    >
      <summary>{{ convert('total') }}</summary>

      <template v-if="orderBy.by === 'total'">
        <OrderArrow :order="orderBy[orderBy.by]" />
      </template>
    </item-cell>
    <item-cell
      @click="toggleSort('percent')"
      class="cell cell__percent"
    >
      <summary>{{ convert('percent') }}</summary>

      <template v-if="orderBy.by === 'percent'">
        <OrderArrow :order="orderBy[orderBy.by]" />
      </template>
    </item-cell>
  </list-item>
</template>

<script setup>
import { useApplicant } from '@/composable/useApplicant'
import OrderArrow from '@/components/OrderArrow'

const {

  orderBy,
  toggleSort,
  convert,

} = useApplicant()
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.applicants__list-header--landscape {
  display: flex;
  flex-direction: row;
  align-items: center;

  min-width: 960px;
  width: 100%;
  height: 32px;

  font-weight: 700;
  font-size: 12px;

  user-select: none;

  .cell {
    display: flex;
    align-items: center;
    flex: 0 1 10%;

    padding: 0 10px;
    min-width: 150px;
    height: 100%;

    letter-spacing: -.5px;
    color: $blue;

    border: 1px solid transparent;
    cursor: pointer;

    .order__arrow--asc,
    .order__arrow--desc {
      fill: $blue;

      path {
        stroke: $blue;
      }
    }
    &:hover {
      color: $blue-dark;

      .order__arrow--asc,
      .order__arrow--desc {
        fill: $blue-dark;

        path {
          stroke: $blue-dark;
        }
      }
    }
    &__name {
      min-width: 290px;
      flex: 1 0 30%;
    }
    &__date {
      min-width: 160px;
      flex: 0 1 10%;
    }
    &__score--comp {
      min-width: 152px;
      flex: 0 1 11%;
    }
    &__total {
      min-width: 130px;
      flex: 0 1 10%;
    }
    &__percent {
      min-width: 100px;
      flex: 0 1 8%;
    }
  }
}
</style>
