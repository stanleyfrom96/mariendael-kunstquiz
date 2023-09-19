<template>
  <div class="result-screen">
    <h3 class="name">{{ userName }} {{ userLastName }}</h3>
    <div class="result-item">
      <h3 class="item-header">Favoriete Categorieën</h3>
        <p><strong>{{ getFirstFavoriteCategoryLabel }}</strong>, omdat: {{ appData.firstMotivation }} </p>
        <p><strong>{{ getSecondFavoriteCategoryLabel }}</strong>, omdat: {{ appData.secondMotivation }} </p>
    </div>

    <div class="result-item image-item">
        <h3 class="item-header">Favoriete Afbeelding</h3>
        <div class="image-container">
          <img :src="appData.favoriteImage" :alt="appData.favoriteImage" />
        </div>
        <p><strong>Motivatie:</strong> {{ appData.imageMotivation }}</p>
    </div>

    <div class="result-item">
        <h3 class="item-header">De Verdeling</h3>
        <ul>
            <li v-for="({ categoryLabel, count }) in sortedImageCounts" :key="categoryLabel">
            <b>{{ categoryLabel }}</b> had {{ count }} {{ count === 1 ? 'afbeelding' : 'afbeeldingen' }}
            </li>
        </ul>
    </div>

    <!-- Add input fields for name and last name -->
    <div class="user-info">
      <input type="text" id="name" placeholder="Voornaam" v-model="userName" />
      <input type="text" id="lastName" placeholder="Achternaam" v-model="userLastName" />
    </div>
    <div class="button-container">
      <!-- Disable the share button if name or last name is empty -->
      <button @click="captureAndShare" :disabled="userName === '' || userLastName === ''">Download resultaten</button>
    </div>

  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      userName: '',       // User's name
      userLastName: '',   // User's last name
      // ... Your other data properties ...
    };
  },
  props: {
    appData: Object, // Passed from App.vue
  },
  computed: {
    getFirstFavoriteCategoryLabel() {
    const favoriteCategoryValue = this.appData.firstFavoriteCategory;
    const favoriteCategory = this.appData.firstOptions.find(option => option.value === favoriteCategoryValue);
    return favoriteCategory ? favoriteCategory.label : '';
  },
   getSecondFavoriteCategoryLabel() {
    const secondFavoriteCategoryValue = this.appData.secondFavoriteCategory; // Replace with your actual data property
    const secondFavoriteCategory = this.appData.secondOptions.find(option => option.value === secondFavoriteCategoryValue);
    return secondFavoriteCategory ? secondFavoriteCategory.label : '';
  },
  sortedImageCounts() {
    const counts = {};
    this.appData.images.forEach(image => {
      if (image.firstCategory) {
        counts[image.firstCategory] = (counts[image.firstCategory] || 0) + 1;
      }
    });

    // Sort the image counts from most images to least and map to include category labels
    const sortedCounts = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({
        categoryLabel: this.appData.firstOptions.find(option => option.value === category).label,
        count,
      }));

    return sortedCounts;
  },
},

  methods: {
    async captureAndShare() {
      if (this.userName === '' || this.userLastName === '') {
        // Check if name and last name are empty, and prevent capturing if they are
        return;
      }

      // Hide the entire user-info section before capturing
      const userInfoSection = document.querySelector('.user-info');
      const originalUserInfoDisplay = userInfoSection.style.display;
      userInfoSection.style.display = 'none';
      const buttonContainerSection = document.querySelector('.button-container');
      const originalButtonContainerDisplay = buttonContainerSection.style.display;
      buttonContainerSection.style.display = 'none';

      // Capture the result section as an image
      const resultSection = document.getElementById('result-section');
      const canvas = await html2canvas(resultSection);

      // Restore the display property of the user-info section
      userInfoSection.style.display = originalUserInfoDisplay;
      buttonContainerSection.style.display = originalButtonContainerDisplay;

      // Convert the canvas to a data URL
      const imageDataUrl = canvas.toDataURL('image/png');

      // Create a download link with a filename that includes the user's names
      const fileName = `Kunstquiz_${this.userName}_${this.userLastName}.png`;
      const downloadLink = document.createElement('a');
      downloadLink.href = imageDataUrl;
      downloadLink.download = fileName;
      downloadLink.click();
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
h3 {
  margin-top: 0;
}

.user-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.user-info input {
  width: auto;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
}
</style>
