<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="font-extrabold text-[#222328] text-[32px]">Create</h1>
      <p class="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
        Create imaginative and visually stunning images through DALL-E AI and
        share them with the community
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-16 max-w-3xl">
      <div class="flex flex-col gap-5">
        <FormField
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="John Doe"
          :value="form.name"
          :handleChange="handleChange"
        />
        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="an armchair in the shape of an avocado"
          :value="form.prompt"
          :handleChange="handleChange"
          :isSurpriseMe="true"
          :handleSurpriseMe="handleSurpriseMe"
        />

        <div
          class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center"
        >
          <img
            v-if="form.photo"
            :src="form.photo"
            :alt="form.prompt"
            class="w-full h-full object-contain"
          />
          <img
            v-else
            src="../assets/preview.png"
            alt="preview"
            class="w-9/12 h-9/12 object-contain opacity-40"
          />

          <div
            v-if="generatingImg"
            class="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg"
          >
            <AppLoader />
          </div>
        </div>
      </div>
      <div class="mt-5 flex gap-5">
        <button
          type="button"
          @click="generateImage"
          class="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {{ generatingImg ? 'Generating...' : 'Generate' }}
        </button>
      </div>

      <div class="mt-10">
        <p class="mt-2 text-[#666e75] text-[14px]">
          Once you have created the image you want, you can share it with others
          in the community
        </p>
        <button
          type="submit"
          class="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {{ loading ? 'Sharing...' : 'Share with the community' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import AppLoader from '../components/AppLoader.vue';
import FormField from '../components/FormField.vue';
import { getRandomPrompt } from '../utils';

export default {
  name: 'CreatePost',
  data() {
    return {
      form: {
        name: '',
        prompt: '',
        photo: '',
      },
      generatingImg: false,
      loading: false,
    };
  },
  components: { FormField, AppLoader },
  methods: {
    handleChange(e) {
      this.form = {
        ...this.form,
        [e.target.name]: e.target.value,
      };
    },
    async handleSubmit() {
      if (this.form.prompt && this.form.photo) {
        this.loading = true;
        try {
          const response = await fetch('http://localhost:8080/api/v1/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.form),
          });
          await response.json();
          this.$router.push('/');
        } catch (err) {
          alert(err);
        } finally {
          this.loading = false;
        }
      } else {
        alert('Please enter a prompt and generate an image');
      }
    },
    handleSurpriseMe() {
      const randomPrompt = getRandomPrompt(this.form.prompt);
      this.form = {
        ...this.form,
        prompt: randomPrompt,
      };
    },
    async generateImage() {
      if (this.form.prompt) {
        try {
          this.generatingImg = true;
          const response = await fetch('http://localhost:8080/api/v1/dalle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: this.form.prompt }),
          });

          const data = await response.json();
          this.form = {
            ...this.form,
            photo: `data:image/jpeg;base64,${data.photo}`,
          };
        } catch (error) {
          alert(error);
        } finally {
          this.generatingImg = false;
        }
      } else {
        alert('Please enter a prompt');
      }
    },
  },
};
</script>
