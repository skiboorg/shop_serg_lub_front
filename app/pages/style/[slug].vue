<script setup lang="ts">
const {$api} = useNuxtApp()
const {slug} = useRoute().params
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const style = useDataOrFail(useAsyncData(() =>
    $api.repo.style(slug)
))
const loading = ref(false)
const cartCount = useState('cartCount')
const sessionUUID = useCookie('session_uuid')

const in_cart = async () => {
  loading.value = true
  const result = await $api.repo.cart({
    session_id:sessionUUID.value,
    method: 'POST',
    payload: {
      style_id: style.value.id
    }
  })
  cartCount.value = await $api.repo.cart({session_id:sessionUUID.value,method:'get'})
  loading.value = false
  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Набор добавлен в корзину', life: 1000 });
}

const totalPrice = computed(()=>{
  let total = 0
  style.value?.products?.forEach((item:any)=>{
    total += parseFloat(item.product.price)
  })
  return total
})

</script>

<template>
  <div class="container" v-if="style">
    <div class="flex gap-3 text-sm mb-5 mt-10">
      <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
<!--      <span>/</span>-->
<!--      <nuxt-link class="opacity-50" to="/">Блески для губ</nuxt-link>-->
      <span>/</span>
      <span>{{style.name}}</span>
    </div>
    <Section >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div class="">
          <img :src="style.image" alt="">


        </div>
        <div class="">
          <h1 class="font-semibold text-[20px] uppercase">{{style.name}}</h1>
<!--          <p class="opacity-50 text-sm mb-7">Артикул: GTN00031</p>-->
          <p class="mb-7">{{totalPrice}} ₽</p>

          <div class="text-sm opacity-50 mb-7" v-html="style.html_content"></div>
          <div class=" grid grid-cols-12 gap-5 mb-5 h-auto " v-for="product in style.products">

            <div class="col-span-12 md:col-span-4 ">
              <img class="w-full h-full object-cover" :src="product.product.image" alt="">
            </div>
            <div class="flex flex-col items-start justify-between col-span-12 md:col-span-8 ">
              <p class="uppercase font-semibold text-sm ">{{product.product.name}}</p>
              <p class="opacity-50 text-sm">{{product.product.price}}₽</p>
              <p class="opacity-50 text-sm">{{product.product.short_description}}</p>
            </div>
          </div>
          <div class="">
            <Button :loading="loading" @click="in_cart" severity="contrast" class="uppercase"  label="В корзину"/>
          </div>

        </div>
      </div>
    </Section>


  </div>
  <PopularBlock/>



</template>
