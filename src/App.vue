<template>
  <div class="app">
    <h1>Mariendael Kunstquiz</h1>
    <div class="container">

      <h2 class="exercise-heading">Opdracht {{ currentExercise }}</h2>
      <h2 class="exercise-description">{{ currentExerciseHeading }}</h2>
      
      <component
      :is="currentExerciseComponent"
      :appData="appData"
      :images="appData.images"
      :firstOptions="appData.firstOptions"
      :firstSelectedOptions="appData.firstSelectedOptions"
      :secondOptions="appData.secondOptions"
      :secondSelectedOptions="appData.secondSelectedOptions"
      :imagesForFirstCategory="imagesForFirstCategory"
      :imagesForSecondCategory="imagesForSecondCategory"
      @exercise-complete="handleExerciseComplete"
      @assign-first-category="handleAssignFirstCategory"
      @exercise-2-complete="handleExercise2Complete"
      @assign-second-category="handleAssignSecondCategory"
      @exercise-4-complete="handleExercise4Complete"
      @exercise-5-complete="handleExercise5Complete"
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
    imagesForFirstCategory() {
      if (this.appData.firstFavoriteCategory) {
        return this.appData.images.filter(image => image.firstCategory === this.appData.firstFavoriteCategory);
      }
      return [];
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
    handleAssignFirstCategory(category, imageIndex) {
      // Update the selected category in appData for the corresponding image
      this.appData.images[imageIndex].firstCategory = category;

      // Find the corresponding option in firstOptions
      const selectedOption = this.appData.firstOptions.find(option => option.value === category);

      // Add the selected option to firstSelectedOptions (without duplicates)
      if (!this.appData.firstSelectedOptions.some(option => option.value === category)) {
        this.appData.firstSelectedOptions.push(selectedOption);
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

    handleAssignSecondCategory(category, imageIndex) {
      // Update the selected category in appData for the corresponding image
      this.appData.images[imageIndex].secondCategory = category;

      // Find the corresponding option in secondOptions
      const selectedOption = this.appData.secondOptions.find(option => option.value === category);

      // Add the selected option to secondSelectedOptions (without duplicates)
      if (!this.appData.secondSelectedOptions.some(option => option.value === category)) {
        this.appData.secondSelectedOptions.push(selectedOption);
      }
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
  },
};
</script>

<style>

body {
  margin: 0;
}


html {
  background-color: #eeefe8;
  text-align: center;
}


.app {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-family: Verdana;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


.container {
    background: white;
    padding: 2rem;
    border-radius: 2rem;
    flex-direction: column;
    display: flex;
    height: 100%;
    box-shadow: 0px 8px 20px 4px #16140e1a;
}

.exercise-heading {
  text-align: center;
  text-transform: uppercase;
  color: #e0007f;
}

.exercise-description {
  text-align: center;
  margin-top: 0;
  color: #B0A073;
  margin-bottom: 20px;
}

.exercise {
    display: flex;
    width: 100%;
    flex-grow: 1;
    flex-direction: column;
    gap: 3rem;
    align-items: stretch;
    justify-content: space-between;
}

.exercise {
  align-self: center;
}

img {
  height: 40%;
  max-height: 400px;
  max-width: 100%;
  object-fit: contain;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.image-grid img {
  height: 100%;
}

.image-item.selected {
    border: 3px solid #e0027f;
}

.button-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    flex-wrap: wrap;
}

@media (max-width: 780px) {
  .button-group {
    grid-template-columns: repeat(2, 1fr);
}
}


button {
  flex-grow: 1;
  border-radius: 1rem;
  border: none;
  background-color: #e0007f;
  color: white;
  padding-inline: 1.5rem;
  height: 3rem;
  max-height: 3rem;
  min-width: 10rem;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  filter: brightness(1.1);
}

textarea {
  flex-grow: 1;
  padding: 1rem;
  border-radius: 1rem;
}

.exercise button:active, .radio-button:focus {
  background-color: grey;
}

.progress-bar {
  text-align: center;
  margin: 0;
}
</style>
