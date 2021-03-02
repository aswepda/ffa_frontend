<template>
  <Audio :file="audioFile" />
</template>

<script>
import Audio from "../components/content/Audio";
export default {
  data: () => ({
    audioFile: null,
  }),
  components: { Audio },
  async created() {
    let speechResult = await this.$http.get("/speech");
    this.audioFile = `data:audio/mpeg;base64,${speechResult.data.speech}`;
  },
};
</script>

<style>
</style>