<template>

  <Button @click="initWidget"
          :loading="loading"
          severity="contrast"
          class="uppercase"
          :disabled="!email && !phone"
          fluid
          :label="`К оформлению ${cost} ₽`"/>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  cost: string | number
  email: string
  phone: string
  comment: string
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'success', orderId: string): void
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

  // Автоматическая генерация order_id
  const orderId = 'ORDER-' + Date.now().toString().slice(-5) // Можно заменить на UUID или другие схемы

  const widget = new window.LpWidget({
    name: 'Оплата заказа ' + orderId,
    cost: String(props.cost),
    key: 'h2+iB+hwVKc668QuePIeCwVE4vUBvyYDnGi0On7B4wc=',
    email: props.email,
    order_id: orderId,
    comment: props.comment,
    on_success: () => {
      console.log('✅ Оплата прошла успешно')
      emit('success', orderId)
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
