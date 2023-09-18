<template>
  <div class="exercise">
    <!-- Display progress tracker -->
    <p>{{ currentIndex + 1 }} / {{ imagesForFirstCategory.length }}</p>
    <!-- Display image -->
    <img :src="currentImage.url" :alt="currentImage.secondCategory" />

    <!-- Use ButtonGroup component for categories -->
    <button-group :buttons="secondOptions" @button-click="assignSecondCategoryAndAdvance" />


    <div class="button-container">
      <!-- Add a back button -->
      <button @click="goBack">Terug</button>
      <!-- Add a back button -->
      <button class="normal-button" disabled>Volgende</button>
    </div>
    
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
    firstFavoriteCategory: String,
    images: Array, // Passed from App.vue
    secondOptions: Array, // Passed from App.vue
    selectedFavoriteCategory: String,
  },
  data() {
    return {
      currentIndex: 0,
      selectedSecondCategory: '',
    };
  },
  computed: {
    currentImage() {
      return this.imagesForFirstCategory[this.currentIndex];
    },
    imagesForFirstCategory() {
      if (this.firstFavoriteCategory) {
        return this.images.filter(image => image.firstCategory === this.appData.firstFavoriteCategory);
      }
      return [];
    },
  },
  methods: {
    assignSecondCategoryAndAdvance(category) {
      // Get the current image
      const currentImage = this.currentImage;

      // Assign the category to the current image based on its URL
      currentImage.secondCategory = category;

      // Emit an event with the category and image URL
      this.$emit('assign-second-category', category, currentImage.url);

      if (this.currentIndex < this.imagesForFirstCategory.length - 1) {
        this.currentIndex++;
      } else {
        this.$emit('exercise-complete'); 
      }
    },
    // Add a method to go back one exercise
    goBack() {
      this.$emit('go-back');
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
