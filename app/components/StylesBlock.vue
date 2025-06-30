<script setup lang="ts">
const {$api} = useNuxtApp()
const props = defineProps(['category_styles', 'title'])
const styles_array = ref([])
if (!props.category_styles){
  const { data: styles, refresh, status } = useHttpRequest(await useAsyncData(() =>
      $api.repo.styles()
  ))
  styles_array.value = styles.value
}else {
  styles_array.value = props.category_styles
}

</script>

<template>
<Section :title="title">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
      <StyleCard :class="style.style" v-for="style in styles_array"  :image="style.image" :title="style.name" :url="`/style/${style.slug}`" />
    </div>

  </div>
</Section>
</template>

<style scoped>

</style>