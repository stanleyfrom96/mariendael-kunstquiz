<template>
  <div class="app">
    <h1>Mariendael Kunstquiz v1</h1>
    <div class="container">

      <h2 v-if="currentExercise != 'summary'" class="exercise-heading">Opdracht {{ currentExercise }}</h2>
      <h2 class="exercise-description">{{ currentExerciseHeading }}</h2>
      
      <component
      :is="currentExerciseComponent"
      :appData="appData"
      :images="appData.images"
      :firstOptions="appData.firstOptions"
      :firstSelectedOptions="appData.firstSelectedOptions"
      :secondOptions="appData.secondOptions"
      :secondSelectedOptions="appData.secondSelectedOptions"
      :firstFavoriteCategory="appData.firstFavoriteCategory"
      :imagesForSecondCategory="imagesForSecondCategory"
      :preloadCount="10"
      @exercise-complete="handleExerciseComplete"
      @assign-first-category="handleAssignFirstCategory"
      @exercise-2-complete="handleExercise2Complete"
      @assign-second-category="handleAssignSecondCategory"
      @exercise-4-complete="handleExercise4Complete"
      @exercise-5-complete="handleExercise5Complete"
      @go-back="goBackOneExercise"
      />
    </div>
  </div>
</template>

<script>
import ExerciseScreen1 from './components/ExerciseScreen1.vue';
import ExerciseScreen2 from './components/ExerciseScreen2.vue';
import ExerciseScreen3 from './components/ExerciseScreen3.vue';
import ExerciseScreen4 from './components/ExerciseScreen4.vue';
import ExerciseScreen5 from './components/ExerciseScreen5.vue';
import ResultScreen from './components/ResultScreen.vue';
import { imageUrls } from './imageLoader';
import options from './assets/options.json'; // Import the JSON file
import './styles.css'; // Import your CSS file

export default {
  components: {
    ExerciseScreen1,
    ExerciseScreen2,
    ExerciseScreen3,
    ExerciseScreen4,
    ExerciseScreen5,
    ResultScreen,
  },
  data() {
    const shuffledImageUrls = imageUrls.slice().sort(() => Math.random() - 0.5);
    
    return {
      currentExercise: 1,
      appData: {
        images: shuffledImageUrls.map(url => ({
          url,
          firstCategory: null,
          secondCategory: null,
        })),
        firstOptions: options.firstOptions,
        firstSelectedOptions: [], // Initialize with empty options
        firstFavoriteCategory: '',
        firstMotivation: '',
        firstImageSelection: [],
        secondOptions: options.secondOptions,
        secondSelectedOptions: [], // Initialize with empty options
        secondFavoriteCategory: '',
        secondMotivation: '',
        secondImageSelection: [],
        favoriteImage: '',
        imageMotivation: '',
      },
    };
  },
  computed: {
    currentExerciseComponent() {
      // Define mapping between exercise numbers and component names
      const componentMap = {
        1: 'ExerciseScreen1',
        2: 'ExerciseScreen2',
        3: 'ExerciseScreen3',
        4: 'ExerciseScreen4',
        5: 'ExerciseScreen5',
        summary: 'ResultScreen',
      };

      return componentMap[this.currentExercise];
    },
    imagesForSecondCategory() {
      if (this.appData.secondFavoriteCategory) {
        return this.appData.images.filter(image => image.secondCategory === this.appData.secondFavoriteCategory);
      }
      return [];
    },
    currentExerciseHeading() {
      switch (this.currentExercise) {
        case 1:
          return 'Categoriseer de afbeeldingen';
        case 2:
          return 'Selecteer een categorie om dieper op in te gaan';
        case 3:
          return 'Sorteer de afbeeldingen onder de volgende categorieën';
        case 4:
          return 'Kies hieruit de categorie die je het meest aanspreekt';
        case 5:
          return 'Kies de afbeelding die het meest met je doet';
        // ... add headings for other exercises ...
        case 'summary':
          return 'Het Resultaat';
        default:
          return 'Onbekende Opdracht';
      }
    },
  },
  methods: {
    handleAssignFirstCategory(category, imageUrl) {
      // Find the image with the matching URL
      const matchingImage = this.appData.images.find(image => image.url === imageUrl);

      if (matchingImage) {
        // Update the selected category in appData for the matching image
        matchingImage.firstCategory = category;
      }

      // Find the corresponding option in firstOptions
      const selectedOption = this.appData.firstOptions.find(option => option.value === category);

      // Add the selected option to firstSelectedOptions (without duplicates)
      if (!this.appData.firstSelectedOptions.some(option => option.value === category)) {
        this.appData.firstSelectedOptions.push(selectedOption);
      }
    },
    handleAssignSecondCategory(category, imageUrl) {
      // Find the image with the matching URL
      const matchingImage = this.appData.images.find(image => image.url === imageUrl);

      if (matchingImage) {
        // Update the selected category in appData for the matching image
        matchingImage.secondCategory = category;
      }

      // Find the corresponding option in secondOptions
      const selectedOption = this.appData.secondOptions.find(option => option.value === category);

      // Add the selected option to secondSelectedOptions (without duplicates)
      if (!this.appData.secondSelectedOptions.some(option => option.value === category)) {
        this.appData.secondSelectedOptions.push(selectedOption);
      }
    },
     handleExercise2Complete({ firstFavoriteCategory, firstMotivation }) {
      // Update the corresponding properties in the appData object
      this.appData.firstFavoriteCategory = firstFavoriteCategory; // Example: "Category 2"
      this.appData.firstMotivation = firstMotivation;
      
      // Update firstImageSelection based on firstFavoriteCategory
      this.appData.firstImageSelection = this.appData.images.filter(image => image.firstCategory === firstFavoriteCategory.value);

      this.currentExercise++;
    },
    handleExercise4Complete({ secondFavoriteCategory, secondMotivation }) {
      // Update the corresponding properties in the appData object
      this.appData.secondFavoriteCategory = secondFavoriteCategory; // Example: "Category B"
      this.appData.secondMotivation = secondMotivation;

      // Update secondImageSelection based on secondFavoriteCategory
      this.appData.secondImageSelection = this.appData.images.filter(image => image.secondCategory === secondFavoriteCategory.value);

      this.currentExercise++;
    },

    handleExercise5Complete({ favoriteImage, imageMotivation }) {
      // Update the corresponding properties in the appData object
      this.appData.favoriteImage = favoriteImage;
      this.appData.imageMotivation = imageMotivation;

      // Advance to the result summary screen
      this.currentExercise = 'summary';
    },
    handleExerciseComplete() {
      this.currentExercise++;
    },
    goBackOneExercise() {
      if (this.currentExercise > 1) {
        this.currentExercise--;
      }
    },
  },
};
</script>