<script>
export default {
  data: () => ({
    locationRequested: false,
    location: null,
    locationError: null,
  }),
  methods: {
    requestLocation() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Ortung ist für diesen Browser leider nicht verfügbar.";
        return;
      }
      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;
          this.location = pos;
        },
        (err) => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
  },
};
</script>