<script setup lang="ts">
interface Props {
  title?: string,
  extra_class?: string,
  title_is_h1?: boolean,
  show_title?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  title_is_h1: false,
  show_title: true,
})
</script>

<template>
<section :class="extra_class" class="mb-[100px] md:mb-[180px]">
  <div class="container">
    <template v-if="title" >

      <h1 class="text-2xl font-semibold mb-5" v-if="title_is_h1" v-html="title"></h1>
      <h2 class="text-lg md:text-2xl font-semibold mb-5" v-else v-html="title"></h2>
    </template>
  </div>
  <slot/>

</section>
</template>

<style scoped>

</style>