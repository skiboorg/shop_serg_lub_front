<script setup lang="ts">
const delivery = [
  {q:'Какие способы доставки вашей продукции при заказе?',a:'Мы можем доставить товары разными способами:<br>' +
        '1) Курьерская служба склада Продавца<br>' +
        '2) Курьерские службы Партнеров: EMS Почта РФ,  Курьер Онлайн (Почта РФ),  Курьерская доставка TopDelivery, Курьерская доставка CDEK, Курьерская доставка CSE,  Курьерская доставка DPD<br>' +
        '3) Пункты выдачи Партнеров: Самовывоз BOXBERRY, Самовывоз CDEK, 5 Post (Пятерочка) - ПОСТАМАТ, 5 Post (Пятерочка) - Выдача на кассе'},
  {q:'Как расчитывается стоимость доставки?',a:'Стоимость доставки товаров notcatart.com зависит о ценовой политики служб-партнеров notcatart.com и\n' +
        'определяются ими индивидуально. При оформлении покупки товаров на сайте notcatart.com покупатель вправе самостоятельно выбирать способ доставки товара и службу доставки в зависимости от предоставленной стоимости на услугу доставки компаниями-партнерами.'},
  {q:'Какие способы оплаты вы принимаете?',a:'На сайте предусмотрена оплата банковской картой напрямую через интернет-эквайринг.\n' +
        'Напоминаем, что в соответствии с положением ЦБ РФ «Об эмиссии банковских карт и об операциях, совершаемых с\n' +
        'использованием платежных карт» от 24. 12.2004 Ne 266-П операции по банковским картам совершаются\n' +
        'держателем карты либо уполномоченным им лицом.'},
  {q:'Какая у вас ценовая политика?',a:'Цена Товара, реализуемого в Интернет-магазине notcatart.com, указывается в рублях Российской\n' +
        'Федерации и включает в себя налог на добавленную стоимость. Цена Товара на Сайте может быть\n' +
        'изменена Продавцом в одностороннем порядке. При этом цена на заказанный Покупателем Товар\n' +
        'изменению не подлежит.'},
  {q:'Как происходит оплата картой?',a:'Авторизация операций по банковским картам осуществляется банком. Если у банка есть основания\n' +
        'полагать, что операция носит мошеннический характер, то банк вправе отказать в осуществлении\n' +
        'данной операции. Мошеннические операции с банковскими картами попадают под действие статьи 159\n' +
        'УК РФ.\n' +
        '\n' +
        'Во избежание случаев различного рода неправомерного использования банковских карт при оплате все\n' +
        'Заказы, оформленные на Сайте и предоплаченные банковской картой, проверяются в целях проверки\n' +
        'личности владельца и его правомочности на использование карты.\n' +
        '\n' +
        'При оплате заказа на Сайте, денежные средства списываются в размере суммы, указанной при\n' +
        'оформлении заказа. Для Покупателя это выглядит как обычное списание денежных средств за покупку.\n' +
        'При настроенных уведомлениях от банка придет пуш или смс о списании денежных средств.\n' +
        '\n' +
        'При доставке Товара «Палетка или Палетки» общая стоимость Товара подлежит автоматическому\n' +
        'увеличению на стоимость доставки.' +
        'УК РФ.'},
  {q:'xxx',a:'xxx'},
  {q:'xxx',a:'xxx'},
]


const ret = [
  {q:'Как я могу вернуть товар?',a:'Согласно Постановлению Правительства РФ No 55 от 19.01.1998, парфюмерно-косметические товары\n' +
        'надлежащего качества не подлежат обмену или возврату.'},
  {q:'Что делать, если мне пришел поврежденный товар?',a:'Свяжитесь с нами по указанным ниже контактам для решения вашей ситуации! Будьте готовы назвать ФИО заказчика и номер заказа.'},
  {q:'Как я могу связаться со службой поддержки?',a:'В футере (подвале) сайта указаны наши контактные данные - номер телефона, whatsapp и telegram.'},
  {q:'xxx',a:'xxx'},
]

// const faq = [
//   {q:'xxx',a:'xxx'},
//   {q:'xxx',a:'xxx'},
//   {q:'xxx',a:'xxx'},
//   {q:'xxx',a:'xxx'},
// ]
</script>

<template>
<div class="container mt-4">
  <img class="mb-12" src="~assets/images/cus.png" alt="">
  <div class="flex gap-3 text-sm mb-16">
    <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
    <span>/</span>
    <span>Покупателям</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-12">
    <div class="col-span-3">
      <div class="flex flex-col items-start gap-3">
        <a href="#delivery" class="uppercase font-semibold">ДОСТАВКА И ОПЛАТА</a>
<!--        <a href="#payment" class="uppercase font-semibold">Оплата и заказ</a>-->
        <a href="#return" class="uppercase font-semibold">возврат товара</a>
<!--        <a href="#faq" class="uppercase font-semibold">вопросы о продукте</a>-->
      </div>

    </div>
    <div class="col-span-9">
      <div id="delivery" class="mb-14">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">ДОСТАВКА И ОПЛАТА</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in delivery" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
              <p class="m-0" v-html="item.a"></p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
<!--      <div id="payment" class="mb-14">-->
<!--        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">Оплата и заказ</p>-->
<!--        <Accordion >-->
<!--          <AccordionPanel v-for="(item,index) in payment" :value="index">-->
<!--            <AccordionHeader>{{item.q}}</AccordionHeader>-->
<!--            <AccordionContent>-->
<!--               <p class="m-0" v-html="item.a"></p>-->
<!--            </AccordionContent>-->
<!--          </AccordionPanel>-->

<!--        </Accordion>-->
<!--      </div>-->
      <div id="return" class="mb-14">
        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">возврат товара</p>
        <Accordion >
          <AccordionPanel v-for="(item,index) in ret" :value="index">
            <AccordionHeader>{{item.q}}</AccordionHeader>
            <AccordionContent>
               <p class="m-0" v-html="item.a"></p>
            </AccordionContent>
          </AccordionPanel>

        </Accordion>
      </div>
<!--      <div id="faq" class="">-->
<!--        <p class="text-lg md:text-2xl uppercase font-semibold mb-5">вопросы о продукте</p>-->
<!--        <Accordion >-->
<!--          <AccordionPanel v-for="(item,index) in faq" :value="index">-->
<!--            <AccordionHeader>{{item.q}}</AccordionHeader>-->
<!--            <AccordionContent>-->
<!--               <p class="m-0" v-html="item.a"></p>-->
<!--            </AccordionContent>-->
<!--          </AccordionPanel>-->

<!--        </Accordion>-->
<!--      </div>-->
    </div>
  </div>
</div>
</template>

<style scoped>

</style>