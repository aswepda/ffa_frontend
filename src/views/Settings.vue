<template>
  <div class="settings">
    <h1>Einstellungen</h1>
    <v-text-field v-model="settings.name" label="Name (überschreibt durch social login erhaltene Namen)" placeholder="-" type="text"></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    settings: {}
  }),
  created() {
    this.settings = {...this.$globals.settings}
  }
}
</script>

<style>

</style>