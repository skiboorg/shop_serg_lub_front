<script setup lang="ts">
const {order_num} = useRoute().query
</script>

<template>
  <div class="container">
    <div class="h-svh flex flex-col items-center justify-center">

      <p class=" md:text-2xl text-center">Ваш {{order_num}} успешно оформлен и будет обработан в течение 24 часов.<br>Статус заказа отображается на сайте выбранной вами службы доставки. </p>
    </div>
  </div>
</template>

<style scoped>

</style>