<template>
  <div class="exercise">
    <!-- Display progress tracker -->
    <p>{{ currentIndex + 1 }} / {{ imagesForFirstCategory.length }}</p>
    <!-- Display image -->
    <img :src="currentImage.url" :alt="currentImage.secondCategory" />

    <!-- Use ButtonGroup component for categories -->
    <button-group :buttons="secondOptions" @button-click="assignSecondCategoryAndAdvance" />
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
    imagesForFirstCategory: Array, // Passed from App.vue
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
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
