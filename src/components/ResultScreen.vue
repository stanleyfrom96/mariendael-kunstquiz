<template>
  <div class="result-screen" id="pdf-content">
    <div class="result-item">
        <h3>Je favoriete categorie uit Opdracht 2:</h3>
        <h4><strong>{{ getFirstFavoriteCategoryLabel }}</strong> </h4>
        <p><strong>Motivatie:</strong> {{ appData.firstMotivation }}</p>
    </div>

    <div class="result-item">
        <h3>Je favoriete afbeelding uit Opdracht 5:</h3>
        <img :src="appData.favoriteImage" :alt="appData.favoriteImage" />
        <p><strong>Motivatie:</strong> {{ appData.imageMotivation }}</p>
    </div>

    <div class="result-item">
        <h3>De verdeling van de afbeeldingen:</h3>
        <ul>
            <li v-for="({ categoryLabel, count }) in sortedImageCounts" :key="categoryLabel">
            <b>{{ categoryLabel }}</b> had {{ count }} {{ count === 1 ? 'afbeelding' : 'afbeeldingen' }}
            </li>
        </ul>
    </div>


<div class="button-container">

  <button @click="copyResults">Kopiëer resultaten</button>
  <button @click="shareViaEmail">Deel via Email</button>
  <button @click="generatePDF">Exporteer PDF</button>
</div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

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
    async generatePDF() {
      const content = document.getElementById('pdf-content'); // Replace with the ID of your content
      console.log('Content:', content);

      try {
        const pdfOptions = {
          margin: 10,
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        const pdf = await html2pdf().from(content).set(pdfOptions).outputPdf();

        // Create a Blob from the PDF data
        const pdfBlob = new Blob([pdf], { type: 'application/pdf' });

        // Create a URL for the PDF blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create a link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'document.pdf';

        // Trigger a click event to start the download
        downloadLink.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(pdfUrl);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    },



  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
