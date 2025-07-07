<script setup lang="ts">
defineProps(['image', 'title','url'])
</script>

<template>
<div class="flex flex-col items-start justify-between">
  <img class="block w-full h-auto object-cover mb-6" :src="image" alt="">
  <p class="uppercase font-semibold mb-3">{{title}}</p>
  <NuxtLink :to="url" class="block w-full">
    <Button fluid outlined severity="contrast" label="СМОТРЕТЬ ПРОДУКТЫ"/>
  </NuxtLink>

</div>
</template>

<style scoped>

</style>