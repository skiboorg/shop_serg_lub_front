<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref } from 'vue'

const currentSlide = ref(0)
const {product_slug} = useRoute().params
const slideTo = (nextSlide) => (currentSlide.value = nextSlide)
const {$api} = useNuxtApp()

const product = useDataOrFail(await useAsyncData(() =>
    $api.repo.product(product_slug)
))

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: true,
  height: 600,
}
//console.log(product.value.images?.length * 100)
const thumbnailsConfig = {
  dir: 'ttb',
  height: product.value.images?.length * 103,//,
  itemsToShow: product.value.images?.length,
  wrapAround: false,
  touchDrag: true,
  //snapAlign: "center",
  gap:20
}


</script>

<template>
  <template v-if="!product">
    <div class="h-screen flex flex-col items-center justify-center">
      <ProgressSpinner/>
    </div>
  </template>
  <template v-else>
    <div class="container" >
      <div class="flex flex-wrap gap-3 text-sm mb-5 mt-10">
        <nuxt-link class="opacity-50" to="/">Главная</nuxt-link>
        <span>/</span>
        <nuxt-link class="opacity-50" :to="`/catalog?name=${product.cat_slug}`">{{product.cat_name}}</nuxt-link>
        <span>/</span>
        <span>{{product.name}}</span>
      </div>
      <Section >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div class="grid grid-cols-12 gap-5">
            <Carousel class="hidden md:block  md:col-span-4 lg:col-span-3 xl:col-span-2"  id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
              <Slide v-for="image in product.images" :key="image.id">
                <template #default="{ currentIndex, isActive }">
                  <div
                      :class="['thumbnail', { 'is-active': isActive }]"
                      @click="slideTo(currentIndex)"
                  >
                    <img :src="image.image"  alt="Thumbnail Image" class="thumbnail-image" />
                  </div>
                </template>
              </Slide>
            </Carousel>
            <Carousel class="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-10 h-[300px] md:h-full" id="gallery" v-bind="galleryConfig" v-model="currentSlide">
              <Slide v-for="image in product.images" :key="image.id">
                <img  :src="image.image" alt="Gallery Image" class="gallery-image w-full h-unset md:h-auto object-contain" />
              </Slide>
              <template #addons>
                <Navigation class="flex md:hidden"/>
              </template>
            </Carousel>

          </div>
          <div class="">
            <h1 class="font-semibold text-[22px] uppercase">{{product.name}}</h1>
            <p class="opacity-50 text-sm mb-7">Артикул: {{product.article}}</p>
            <p class="mb-7 text-[15px]">{{product.price}} ₽</p>
            <AddToCartBtn class="mb-7" :item_id="product.id" :can_add_to_cart="true" :show_button="true"/>
            <p class="text-sm opacity-50 mb-7" v-if="product.short_description">{{product.short_description}}</p>

            <Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
              <AccordionPanel value="1">
                <AccordionHeader>СВОЙСТВА</AccordionHeader>
                <AccordionContent>
                  <p class="m-0" v-html="product.editor_1"></p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="2">
                <AccordionHeader>ПРИМЕНЕНИЕ</AccordionHeader>
                <AccordionContent>
                  <p class="m-0" v-html="product.editor_2"></p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="3">
                <AccordionHeader>СОСТАВ</AccordionHeader>
                <AccordionContent>
                  <p class="m-0" v-html="product.editor_3"></p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="4">
                <AccordionHeader>ДОСТАВКА И ОПЛАТА</AccordionHeader>
                <AccordionContent>
                  <p class="m-0" v-html="product.editor_4"></p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="5">
                <AccordionHeader>РЕЗУЛЬТАТЫ ФОКУС-ГРУППЫ</AccordionHeader>
                <AccordionContent>
                  <p class="m-0" v-html="product.editor_5"></p>
                </AccordionContent>
              </AccordionPanel>

            </Accordion>
          </div>
        </div>
      </Section>


    </div>
    <PopularBlock />
  </template>



</template>

<style>


.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {

  width: 100%;
  height: 100%;
  object-fit: cover;
}





.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
.thumbnail-image {
  display: block;
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>