<script>
export default {
    methods: {
        getSpeech(text) {
            let speechResult = await this.$http.get(`/speech?text=${text}`);
            return `data:audio/mpeg;base64,${speechResult.data.speech}`;
        }
    }
}
</script>