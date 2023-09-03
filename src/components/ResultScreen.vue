<template>
  <div class="result-screen">
    <div class="result-item">
        <h3>Je favoriete categorie uit Opdracht 2:</h3>
        <p><strong>Categorie:</strong> {{ getFirstFavoriteCategoryLabel }}</p>
        <p><strong>Motivatie:</strong> {{ appData.firstMotivation }}</p>
    </div>


    <div class="result-item">
      <h3>Je favoriete afbeelding uit Opdracht 5:</h3>
      <img :src="appData.favoriteImage" :alt="appData.favoriteImage" />
      <p><strong>Reason:</strong> {{ appData.imageMotivation }}</p>
    </div>

    <div class="result-item">
        <h3>De verdeling van de afbeeldingen:</h3>
        <ul>
            <li v-for="({ categoryLabel, count }) in sortedImageCounts" :key="categoryLabel">
            <b>{{ categoryLabel }}</b> - {{ count }} afbeeldingen
            </li>
        </ul>
    </div>



    <button @click="copyResults">Copy Results</button>
  </div>
</template>

<script>
export default {
  props: {
    appData: Object, // Passed from App.vue
  },
  computed: {
    getFirstFavoriteCategoryLabel() {
    const favoriteCategoryValue = this.appData.firstFavoriteCategory;
    const favoriteCategory = this.appData.firstOptions.find(option => option.value === favoriteCategoryValue);
    return favoriteCategory ? favoriteCategory.label : '';
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
    copyResults() {
        const results = `
            Favorite Category from Exercise 2: ${this.firstFavoriteCategoryLabel}
            Reason: ${this.appData.firstMotivation}

            Favorite Image from Exercise 5: ${this.appData.favoriteImage}
            Reason: ${this.appData.imageMotivation}

            Images Assigned to Each Category in Exercise 1:
            ${this.sortedImageCounts
            .map(({ categoryLabel, count }) => `${categoryLabel}: ${count} images`)
            .join('\n')}
        `;

        // Perform the action to copy/send the results
        // This could be done using the Clipboard API or sending an email, for example
        // For simplicity, let's just log the results to the console here
        console.log(results);
    },

  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
.result-screen {
  text-align: center;
  padding: 20px;
}

.result-item {
  margin-bottom: 20px;
}

img {
  max-width: 300px;
}
</style>
