<script setup lang="ts">
const props = defineProps(['title', 'text', 'image'])
</script>

<template>
<div class="flex flex-col items-center justify-center lg:items-start lg:justify-start">
  <p class="font-semibold mb-2" v-html="title"></p>
  <p class="test-sm opacity-70 mb-5" v-html="text"></p>
  <img class="w-[325px] h-[325px] object-cover" :src="image" alt="">
</div>
</template>

<style scoped>

</style>