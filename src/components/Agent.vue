<template>
  <div class="agent">
    <v-container class="text-center">
      <h1 class="text-h4">Willkommen {{ username }}!</h1>
    </v-container>
    </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$globals.email;
    }
  }
};
</script>

<style>
</style>