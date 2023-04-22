<template>
  <AppCard v-for="post in data" :key="post._id" :post="post" />

  <h2
    v-if="!data.length"
    class="mt-5 font-bold text-[#6469ff] text-xl uppercase"
  >
    {{ title }}
  </h2>
</template>

<script>
import AppCard from './AppCard.vue';

export default {
  name: 'RenderCards',
  props: ['data', 'title'],
  components: { AppCard },
};
</script>
