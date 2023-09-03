<template>
  <div class="button-group">
    <button
      v-for="(button, index) in buttons"
      :key="index"
      @click="handleButtonClick(button)"
      :class="{ 'radio-button': radioButton, 'normal-button': !radioButton, 'selected-button': radioButton && isSelected(button.value) }"
    >
      {{ button.label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    buttons: Array, // Array of button objects with label and value
    radioButton: Boolean, // Flag to determine if radio button version should be used
  },
  data() {
    return {
      selectedValue: null,
    };
  },
  methods: {
    handleButtonClick(button) {
      this.selectedValue = button.value; // Set the selectedValue to the button's value
      this.$emit('button-click', button.value); // Emit the selected value
    },
    isSelected(value) {
      return this.selectedValue === value;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
