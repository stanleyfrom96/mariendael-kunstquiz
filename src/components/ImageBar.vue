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
  overflow-x: scroll; /* Enable horizontal scrolling if needed */
  max-height: 50px; /* Set the maximum height of the image bar */
  gap: 1rem;
}

/* Style for individual image items */
.image-item img {
  height: 50px; /* Add spacing between images */
}
</style>
