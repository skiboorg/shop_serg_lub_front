<script setup lang="ts">
const delivery = [
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
]

const payment = [
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
]

const ret = [
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
]

const faq = [
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
]
</script>

<template>
<div class="container mt-4">
  <img class="mb-12" src="https://placehold.co/1920x300" alt="">
  <div class="flex gap-3 text-sm mb-16">
    <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
    <span>/</span>
    <span>Покупателям</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <div class="col-span-3">
      <div class="flex flex-col items-start gap-3">
        <a href="#delivery" class="uppercase font-semibold">доставка</a>
        <a href="#payment" class="uppercase font-semibold">Оплата и заказ</a>
        <a href="#return" class="uppercase font-semibold">возврат товара</a>
        <a href="#faq" class="uppercase font-semibold">вопросы о продукте</a>
      </div>

    </div>
    <div class="col-span-9">
      <div id="delivery" class="mb-14">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">Доставка</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in delivery" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{item.a}}</p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
      <div id="payment" class="mb-14">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">Оплата и заказ</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in payment" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{item.a}}</p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
      <div id="return" class="mb-14">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">возврат товара</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in ret" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{item.a}}</p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
      <div id="faq" class="">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">вопросы о продукте</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in faq" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
              <p class="m-0">{{item.a}}</p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>