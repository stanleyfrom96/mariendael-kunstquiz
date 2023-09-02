<template>
  <div class="exercise">

    <!-- Use ButtonGroup component for selecting favorite categories -->
    <button-group :buttons="firstSelectedOptions" :radioButton="true" @button-click="selectFavoriteCategory" />

    <!-- Textarea for motivation -->
    <textarea v-model="firstMotivation" placeholder="Explain your choice"></textarea>

    <!-- Button to advance to the next exercise, only clickable when textarea is not empty -->
    <button @click="advanceToNextExercise" :disabled="!firstMotivation.trim()">Next</button>
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup.vue';

export default {
  components: {
    ButtonGroup,
  },
  props: {
    firstSelectedOptions: Array, // Passed from App.vue
  },
  data() {
    return {
      firstFavoriteCategory: '', // Store the label of the selected category
      firstMotivation: '',
    };
  },
  methods: {
    selectFavoriteCategory(selectedCategory) {
    this.firstFavoriteCategory = selectedCategory;
  },
    advanceToNextExercise() {
      // Emit the selected favorite category and motivation
      this.$emit('exercise-2-complete', {
        firstFavoriteCategory: this.firstFavoriteCategory,
        firstMotivation: this.firstMotivation,
      });
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
