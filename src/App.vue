<template>
  <div>
    <nav class="navigation">
      <router-link to="dashboard" class="navigation__link">Задание первое</router-link>
      <router-link to="chartjs" class="navigation__link">Задание второе</router-link>
    </nav>
    <RouterView />
  </div>
</template>

<style lang="scss">
.navigation {
  display: flex;
  width: 500px;
  padding: 20px;
  justify-content: center;
  margin: 10px auto;

  &__link {
    text-decoration: none;
    color: #000000;
    margin-inline: 20px;
  }
}
</style>