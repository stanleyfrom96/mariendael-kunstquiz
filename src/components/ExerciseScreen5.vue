<template>
  <div class="exercise">

    <!-- Display images -->
    <div class="image-grid">
      <div
        v-for="(image, index) in imagesForSecondCategory"
        :key="index"
        class="image-item"
        :class="{ selected: favoriteImage === image.url }"
        @click="selectImage(image.url)"
      >
        <img :src="image.url" :alt="'Image ' + (index + 1)" />
      </div>
    </div>

    <!-- Textarea for motivation -->
    <textarea v-model="imageMotivation" placeholder="Explain your choice"></textarea>

    <!-- Button to advance to the final results screen, only clickable when motivation is not empty -->
    <button class="normal-button" @click="advanceToSummary" :disabled="!imageMotivation.trim()">Next</button>
  </div>
</template>

<script>
export default {
  props: {
    imagesForSecondCategory: Array, // Passed from App.vue
  },
  data() {
    return {
      favoriteImage: '', // Store the URL of the selected favorite image
      imageMotivation: '',
    };
  },
  methods: {
    selectImage(imageUrl) {
      this.favoriteImage = imageUrl;
    },
    advanceToSummary() {
      if (this.favoriteImage && this.imageMotivation) {
        // Emit the selected favorite image and motivation
        this.$emit('exercise-5-complete', {
          favoriteImage: this.favoriteImage,
          imageMotivation: this.imageMotivation,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
