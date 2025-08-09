<script setup lang="ts">
const {order_num} = useRoute().query
</script>

<template>
  <div class="container">
    <div class="h-svh flex flex-col items-center justify-center">
      <p class="text-3xl">Ваш заказ оформлен</p>
      <p class="text-2xl">Номер заказа: {{order_num}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>