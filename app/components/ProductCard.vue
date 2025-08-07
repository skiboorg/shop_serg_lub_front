<script setup lang="ts">
import AddToCartBtn from "~/components/AddToCartBtn.vue";

const props = defineProps(['item','can_add_to_cart'])

const isHovered = ref(false)
const isMobile = ref(false)
const shouldShowVideo = ref(false)

onMounted(() => {
  isMobile.value = /Mobi|Android|iPhone/i.test(navigator.userAgent)
})

function handleMouseEnter() {
  if (!isMobile.value && props.item?.video) {
    shouldShowVideo.value = true
  }
}

function handleMouseLeave() {
  if (!isMobile.value) {
    shouldShowVideo.value = false
  }
}

function handleClick() {
  if (isMobile.value && props.item?.video) {
    shouldShowVideo.value = !shouldShowVideo.value
  }
}
</script>

<!--<template>-->
<!--  <div>-->
<!--  <nuxt-link :to="`/catalog/${item?.slug}`">-->
<!--    <img class="block mb-6 w-full h-auto object-cover" :src="item?.image" alt="">-->
<!--    <p class="uppercase font-semibold mb-3">{{item?.name}}</p>-->
<!--    <p class="text-sm opacity-70 mb-6">{{item?.price}}₽</p>-->
<!--  </nuxt-link>-->
<!--   <AddToCartBtn :item_id="item.id" :show_button="true" :can_add_to_cart="can_add_to_cart"/>-->
<!--  </div>-->


<!--</template>-->
<template>
  <div
      class="relative group"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
  >

      <template v-if="item?.video && shouldShowVideo">
        <video
            :src="item.video"
            autoplay
            muted
            loop
            playsinline
            class="block mb-6 w-full h-[367px] md:h-[451px] object-cover"
        ></video>
      </template>
      <template v-else>
        <div class="relative mb-6">
          <img
              class="block  w-full h-auto object-cover "
              :src="item?.image"
              :alt="item?.name"
          />
          <!-- Иконка Play -->
<!--          <div-->
<!--              v-if="item?.video"-->
<!--              class="absolute inset-0 flex items-center justify-center "-->
<!--          >-->
<!--            <div-->
<!--                class="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center"-->
<!--            >-->
<!--              <svg-->
<!--                  class="w-6 h-6 text-white"-->
<!--                  fill="currentColor"-->
<!--                  viewBox="0 0 20 20"-->
<!--              >-->
<!--                <path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M6.5 5.5a.5.5 0 0 1 .79-.407l6 4a.5.5 0 0 1 0 .814l-6 4A.5.5 0 0 1 6 13.5v-8a.5.5 0 0 1 .5-.5z"-->
<!--                    clip-rule="evenodd"-->
<!--                />-->
<!--              </svg>-->
<!--            </div>-->
<!--          </div>-->
        </div>

      </template>
    <nuxt-link :to="`/catalog/${item?.slug}`" class="block relative">
      <p class="uppercase font-semibold mb-3 border-b border-black inline-block">{{ item?.name }}</p>
      <p class="text-sm opacity-70 mb-6">{{ item?.price }}₽</p>
    </nuxt-link>

    <AddToCartBtn
        :item_id="item.id"
        :show_button="true"
        :can_add_to_cart="can_add_to_cart"
    />
  </div>
</template>


<style scoped>

</style>