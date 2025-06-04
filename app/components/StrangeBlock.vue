<script setup lang="ts">
import {Carousel, Pagination, Slide} from "vue3-carousel";
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 3000,
  pauseAutoplayOnHover: true,
  //slideEffect:'fade'
}
</script>

<template>
<Section>
  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-16">
      <div class="flex lg:flex-col justify-between lg:items-start lg:justify-start">
        <h2 class="text-2xl font-semibold mb-12" >БЛЕСК, КОТОРЫЙ<br>ПРИТЯГИВАЕТ<br>ВЗГЛЯДЫ</h2>


        <NuxtLink  to="/">
          <img class="mb-2" src="~/assets/images/strange/title_bottom.jpg" alt="">
          <span class="uppercase text-sm font-semibold border-b border-black">meowgloss</span>
        </NuxtLink>
      </div>
      <StrangeCard class="hidden lg:block" title="Максимум увлажнения"
                    text="Питает и предотвращает сухость благодаря пептидам SpecPed® и маслам в составе"
                   image="/strange/1.jpg"
      />
      <p></p>
      <StrangeCard class="hidden lg:block" title="Не липкий"
                   text="Блеск легкий по текстуре и совсем<br>не липкий — никаких склеенных губ"
                   image="/strange/3.jpg"
      />
    </div>
    <div class="hidden lg:grid grid-cols-1 md:grid-cols-4 gap-5 mb-16">
      <p></p>
      <p></p>
      <StrangeCard title="Не растекается"
                   text="Эта богатая смягчающим веществом, незернистая формула сочетает в себе "
                   image="/strange/2.jpg"
      />
      <p></p>
    </div>
    <div class="hidden lg:grid grid-cols-12  gap-5">
      <div class="col-span-7 justify-self-end">
        <StrangeCard title="Не растекается"
                     text="Пептид восттанавливает структуру кожи<br>губ, поддерживая барьерные функции кожи"
                     image="/strange/1.jpg"
        />
      </div>
      <div class="col-span-5 justify-self-end">
        <StrangeCard title="Сладкий на вкус"
                     text="Блеск сладкий на вкус за счет<br>содержания стевии в составе"
                     image="/strange/3.jpg"
        />
      </div>
    </div>
  </div>
  <div class="container block lg:hidden py-0">
    <Carousel  v-bind="carouselConfig">
      <Slide > <StrangeCard title="Максимум увлажнения"
                            text="Питает и предотвращает сухость благодаря пептидам SpecPed® и маслам в составе"
                            image="/strange/1.jpg"
      /></Slide>

      <Slide ><StrangeCard title="Не липкий"
                           text="Блеск легкий по текстуре и совсем<br>не липкий — никаких склеенных губ"
                           image="/strange/3.jpg"
      /></Slide>

      <Slide ><StrangeCard title="Не растекается"
                           text="Эта богатая смягчающим веществом, незернистая формула сочетает в себе "
                           image="/strange/2.jpg"
      /></Slide>

      <Slide ><StrangeCard title="Не растекается"
                           text="Пептид восттанавливает структуру кожи<br>губ, поддерживая барьерные функции кожи"
                           image="/strange/1.jpg"
      /></Slide>

      <Slide ><StrangeCard title="Сладкий на вкус"
                           text="Блеск сладкий на вкус за счет<br>содержания стевии в составе"
                           image="/strange/3.jpg"
      /></Slide>


    </Carousel>
  </div>

</Section>
</template>

<style scoped>

</style>