<script setup lang="ts">

const {$api} = useNuxtApp()
const loading = ref(false)
const cartCount = useState('cartCount')
const sessionUUID = useCookie('session_uuid')

const delete_from_cart = async (id) => {
  loading.value = true
  const result = await $api.repo.cart({
    session_id:sessionUUID.value,
    method: 'DELETE',
    payload: {
      product_id: id
    }
  })
  cartCount.value = await $api.repo.cart({session_id:sessionUUID.value,method:'get'})
  loading.value = false
}
</script>

<template>
  <div class="container">
    <div class="flex gap-3 text-sm mb-10 mt-10">
      <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
      <span>/</span>

      <span>Корзина</span>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-8">
        <p class="font-semibold text-[20px] mb-5">{{cartCount.items_count}} товара</p>
        <div class=" border p-5">
          <div class=" grid grid-cols-12 gap-5 mb-5 pb-5 border-b last:mb-0 last:pb-0 last:border-none h-auto md:h-[130px]" v-for="item in cartCount.items">

            <div class="w-full h-full object-cover col-span-12 md:col-span-2"><img class="w-full h-[200px] md:h-[120px] object-cover" :src="item.product.image" alt=""></div>
            <div class="flex flex-col items-start justify-between col-span-12 md:col-span-7">
              <p class="uppercase font-semibold text-sm w-[50%] mb-4 md:mb-0">{{item.product.name}}</p>
              <AddToCartBtn :can_add_to_cart="true" :item_id="item.id" :show_button="false" :amount="item.amount"/>
            </div>
            <div class="flex flex-col items-start md:items-end justify-between col-span-12 md:col-span-3">
              <div class="mb-4 md:mb-0">
                <p class="text-sm md:text-right">{{item.total_price}} ₽</p>
                <p class="text-[12px] md:text-right opacity-50">{{item.product.price}}₽ за 1 шт.</p>
              </div>
              <a href="/" @click.prevent="delete_from_cart(item.id)">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4.5V3C4 2.60218 4.15804 2.22064 4.43934 1.93934C4.72064 1.65804 5.10218 1.5 5.5 1.5H8.5C8.89782 1.5 9.27936 1.65804 9.56066 1.93934C9.84196 2.22064 10 2.60218 10 3V4.5M12.25 4.5V15C12.25 15.3978 12.092 15.7794 11.8107 16.0607C11.5294 16.342 11.1478 16.5 10.75 16.5H3.25C2.85218 16.5 2.47064 16.342 2.18934 16.0607C1.90804 15.7794 1.75 15.3978 1.75 15V4.5H12.25Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </div>

      </div>

      <div class="col-span-12 md:col-span-4">
        <p class="font-semibold text-[20px] mb-5">Итого</p>
        <div class=" border p-5">
          <div class="flex justify-between mb-5 pb-5 border-b">
            <p class="uppercase">Товар на сумму</p>
            <p>{{ cartCount.total_price}} ₽</p>
          </div>
          <div class="flex justify-between  mb-5">
            <p class="uppercase">Итого:</p>
            <p>{{ cartCount.total_price}} ₽</p>
          </div>
          <nuxt-link to="/checkout" >
            <Button severity="contrast" class="uppercase" fluid label="К оформлению"/>
          </nuxt-link>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>