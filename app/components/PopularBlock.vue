<script setup lang="ts">
const {$api} = useNuxtApp()

const { data: popular, refresh, status } = useHttpRequest(useAsyncData(() =>
    $api.repo.popular()
))
</script>

<template>
  <Section title="ПОПУЛЯРНЫЕ ТОВАРЫ">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ProductCard :can_add_to_cart="false" v-for="item in popular" :item="item" />

      </div>
    </div>


  </Section>
</template>

<style scoped>

</style>