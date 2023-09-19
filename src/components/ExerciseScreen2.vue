<template>
  <div class="exercise">
    <!-- Display images of the currently selected category -->
    <image-bar :images="selectedCategoryImages" />
    <!-- Use ButtonGroup component for selecting favorite categories -->
    <button-group
      :buttons="firstSelectedOptionsWithCounts"
      :radioButton="true"
      @button-click="selectFavoriteCategory"
    />

    <!-- Textarea for motivation -->
    <textarea v-model="firstMotivation" placeholder="Leg je keuze uit..."></textarea>


    <div class="button-container">
      <!-- Add a back button -->
      <button class="normal-button" disabled>Terug</button>
      <button
        class="normal-button"
        @click="advanceToNextExercise"
        :disabled="!firstMotivation.trim()"
      >
        Volgende
      </button>
    </div>
    <!-- Button to advance to the next exercise, only clickable when textarea is not empty -->
    
  </div>
</template>

<script>
import ButtonGroup from "@/components/ButtonGroup.vue";
import ImageBar from "@/components/ImageBar.vue";

export default {
  components: {
    ButtonGroup,
    ImageBar,
  },
  props: {
    firstSelectedOptions: Array, // Passed from App.vue
    images: Array, // Your array of images goes here
  },
  data() {
    return {
      firstFavoriteCategory: "", // Store the label of the selected category
      firstMotivation: "",
    };
  },
  computed: {
    firstSelectedOptionsWithCounts() {
      // Add image counts to each category option
      return this.firstSelectedOptions.map((option) => ({
        label: option.label + ` (${this.getCategoryImageCount(option.value)})`,
        value: option.value,
      }));
    },
    // Create a computed property to filter images based on the selected category
    selectedCategoryImages() {
      if (!this.firstFavoriteCategory) {
        return [];
      }

      return this.images.filter((image) =>
        image.firstCategory === this.firstFavoriteCategory
      );
    },
  },
  methods: {
    selectFavoriteCategory(selectedCategory) {
      this.firstFavoriteCategory = selectedCategory;
    },
    advanceToNextExercise() {
      // Emit the selected favorite category and motivation
      this.$emit("exercise-2-complete", {
        firstFavoriteCategory: this.firstFavoriteCategory,
        firstMotivation: this.firstMotivation,
      });
    },
    getCategoryImageCount(categoryValue) {
      return this.images.filter((image) => image.firstCategory === categoryValue).length;
    },
  },
  created() {
    console.log('Images received in ExerciseScreen1:', this.images);
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */

</style>
