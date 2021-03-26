export default {
  props: {
    maxWidth: {
      type: Number,
      default: 480
    }
  },
  computed: {
    maximumWidth() {
      return this["max-width"] || 480;
    },
  },
}