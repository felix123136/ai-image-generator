<template>
  <div
    class="rounded-xl group relative shadow-card hover:shadow-cardhover card"
  >
    <img
      :src="post.photo"
      :alt="post.prompt"
      class="w-full h-auto object-cover rounded-xl"
    />
    <div
      class="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
    >
      <p class="text-white text-md overflow-y-auto prompt">{{ post.prompt }}</p>

      <div class="mt-5 flex justify-between items-center gap-2">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold"
          >
            {{ post.name[0] }}
          </div>
          <p class="text-white text-sm">{{ post.name }}</p>
        </div>
        <button
          type="button"
          @click="downloadImage(post._id, post.photo)"
          class="outline-none bg-transparent border-none"
        >
          <img
            src="../assets/download.png"
            alt="download"
            class="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { downloadImage } from '../utils';
export default {
  name: 'AppCard',
  props: ['post'],
  methods: { downloadImage },
};
</script>
