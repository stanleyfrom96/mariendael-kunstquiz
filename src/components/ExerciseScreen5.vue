<template>
  <div class="exercise">

    <!-- Display images -->
    <div class="image-grid" :style="{ gridTemplateColumns: gridColumns }">
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
    <textarea v-model="imageMotivation" placeholder="Leg je keuze uit..."></textarea>

    <div class="button-container">
      <!-- Add a back button -->
      <button class="normal-button" @click="goBack">Terug</button>
      
      <!-- Button to advance to the final results screen, only clickable when motivation is not empty -->
      <button class="normal-button" @click="advanceToSummary" :disabled="!imageMotivation.trim()">Volgende</button>
    </div>
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
      maxColumns: 8, // Maximum number of columns
    };
  },
  computed: {
    gridColumns() {
      // Calculate the grid columns dynamically based on the maximum number of columns
      const totalImages = this.imagesForSecondCategory.length;
      const columns = Math.min(this.maxColumns, totalImages);
      return `repeat(${columns}, 1fr)`;
    },
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
    goBack() {
      this.$emit('go-back');
    },
  },
};
</script>

<style scoped>
</style>
