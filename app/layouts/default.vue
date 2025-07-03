<script setup lang="ts">
useSeoMeta({
  title: 'NotCatArt - фирменный магазин косметики от Сергея Любимова',
  ogTitle: 'Качественные товары собственного производства для создания и подчеркивания вашего индивидуального образа. Создай свой стиль!',
})
</script>

<template>
  <Header/>
  <slot/>
  <Footer/>
  <Toast position="bottom-right" />
</template>
