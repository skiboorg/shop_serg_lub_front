<script setup lang="ts">
const form_data_personal = ref([
    {label:'Почта',key:'email', value:''},
    {label:'ФИО',key:'fio', value:''},
    {label:'Телефон',key:'phone', value:''},
    ])
const form_data_address = ref([
  {label:'Город',key:'city', value:''},
  {label:'Адрес', key:'address',value:''},
])
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const {$api} = useNuxtApp()
const loading = ref(false)
const cartCount = useState('cartCount')
const sessionUUID = useCookie('session_uuid')
const pay_error = ref(null)
const  handleSuccess= async (orderId: string) => {
  loading.value = true
  try{
    let order_data = form_data_personal.value.reduce((acc, { key, value }) => {
      acc[key] = value
      return acc
    }, {})
    order_data['order_id'] = orderId
    cartCount.value = await $api.repo.new_order({session_id:sessionUUID.value,payload:order_data})
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заказ создан', life: 3000 });
  }catch(error){
    console.log(error)
    toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Свяжитесь с техподдержкой', life: 3000 });
  }finally{
    loading.value = false
  }

}


</script>

<template>
  <div class="container">
    <div class="flex gap-3 text-sm mb-10 mt-10">

      <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
      <span>/</span><nuxt-link class="opacity-50" to="/cart">Корзина</nuxt-link>
      <span>/</span><span>Оформление заказа</span>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-8">
        <p class="font-semibold text-[20px] mb-5">Личные данные</p>
        <FloatLabel class="mb-5 " variant="in" v-for="(input,index) in form_data_personal" :key="index">
          <InputText :id="`label_${index}`" fluid v-model="input.value"  />
          <label :id="`label_${index}`">{{input.label}}</label>
        </FloatLabel>
        <p class="font-semibold text-[20px] mt-14 mb-5">Адрес доставки</p>
        <FloatLabel class="mb-5 " variant="in" v-for="(input,index) in form_data_address" :key="index">
          <InputText :id="`label_${index}`" fluid v-model="input.value"  />
          <label :id="`label_${index}`">{{input.label}}</label>
        </FloatLabel>

      </div>

      <div class="col-span-12 md:col-span-4">
        <p class="font-semibold text-[20px] mb-5">Итого</p>
        <div class=" border p-5">
          <div class="flex justify-between mb-5 pb-5 border-b">
            <p class="uppercase">Товар на сумму</p>
            <p>{{cartCount.total_price}} ₽</p>
          </div>
          <div class="flex justify-between  mb-5">
            <p class="uppercase">Итого:</p>
            <p>{{cartCount.total_price}} ₽</p>
          </div>
          <p v-if="pay_error" class="text-red-500 font-bold">{{pay_error}}</p>

          <LifePayWidget :loading="loading" @success="handleSuccess" :cost="cartCount.total_price" :phone="form_data_personal[2].value" :email="form_data_personal[0].value" />

        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>

</style>