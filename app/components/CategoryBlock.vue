<script setup lang="ts">
const {$api} = useNuxtApp()

const { data: categories, refresh, status } = useHttpRequest(useAsyncData(() =>
    $api.repo.categories()
))
</script>

<template>
  <Section title="КАТЕГОРИИ">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <NuxtLink :to="`/catalog?name=${category.slug}`" v-for="category in categories">
        <div class="flex flex-col items-center justify-between border border-black p-5 md:p-10">
          <img class="mb-10 w-full h-[230px] object-contain" :src="category.image" />
          <p class="font-semibold text-center uppercase">{{category.name}}</p>
        </div>
        </NuxtLink>

      </div>

    </div>
  </Section>

</template>

<style scoped>

</style>