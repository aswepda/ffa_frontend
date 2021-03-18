<script>
export default {
  name: "GPSLocation",
  methods: {
    requestLocation() {
      return new Promise(function (resolve, reject) {
        if (!("geolocation" in navigator)) {
          let errorStr =
            "Ortung ist für diesen Browser leider nicht verfügbar.";
          reject(errorStr);
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
  },
};
</script>