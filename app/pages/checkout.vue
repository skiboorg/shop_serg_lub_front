<script setup lang="ts">
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const {$api} = useNuxtApp()
const loading = ref(false)
const cartCount = useState('cartCount')
const sessionUUID = useCookie('session_uuid')
const orderId = 'ЗАКАЗ-' + Date.now().toString().slice(-5)
const fias_data = ref([])
const delivery_data = ref(null)
const selected_delivery = ref(null)


const order_data = ref({
  selected_address:null,
  selected_delivery:null,
  comment:null,
  street:null,
  building_1:null,
  building_2:'-',
  room:'-',
  firstname:null,
  middlename:null,
  lastname:null,
  phone:null,
  email:null,
  order_id:null,
  sdek_at_door:false,
})

const validateEmail = computed(()=>{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order_data.value.email)
})

function isOrderDataValid() {
  const data = order_data.value;

  // список полей, которые *обязательно должны быть заполнены*
  const requiredFields = [
    // 'selected_address',
    // 'selected_delivery',
    'street',
    'building_1',
    'building_2',
    'room',
    'firstname',
    'lastname',
    'phone',
    'email',
  ];

  return requiredFields.every(key => {
    const value = data[key];
    return value !== null && value !== '' && value !== undefined;
  });
}

const pay_error = ref(null)

const total_order_price = computed(()=>{
  return cartCount.value.total_price + order_data.value.selected_delivery?.cost || 0
})


const can_pay = computed(()=>{
  return validateEmail.value && isOrderDataValid
})
const  handleSuccess= async () => {

  loading.value = true
  try{

    order_data.value.order_id = orderId
    const resp = await $api.repo.new_order({session_id:sessionUUID.value,payload:order_data.value})
    console.log(resp)
    if (resp.success) {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Заказ создан', life: 3000 });
      navigateTo(`/order_done?order_num=${orderId}`)
    }else {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: resp.comment, life: 3000 });
    }

  }catch(error){
    console.log(error)
    toast.add({ severity: 'error', summary: 'Ошибка', detail: error.data.comment, life: 3000 });
  }finally{
    loading.value = false
  }

}
const handleAddressInput = async () => {
  loading.value = true
  fias_data.value = await $api.repo.fias(order_data.value.selected_address)
  loading.value = false
}

const fiasSelected = async () => {
  console.log(order_data.value.selected_address)
  loading.value = true
  if (order_data.value.selected_address?.fias_id){
    delivery_data.value = await $api.repo.deliveries(order_data.value.selected_address?.fias_id)
  }
  loading.value = false
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
        <!--        <pre>-->
        <!--          {{order_data}}-->
        <!--        </pre>-->
        <p class="font-semibold text-[20px] mb-5">Личные данные</p>
        <p class="mb-4 font-extralight text-red-500">Поля отмеченные * обязательны к заполнению</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <FloatLabel  variant="in">
            <InputText fluid v-model="order_data.firstname" id="firstname`"/>
            <label for="firstname">Имя *</label>
          </FloatLabel>
          <FloatLabel  variant="in">
            <InputText fluid v-model="order_data.lastname" id="lastname`"/>
            <label for="lastname">Фамилия *</label>
          </FloatLabel>
          <FloatLabel  variant="in">
            <InputText fluid v-model="order_data.middlename" id="middlename`"/>
            <label for="middlename">Отчество</label>
          </FloatLabel>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <FloatLabel  variant="in">
            <InputMask fluid  mask="+79999999999" unmask v-model="order_data.phone" id="phone`"/>
            <label for="phone">Телефон *</label>
          </FloatLabel>
          <FloatLabel  variant="in">
            <InputText fluid   v-model="order_data.email" id="email`"/>
            <label for="email">Email *</label>
          </FloatLabel>
        </div>
        <div class="grid grid-cols-12 gap-3 mb-5">
          <div class="col-span-12 md:col-span-6">
            <FloatLabel  variant="in">
              <InputText fluid   v-model="order_data.street" id="street`"/>
              <label for="street">Улица адреса доставки *</label>
            </FloatLabel>
          </div>
          <div class="col-span-4 md:col-span-2">
            <FloatLabel  variant="in">
              <InputText fluid   v-model="order_data.building_1" id="building_1`"/>
              <label for="building_1">Дом *</label>
            </FloatLabel>
          </div>
          <div class="col-span-4 md:col-span-2">
            <FloatLabel  variant="in">
              <InputText fluid   v-model="order_data.building_2" id="building_2`"/>
              <label for="building_2">Строение/корпус*</label>
            </FloatLabel>
          </div>
          <div class="col-span-4 md:col-span-2">
            <FloatLabel  variant="in">
              <InputText fluid   v-model="order_data.room" id="room`"/>
              <label for="room">Квартира/офис *</label>
            </FloatLabel>
          </div>


        </div>
        <FloatLabel class="mb-5" variant="in">
          <InputText fluid   v-model="order_data.comment" id="comment`"/>
          <label for="comment">Комментарий к доставке</label>
        </FloatLabel>

        <p class="font-semibold text-[20px] mt-14 mb-5">Тип доставки</p>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <RadioButton v-model="order_data.sdek_at_door" inputId="sdek_at_door1" name="false" :value="false" />
            <label for="sdek_at_door1">Доставка СДЕК</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton v-model="order_data.sdek_at_door" inputId="sdek_at_door2" name="true" :value="true" />
            <label for="sdek_at_door2">Доставка СДЕК до двери</label>
          </div>

        </div>
<!--        <p class="font-semibold text-[20px] mt-14 mb-5">Доставка</p>-->
<!--        <p class="mb-4 font-extralight">Для получения возможных вариантов доставки выберите ваш населенный пункт (город\поселок).<br>-->
<!--          Без выбора доставки оформить заказ невозможно.<br>-->
<!--          Если вы не видите возможные варианты доставки, то вы некорректно выбрали населенный пункт!<br>-->
<!--          Извиняемся, это не самая удобная система, но сервис для расчета доставки по другому не умеет :(</p>-->
<!--        <FloatLabel-->
<!--            class="mb-5"-->
<!--            variant="in"-->
<!--            :key="1"-->
<!--        >-->
<!--          <Select :loading="loading"-->
<!--                  v-model="order_data.selected_address"-->
<!--                  editable-->
<!--                  class="w-full"-->
<!--                  :options="fias_data"-->
<!--                  optionLabel="value"-->
<!--                  @update:modelValue="fiasSelected"-->
<!--                  @input="handleAddressInput" />-->
<!--          <label for="over_label">Населенный пункт *</label>-->
<!--        </FloatLabel>-->

<!--        <div v-if="delivery_data" class="grid grid-cols-2 md:grid-cols-4 gap-3">-->
<!--          <div class="border p-2 flex flex-col items-start justify-between h-[115px]  hover:shadow-lg  hover:cursor-pointer"-->
<!--               :class="selected_delivery===delivery ? 'bg-black text-white' : ''"-->
<!--               @click="selected_delivery=delivery"-->
<!--               v-for="delivery in delivery_data.city_info.deliveries">-->
<!--            <p>{{delivery.delivery_name}}</p>-->
<!--            <p>от {{delivery.min_cost}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mt-4" v-if="selected_delivery">-->
<!--          <p class="mb-4 font-extralight">Для выбора пункта получения введите ближайший к вам адрес ПВЗ.Список адресов доступен на официальном сайте</p>-->
<!--          <FloatLabel-->
<!--              class="mb-5"-->
<!--              variant="in"-->
<!--              :key="1"-->
<!--          >-->
<!--            <Select :loading="loading"-->
<!--                    v-model="order_data.selected_delivery"-->
<!--                    class="w-full"-->
<!--                    filter-->
<!--                    :filter-fields="['address']"-->
<!--                    :options="selected_delivery.options"-->
<!--                    optionLabel="name"-->

<!--            >-->
<!--              <template #option="slotProps">-->
<!--                <div class="flex items-center">-->
<!--                  <div>Cтоимость {{slotProps.option.cost}}, дата {{slotProps.option.delivery_date}}<br>-->
<!--                    {{slotProps.option.address}}</div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </Select>-->
<!--            <label for="over_label">Выберите пункт получения</label>-->
<!--          </FloatLabel>-->
<!--          <p v-if="order_data.selected_delivery?.comment_address">{{order_data.selected_delivery?.comment_address}}</p>-->
<!--          <p v-if="order_data.selected_delivery?.schedule">Время работы: {{order_data.selected_delivery?.schedule}}</p>-->
<!--          <p v-if="order_data.selected_delivery?.phone">Телефон: {{order_data.selected_delivery?.phone}}</p>-->
<!--        </div>-->

      </div>

      <div class="col-span-12 md:col-span-4">
        <p class="font-semibold text-[20px] mb-5">Итого</p>
        <div class=" border p-5">
          <div class="flex justify-between mb-5 pb-5 border-b">
            <p class="uppercase">Товаров на сумму</p>
            <p>{{cartCount.total_price}} ₽</p>
          </div>
<!--          <div class="flex justify-between mb-5 pb-5 border-b">-->
<!--            <p class="uppercase">Доставка</p>-->
<!--            <p>{{order_data.selected_delivery?.cost || 0}} ₽</p>-->
<!--          </div>-->
          <div class="flex justify-between  mb-5">
            <p class="uppercase">Итого:</p>
            <p>{{cartCount.total_price}} ₽</p>
          </div>
          <p v-if="pay_error" class="text-red-500 font-bold">{{pay_error}}</p>
          <LifePayWidget v-if='cartCount.items_count > 0'

                         :orderId="orderId"
                         :loading="loading"
                         @success="handleSuccess"
                         :disabled="can_pay"
                         :cost="cartCount.total_price"
                         :phone="order_data.phone"
                         :email="order_data.email" />

        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>

</style>