<template>
  <div class="audiotest">
    <Audio auto-play :file="audioFile" />
    <v-text-field
      clearable
      v-model="speechText"
      label="Speech Text"
      @keyup.enter="changeAudioFile"
    ></v-text-field>
    <Spotify
      :uri="spotifyURI"
      :title="title"
      :is-collapsed="collapsed"
      class="mt-5"
      >{{ content }}</Spotify
    >
    <v-text-field
      class="mt-10"
      clearable
      v-model="spotifyURI"
      label="spotifyURI"
    ></v-text-field>
    <v-text-field clearable v-model="title" label="title"></v-text-field>
    <v-switch label="Collapsed?" v-model="collapsed"></v-switch>
    <v-textarea v-model="content" label="content"></v-textarea>
  </div>
</template>

<script>
import Audio from "../components/content/Audio";
import Spotify from "../components/content/Spotify.vue";
export default {
  data: () => ({
    audioFile: null,
    spotifyURI: "spotify:track:6kYi1xkfSIlbudhFq6yTQI",
    collapsed: false,
    content: "Hier ist ein Track für dich!",
    title: "Titel",
    speechText: "Hallo, dies ist ein Test!",
  }),
  components: { Audio, Spotify },
  async created() {
    this.changeAudioFile();
  },
  methods: {
    async changeAudioFile() {
      let speechResult = await this.$http.get(
        `/speech?text=${this.speechText}`
      );
      this.audioFile = `data:audio/mpeg;base64,${speechResult.data.speech}`;
    },
  },
};
</script>

<style>
</style>