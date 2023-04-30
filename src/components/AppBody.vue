<template>
  <section class="container">
    <h1 class="applicants__title">Список заявлений</h1>

    <applicants-search class="applicants__finder">
      <img
        src="../assets/icons/search.svg"
        class="applicants__search-icon"
        alt="Search"
        height="15"
        width="15"
      >
      <input
        @input="searchHandler"
        placeholder="Поиск"
        type="text"
      >
    </applicants-search>

    <applicants-list class="applicants__list">
      <template v-if="!isMobile">
        <LandscapeHeader />
        <LandscapeBody />
      </template>
      <template v-else>
        <PortraitHeader />
        <PortraitBody />
      </template>
    </applicants-list>
  </section>
</template>

<script setup>
import LandscapeHeader from '@/components/LandscapeHeader'
import LandscapeBody from '@/components/LandscapeBody'

import PortraitHeader from '@/components/PortraitHeader'
import PortraitBody from '@/components/PortraitBody'

import { useApplicant } from '@/composable/useApplicant'
import { useMedia } from '@/composable/useMedia'

const { searchHandler } = useApplicant()
const { isMobile } = useMedia()
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.container {
  display: flex;
  flex-direction: column;

  .applicants__title {
    margin: 48px 0 0;
    flex: none;
    order: 0;
  }
  .applicants__finder {
    position: relative;
    display: block;
    height: 52px;

    margin: 20px 0 0;

    flex: none;
    order: 1;

    .applicants__search-icon {
      position: absolute;
      height: 52px;
      width: 52px;

      transform: scale(.3);
    }

    input {
      padding: 10px 10px 10px 50px;
      height: 100%;
      width: 100%;

      border-width: 1px;
      border-style: solid;
      border-color: $blue-light;
      border-radius: 4px;
      outline: none;

      &:hover {
        border-color: $blue-twain;
      }
      &:active {
        border-color: $blue;
      }
    }
  }
  .applicants__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: none;
    order: 2;

    padding: 4px 0 0;
    margin: 16px 0;

    list-style-type: none;
  }
}
</style>
