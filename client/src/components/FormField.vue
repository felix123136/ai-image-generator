<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <label :for="name" class="block text-sm font-medium text-gray-900">
        {{ labelName }}
      </label>
      <button
        v-if="isSurpriseMe"
        type="button"
        @click="handleSurpriseMe"
        class="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
      >
        Surprise Me
      </button>
    </div>
    <input
      :type="type"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @change="handleChange"
      required
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
    />
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: [
    'labelName',
    'type',
    'name',
    'placeholder',
    'isSurpriseMe',
    'handleSurpriseMe',
    'value',
    'handleChange',
  ],
};
</script>
