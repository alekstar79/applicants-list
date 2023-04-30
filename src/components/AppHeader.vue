<template functional>
  <header class="header-container header-container--sticky">
    <section class="container">
      <figure class="header-container__logo">
        <img
          src="../assets/logo.svg"
          class="header-container__image"
          alt="Logo"
          width="41"
          height="33"
        >
        <figcaption>
          Система таблиц
        </figcaption>
      </figure>

      <figure class="header-container__employee">
        <figcaption>
          Светлана
          <span>Сотрудник</span>
        </figcaption>
        <img
          src="../assets/avatar.jpg"
          class="header-container__image"
          alt="Logo"
          width="44"
          height="44"
        >
      </figure>
    </section>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.header-container {
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  background: $white;

  &--sticky {
    position: sticky;
    top: 0;

    height: 84px;
    z-index: 999;
  }
  &__logo,
  &__employee {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    padding: 0;
    margin: 0;

    font-family: "Proxima-Nova", sans-serif;
    color: $blue;
  }
  &__logo {
    width: 130px;
    height: 36px;

    font-weight: 800;
    font-size: 16px;

    text-align: left;
    line-height: 18px;
    text-transform: uppercase;
  }
  &__employee {
    width: 121px;
    height: 44px;

    font-weight: 700;
    font-size: 14px;

    text-align: right;
    line-height: 17px;

    .header-container__image {
      border-radius: 50%;
    }
    span {
      font-weight: 400;
      font-size: 14px;
      color: $grey;
    }
  }
}
</style>
