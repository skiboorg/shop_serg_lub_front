<script setup lang="ts">
const props = defineProps(['title', 'text', 'image'])
</script>

<template>
<div class="flex flex-col items-start justify-start">
  <p class="font-semibold mb-2" v-html="title"></p>
  <p class="test-sm opacity-70 mb-5" v-html="text"></p>
  <img class="w-full md:w-[325px] h-[325px] object-cover md:object-contain" :src="image" alt="">
</div>
</template>

<style scoped>

</style>