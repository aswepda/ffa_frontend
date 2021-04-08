<template>
  <div class="settings">
    <h1>Einstellungen</h1>
    <v-text-field v-model="settings.name" label="Name (überschreibt durch social login erhaltene Namen)" type="text"></v-text-field>
    <v-text-field v-model="settings.workplace" label="Arbeitsplatz" placeholder="DHBW Stuttgart" type="text"></v-text-field>
    <v-select v-model="settings.directionMode" :items="transitModes" label="Hauptverkehrsmittel"></v-select>
    <v-switch label="Sprachausgabe" v-model="settings.speechEnabled"></v-switch>
    <v-btn :color="saved ? 'primary' : null" :dark="saved" @click="save"><v-icon left>mdi-content-save</v-icon>{{savedText}}</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    saved: false,
    settings: {},
    transitModes: ['driving', 'walking', 'bicycling', 'transit']
  }),
  created() {
    this.settings = {...this.$globals.settings}
    if (!('speechEnabled' in this.settings)) {
      this.settings.speechEnabled = true;
    }
  },
  computed: {
    savedText() {
      if(this.saved) {
        return "Gespeichert!"
      } else {
        return "Speichern"
      }
    },
  },
  methods: {
    save() {
      for (let key of Object.keys(this.settings)) {
        this.$globals.setSetting(key, this.settings[key])
      }
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 5000);
    }
  }
}
</script>

<style>

</style>