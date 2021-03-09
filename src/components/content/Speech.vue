<template>
  <Audio auto-play :file="audioFile" speech :max-width="maximumWidth"/>
</template>

<script>
import Audio from "./Audio.vue";

export default {
  components: { Audio },
  props: {
    text: String,
    maxWidth: Number
  },
  data() {
    return {
      audioFile: null,
    };
  },
  computed: {
    maximumWidth() {
      return this["max-width"] || 480;
    },
  },
  async created() {
    let speechResult = await this.$http.get(`/speech?text=${this.text}`);
    this.audioFile = `data:audio/mpeg;base64,${speechResult.data.speech}`;
  },
};
</script>

<style>
</style>