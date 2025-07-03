<script setup lang="ts">
const {$api} = useNuxtApp()
const route = useRoute()
const router = useRouter()
const name = computed(() => route.query.name || 'all')



const [categoriesRes,productsRes] = await Promise.all([
  useAsyncData(() =>  $api.repo.categories()),
  useAsyncData(() =>  $api.repo.products()),
]);

const loadingCart = computed(() => categoriesRes.status.value === 'pending' || productsRes.status.value === 'pending')

const categories = categoriesRes.data;
const products = productsRes.data;

const selectedCategorySlug = ref('')
selectedCategorySlug.value = name.value
const selectedCategory = ref(null)

if (name.value !=='all'){
  selectedCategory.value = categories.value.find(category => category.slug === selectedCategorySlug.value)
}

const changeCategory = (slug: string) => {
  router.push({ query: { name: slug } })
  selectedCategorySlug.value = slug
  if (slug === 'all') {
    selectedCategory.value = null
  }else {
    selectedCategory.value = categories.value.find(category => category.slug === selectedCategorySlug.value)
  }
}

</script>

<template>
<div class="container">

  <div class="flex gap-3 text-sm mb-16 mt-10">
    <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
    <span>/</span>
    <span>Каталог</span>
  </div>
  <div class="">
    <div class="flex flex-col gap-2 items-start mb-5">
      <p class="font-semibold uppercase cursor-pointer" :class="name==='all' ? '' : 'opacity-50'" @click="changeCategory('all')">Все товары</p>
      <p
          class="font-semibold uppercase cursor-pointer"
          :class="name===category.slug ? '' : 'opacity-50'"
          v-for="category in categories"
          :key="category.slug"
          @click="changeCategory(category.slug)"
      >
        {{ category.name }}
      </p>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <ProductCard :can_add_to_cart="true" v-for="item in name==='all' ? products : products.filter(product => product.cat_slug === name)" :item="item" />

    </div>

    <StylesBlock class="mt-10" v-if="selectedCategory && selectedCategory.styles?.length >0" :category_styles="selectedCategory.styles"/>
  </div>
</div>
</template>

<style scoped>

</style>