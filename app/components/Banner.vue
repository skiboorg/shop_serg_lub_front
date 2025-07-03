<script setup lang="ts">
import {Carousel, Pagination, Slide} from "vue3-carousel";
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 3000,
  pauseAutoplayOnHover: true,
  //slideEffect:'fade'
}
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})
const is_mobile = breakpoints.between('mobile', 'tablet')

</script>

<template>
  <div class="mb-10">
<!--    <Carousel class="py-0" v-bind="carouselConfig">-->
<!--      <Slide v-for="slide in 10" :key="slide">-->
<!--        <div class="h-[768px] flex flex-col items-center justify-center">-->
<!--          &lt;!&ndash;        <div&ndash;&gt;-->
<!--          &lt;!&ndash;            class="absolute inset-0 bg-cover bg-center"&ndash;&gt;-->
<!--          &lt;!&ndash;            :style="`background-image: url(${slide.image})`"&ndash;&gt;-->
<!--          &lt;!&ndash;        ></div>&ndash;&gt;-->
<!--          <div-->
<!--              class="absolute inset-0 bg-cover bg-center"-->
<!--              :style="`background-image: url(/b1.png)`"-->
<!--          ></div>-->
<!--          <div class="z-10 text-center">-->
<!--            <p class="mb-5 font-bold text-white text-lg uppercase">Гляссе для губ</p>-->
<!--            <a href="">-->
<!--              <Button label="ПЕРЕЙТИ К ПОКУПКАМ" severity="secondary" icon-pos="right" icon="pi pi-arrow-right"/>-->
<!--            </a>-->
<!--          </div>-->

<!--        </div>-->
<!--      </Slide>-->
<!--    </Carousel>-->

    <video autoplay loop muted>
      <source :src="is_mobile ? '/sm.mp4' :  '/lg.mp4'" type="video/mp4">

    </video>
  </div>

</template>

<style scoped>

</style>