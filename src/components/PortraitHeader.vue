<template>
  <section class="applicants__list-header applicants__list-header--portrait">
    <div class="dropdown">
      <button
        @click="toggleDropDown"
        class="dropdown__button"
        ref="dropDownBtn"
        type="button"
      >
        <sup>Сортировать по</sup>
        {{ convert(orderBy.by) }}
      </button>
      <ul
        @click="closeDropDown"
        class="dropdown__list"
        ref="dropDownList"
      >
        <li
          v-for="({ text, by }) in list"
          :class="{ 'dropdown__list-item--active': by === orderBy.by }"
          class="dropdown__list-item"
          @click="setSort(by)"
          :key="by"
        >
          {{ text }}
        </li>
      </ul>
    </div>
    <button
      :class="{ active: orderBy[orderBy.by] === 'asc' }"
      @click="setOrder('asc')"
    >
      <OrderArrow order="asc" :offset="false" />
    </button>
    <button
      :class="{ active: orderBy[orderBy.by] === 'desc' }"
      @click="setOrder('desc')"
    >
      <OrderArrow order="desc" :offset="false" />
    </button>
  </section>
</template>

<script setup>
import { useApplicant } from '@/composable/useApplicant'
import { CONVERSION } from '@/composable/constants'
import { onMounted, ref } from 'vue'

import OrderArrow from '@/components/OrderArrow'

const list = Object.entries(CONVERSION).map(([by, text]) => ({ text, by }))

const { orderBy, convert, setSort, setOrder } = useApplicant()

const dropDownList = ref(null)
const dropDownBtn = ref(null)

function toggleDropDown()
{
  dropDownList.value?.classList.toggle('dropdown__list--visible')
  dropDownBtn.value?.classList.toggle('dropdown__button--active')
}

function closeDropDown()
{
  dropDownList.value?.classList.remove('dropdown__list--visible')
  dropDownBtn.value?.classList.remove('dropdown__button--active')
}

onMounted(() => {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDropDown()
  })
  document.addEventListener('click', e => {
    if (e.target !== dropDownBtn.value) closeDropDown()
  })
})
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.applicants__list-header--portrait {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 8px;
  height: 44px;
  width: 100%;

  font-weight: 700;
  font-size: 12px;

  user-select: none;

  .dropdown {
    position: relative;

    &__button {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      position: relative;

      padding: 4px 40px 4px 15px;
      height: 44px;
      width: 232px;

      font-weight: 400;
      font-size: 14px;
      color: $black;

      text-align: left;
      background: #ffffff;
      border: 1px solid #e6eaed;
      border-radius: 4px;

      cursor: pointer;

      sup {
        font-size: 11px;
        color: $grey;
      }
      &::after {
        content: '';
        position: absolute;
        right: 15px;
        top: 50%;

        width: 10px;
        height: 15px;

        transform: translateY(-50%);
        background: url("~@/assets/icons/arrow-down.svg") no-repeat 100% 100%;
        pointer-events: none;
      }
      &--active {
        border: 1px solid $blue;

        &::after {
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }
    &__list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      position: absolute;
      left: 0;
      top: 50px;
      box-shadow: 0 10px 20px 0 #88919d4d;
      border: 1px solid #e6eaed;
      border-radius: 4px;
      background: $white;
      overflow: hidden;
      width: 100%;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition: 200ms ease;

      &--visible {
        opacity: 1;
        visibility: visible;
      }
      &-item {
        margin: 0;
        padding: 15px;
        cursor: pointer;
        font-size: 14px;
        line-height: 18px;
        color: $black;
        transition: 200ms ease;

        &--active {
          background: $blue-super-light;
        }
        &:hover {
          background: $blue-super-light;
        }
      }
    }
  }
  button {
    width: 44px;
    height: 44px;
    border-radius: 4px;

    border: 1px solid $blue;
    background: transparent;
    cursor: pointer;

    .order__arrow--asc,
    .order__arrow--desc {
      fill: $blue;

      path {
        stroke: $blue;
      }
    }
    &.active {
      background: $blue;
      fill: $white;

      .order__arrow--asc,
      .order__arrow--desc {
        fill: $white;

        path {
          stroke: $white;
        }
      }
    }
  }
}
</style>
