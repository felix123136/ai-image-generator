<template>
  <header
    class="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
  >
    <RouterLink to="/">
      <img src="./assets/logo.svg" alt="logo" class="w-28 object-contain" />
    </RouterLink>
    <RouterLink
      to="/create-post"
      class="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >Create
    </RouterLink>
  </header>
  <main class="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
    <RouterView />
  </main>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router';

export default {
  name: 'App',
  components: { RouterView },
};
</script>
