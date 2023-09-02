<template>
    <div class="exercise">
      
    <!-- Display progress tracker -->
    <p class="progress-bar">{{ currentIndex + 1 }} / {{ images.length }}</p>

    <!-- Display image -->
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
  },
  data() {
    return {
      currentIndex: 0,
      selectedFirstCategory: '',
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
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
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
