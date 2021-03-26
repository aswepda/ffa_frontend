<script>
import GPSLocation from '../Location';
export default {
  methods: {
    async getWeather(time = 'now', lat = null, lon = null) {
      if(!lat || !lon) {
          var location = await this.requestLocation();
          lat = location.coords.latitude;
          lon = location.coords.longitude;
      }
      return (await this.$http.get(`weather/${time}?lat=${lat}&lon=${lon}`)).data;
    },
  },
  mixins: [GPSLocation]
};
</script>