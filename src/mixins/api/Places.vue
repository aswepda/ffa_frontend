<script>
import GPSLocation from '../Location';
export default {
  methods: {
    async getPlacesNearby(search, lat = null, lon = null) {
      if(!lat || !lon) {
          var location = await this.requestLocation();
          lat = location.coords.latitude;
          lon = location.coords.longitude;
      }
      let placesData = await this.$http.get(`places?search=${search}?lat=${lat}&lon=${lon}`);
      return placesData.map(i => i.result); // extracts result from places array
    },
  },
  mixins: [GPSLocation]
};
</script>