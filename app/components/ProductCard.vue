<script setup lang="ts">
import AddToCartBtn from "~/components/AddToCartBtn.vue";

const props = defineProps(['item','can_add_to_cart'])

</script>

<template>
  <div>
  <nuxt-link :to="`/catalog/${item?.slug}`">
    <img class="block mb-6 w-full h-auto object-cover" :src="item?.image" alt="">
    <p class="uppercase font-semibold mb-3">{{item?.name}}</p>
    <p class="text-sm opacity-70 mb-6">{{item?.price}}₽</p>
  </nuxt-link>
   <AddToCartBtn :item_id="item.id" :show_button="true" :can_add_to_cart="can_add_to_cart"/>
  </div>


</template>

<style scoped>

</style>