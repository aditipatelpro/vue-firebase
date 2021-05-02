<template>
  <v-alert
    border="left"
    close-text="Close Alert"
    dismissible
    type="error"
    @input="onClose"
    :value="true"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
