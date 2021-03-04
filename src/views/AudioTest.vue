<template>
  <div class="audiotest">
    <Audio auto-play :file="audioFile" />
    <Spotify
      :uri="spotifyURI"
      :title="title"
      :is-collapsed="collapsed"
      >{{ content }}</Spotify
    >
    <v-text-field class="mt-10" clearable v-model="spotifyURI" label="spotifyURI"></v-text-field>
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
    spotifyURI: 'spotify:track:4jiswbis5Tep60DE2oyRtQ',
    collapsed: false,
    content: 'Hier ist ein Track für dich!',
    title: 'Titel'
  }),
  components: { Audio, Spotify },
  async created() {
    let speechResult = await this.$http.get("/speech");
    this.audioFile = `data:audio/mpeg;base64,${speechResult.data.speech}`;
  },
};
</script>

<style>
</style>