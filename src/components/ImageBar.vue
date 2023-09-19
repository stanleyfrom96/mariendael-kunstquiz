<template>
  <div class="image-bar">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="image-item"
    >
      <img :src="image.url" :alt="'Image ' + (index + 1)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array, // Array of images to display
  },
};
</script>

<style scoped>
.image-bar {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling if needed */
  gap: 1rem;
  padding-bottom: 0 !important;
  scrollbar-width: none; /* Hide the scrollbar in Firefox */
  -ms-overflow-style: none; /* Hide the scrollbar in IE/Edge */
}

/* Hide vertical scrollbar */
.image-bar::-webkit-scrollbar {
  width: 0;
  background: transparent; /* Optional: If you want to hide the scrollbar track */
}

/* Style for individual image items */
.image-bar .image-item img {
  height: 50px; /* Add spacing between images */
  min-width: 50px;
  object-fit: cover;
  padding-block: 0 !important;
}
</style>
