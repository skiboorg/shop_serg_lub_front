<script setup lang="ts">
const form_data_personal = ref([
    {label:'Почта',key:'email', value:''},
    {label:'ФИО',key:'fio', value:''},
    ])
const form_data_address = ref([
  {label:'Город',key:'city', value:''},
  {label:'Адрес', key:'address',value:''},
])
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
            <p>4 980₽</p>
          </div>
          <div class="flex justify-between  mb-5">
            <p class="uppercase">Итого:</p>
            <p>4 980₽</p>
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