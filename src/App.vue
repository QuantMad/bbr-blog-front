<script setup lang="ts">
import HeaderMenu from './components/HeaderMenu.vue';
import MatrixRain from './components/MatrixRain.vue';
</script>

<template>
        <MatrixRain />
  <header>
      <HeaderMenu/>
      <p>{{$route.fullPath}}</p>
  </header>
  <div>
    <RouterView/>
  </div>
  <footer>
    
  </footer>
</template>

<style lang="css" scoped>

</style>