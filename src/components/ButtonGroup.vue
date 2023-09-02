<template>
  <div class="button-group">
    <button v-for="(button, index) in buttons" :key="index" @click="handleButtonClick(button)" :class="{ 'radio-button': radioButton, 'normal-button': !radioButton }">
      <template v-if="radioButton">
        <input type="radio" :value="button.value" v-model="selectedValue" />
      </template>
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
  watch: {
    selectedValue(newValue) {
      if (this.radioButton) {
        this.$emit('button-click', newValue);
      }
    },
  },
  methods: {
    handleButtonClick(button) {
      if (!this.radioButton) {
        this.selectedValue = button.value; // Set the selectedValue to the button's value
        this.$emit('button-click', button.value); // Emit the selected value
      }
    },
    
  },
};
</script>
