<template>
  <v-alert
    border="left"
    close-text="Close Alert"
    dismissible
    type="error"
    :value="true"
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },

  methods: {
    onClose() {
      this.$emit('dismissed');
    },
  },
};
</script>
