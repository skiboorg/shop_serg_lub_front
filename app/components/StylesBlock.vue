<script setup lang="ts">
const {$api} = useNuxtApp()

const { data: styles, refresh, status } = useHttpRequest(useAsyncData(() =>
    $api.repo.styles()
))
</script>

<template>
<Section title="СОБЕРИ СВОЙ ОБРАЗ">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
      <StyleCard :class="style.style" v-for="style in styles"  :image="style.image" :title="style.name" :url="`/style/${style.slug}`" />
<!--      <StyleCard class="col-span-12 md:col-span-4" image="/styles/4.jpg" title="ROSY RADIANCE" />-->
<!--      <StyleCard class="col-span-12 md:col-span-9 md:col-start-4" image="/styles/2.jpg" title="KIM'S HOLIDAY LIP LOOK" />-->
<!--      <StyleCard class="col-span-12 md:col-span-4 md:col-start-2" image="/styles/5.jpg" title="GOLDEN HOUR GLOW" />-->
<!--      <StyleCard class="col-span-12 md:col-span-4 md:col-start-9" image="/styles/1.jpg" title="ETHEREAL DAYTIME" />-->
<!--      <StyleCard class="col-span-12 md:col-span-6" image="/styles/6.jpg" title="SUGAR PLUM" />-->
    </div>

  </div>
</Section>
</template>

<style scoped>

</style>