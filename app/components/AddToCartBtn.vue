<script setup lang="ts">
const props = defineProps(['item_id','can_add_to_cart', 'amount','show_button'])
const {$api} = useNuxtApp()
const amount = ref(1)
const loading = ref(false)
const cartCount = useState('cartCount')
const sessionUUID = useCookie('session_uuid')
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// console.log(props)

props.amount ? amount.value = props.amount : null
const addToCart = async () => {
  loading.value = true
  const result = await $api.repo.cart({
    session_id:sessionUUID.value,
    method: 'POST',
    payload: {
      product_id: props.item_id,
      amount:amount.value
    }
  })
  cartCount.value = await $api.repo.cart({session_id:sessionUUID.value,method:'get'})
  loading.value = false
  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Корзина обновлена', life: 1000 });
}

watch(amount, async  (new_amount) => {
  // console.log(new_amount)
  if (!props.show_button){
    loading.value = true
    const result = await $api.repo.cart({
      session_id:sessionUUID.value,
      method: 'PATCH',
      payload: {
        product_id: props.item_id,
        amount:amount.value
      }
    })
    cartCount.value = await $api.repo.cart({session_id:sessionUUID.value,method:'get'})
    loading.value = false
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Корзина обновлена', life: 1000 });
  }
})
</script>

<template>
  <div class="flex gap-3">
    <InputNumber size="small" v-if="can_add_to_cart" inputId="horizontal-buttons"
                 showButtons

                 input-class="text-center "
                 v-model="amount"
                 buttonLayout="horizontal" :step="1" :min="1"  >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <Button v-if="show_button" outlined severity="contrast" class="uppercase" @click="addToCart" :loading="loading" fluid label="В корзину"/>
  </div>
</template>

<style scoped>

</style>