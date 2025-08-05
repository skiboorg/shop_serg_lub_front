<template>
  <p class="text-center mb-4">Номер заказа : {{orderId}}</p>
  <Button @click="initWidget"
          :loading="loading"
          severity="contrast"
          class="uppercase"
          :disabled="!disabled"
          fluid
          :label="`К оформлению ${cost} ₽`"/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  cost: string | number
  email: string
  phone: string
  comment?: string
  orderId: string
  loading: boolean
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Не удалось загрузить ${src}`))
    document.head.appendChild(script)
  })
}

async function initWidget() {
  await loadScript('https://partner.life-pay.ru/gui/lifepay_widget/js/lp-widget.js')

  if (typeof window.LpWidget !== 'function') {
    console.error('LpWidget не загружен')
    return
  }

  const widget = new window.LpWidget({
    name: 'Оплата заказа ' + props.orderId,
    cost: String(props.cost),
    //key: 'aiCtl0UEKg8Szq88tuufUQN/ySPVcV9GhwkIWiNJboI=',
    key: 'h2+iB+hwVKc668QuePIeCwVE4vUBvyYDnGi0On7B4wc=',
    email: props.email,
    order_id:  props.orderId,
    comment: props.comment,
    on_success: () => {
      console.log('✅ Оплата прошла успешно')
      emit('success')
    },
    on_fail: () => {
      console.log('❌ Оплата не прошла')
    },
    on_close: () => {
      console.log('🔒 Окно оплаты закрыто')
    },
    is_recurrent: false,
    recurrent_url: null
  })

  widget.render()
}
</script>
