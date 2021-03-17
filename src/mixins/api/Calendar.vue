<script>
export default {
  methods: {
    async getEvents(day) {
      let calendarResult = await this.$http.get(`calendar/${day}`, {
        headers: {
          Authorization: this.$globals.credentials,
        },
      });
      let calendarEvents = calendarResult.data.data.map((i) => {
        i["name"] = i["title"];
        i["start"] = new Date(i["start"]);
        i["end"] = new Date(i["end"]);
        i["timed"] = true;
        return i;
      });
      return calendarEvents;
    },
    async getFreetime() {
      
    }
  },
};
</script>