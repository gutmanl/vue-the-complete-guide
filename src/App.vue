<template>
    <AppHeader />
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" />
      </transition>
    </router-view>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue';

export default {
    components: {
        AppHeader
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 1s ease-out;
}

.route-enter-to, .route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.route-leave-active {
  transition: all 1s ease-in;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>