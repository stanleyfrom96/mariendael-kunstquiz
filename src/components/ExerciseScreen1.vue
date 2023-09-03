<template>
  <div class="exercise">
    <!-- Display progress tracker -->
    <p class="progress-bar">{{ currentIndex + 1 }} / {{ images.length }}</p>

    <!-- Preload the next n images in the background -->
    <div v-for="(nextImage, index) in nextImages" :key="index" style="display: none;">
      <img :src="nextImage.url" />
    </div>

    <!-- Display current image -->
    <img class="image" :src="currentImage.url" :alt="currentImage.firstCategory" />

    <!-- Use ButtonGroup component for categories -->
    <button-group class="button-group" :buttons="firstOptions" @button-click="assignFirstCategoryAndAdvance" />
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup.vue';

export default {
  components: {
    ButtonGroup,
  },
  props: {
    appData: Object, // Passed from App.vue
    images: Array, // Passed from App.vue
    firstOptions: Array, // Passed from App.vue
    preloadCount: Number, // Number of images to preload in advance
  },
  data() {
    return {
      currentIndex: 0,
      selectedFirstCategory: '',
      nextImages: [], // Array to hold the next images to preload
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  watch: {
    currentIndex() {
      // Update the array of next images to preload
      this.updateNextImages();
    },
  },
  created() {
    // Initialize the array of next images to preload
    this.updateNextImages();
  },
  methods: {
    assignFirstCategoryAndAdvance(category) {
      // Emit an event with the category and image index
      this.$emit('assign-first-category', category, this.currentIndex);

      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.$emit('exercise-complete', this.images); // Emit the categorized images
      }
    },
    updateNextImages() {
      this.nextImages = [];
      const startIndex = this.currentIndex + 1;
      for (let i = 0; i < this.preloadCount && startIndex + i < this.images.length; i++) {
        const nextIndex = startIndex + i;
        this.nextImages.push(this.images[nextIndex]);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
