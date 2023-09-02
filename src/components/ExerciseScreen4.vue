<template>
  <div class="exercise">
    <h2>Select Your Favorite Categories</h2>

    <!-- Use ButtonGroup component for selecting favorite categories -->
    <button-group :buttons="secondSelectedOptions" :radioButton="true" @button-click="selectFavoriteCategory" />

    <!-- Textarea for motivation -->
    <textarea v-model="secondMotivation" placeholder="Explain your choice"></textarea>

    <!-- Button to advance to the next exercise, only clickable when textarea is not empty -->
    <button @click="advanceToNextExercise" :disabled="!secondMotivation.trim()">Next</button>
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup.vue';

export default {
  components: {
    ButtonGroup,
  },
  props: {
    secondSelectedOptions: Array, // Passed from App.vue
  },
  data() {
    return {
      secondFavoriteCategory: '', // Store the label of the selected category
      secondMotivation: '',
    };
  },
  methods: {
    selectFavoriteCategory(selectedCategory) {
    this.secondFavoriteCategory = selectedCategory;
  },
    advanceToNextExercise() {
      // Emit the selected favorite category and motivation
      this.$emit('exercise-4-complete', {
        secondFavoriteCategory: this.secondFavoriteCategory,
        secondMotivation: this.secondMotivation,
      });
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
