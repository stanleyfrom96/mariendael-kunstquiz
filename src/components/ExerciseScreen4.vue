<template>
  <div class="exercise">
    <!-- Display images of the currently selected category -->
    <image-bar :images="selectedCategoryImages" :imageCounts="selectedCategoryImageCounts" />
    <!-- Use ButtonGroup component for selecting favorite categories -->
    <button-group
      :buttons="secondSelectedOptions"
      :radioButton="true"
      @button-click="selectFavoriteCategory"
    />

    <!-- Textarea for motivation -->
    <textarea v-model="secondMotivation" placeholder="Explain your choice"></textarea>


     <div class="button-container">
      <!-- Add a back button -->
      <button disabled>Terug</button>
      <button
        class="normal-button"
        @click="advanceToNextExercise"
        :disabled="!secondMotivation.trim()"
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
    secondSelectedOptions: Array, // Passed from App.vue
    images: Array, // Passed from App.vue
  },
  data() {
    return {
      secondFavoriteCategory: "", // Store the label of the selected category
      secondMotivation: "",
    };
  },
  computed: {
    // Create a computed property to filter images based on the selected category
    selectedCategoryImages() {
      if (!this.secondFavoriteCategory) {
        return [];
      }

      return this.images.filter((image) =>
        image.secondCategory === this.secondFavoriteCategory
      );
    },
    // Create a computed property to calculate image counts for each category
    selectedCategoryImageCounts() {
      const imageCounts = {};
      if (this.secondFavoriteCategory) {
        this.secondSelectedOptions.forEach((option) => {
          const category = option.value;
          const count = this.images.filter(
            (image) => image.secondCategory === category
          ).length;
          imageCounts[category] = count;
        });
      }
      return imageCounts;
    },
  },
  methods: {
    selectFavoriteCategory(selectedCategory) {
      this.secondFavoriteCategory = selectedCategory;
    },
    advanceToNextExercise() {
      // Emit the selected favorite category and motivation
      this.$emit("exercise-4-complete", {
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
