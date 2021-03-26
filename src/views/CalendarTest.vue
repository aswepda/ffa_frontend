<template>
  <v-sheet height="450" elevation="3">
    <v-calendar class="pa-2" type="day" @click:event="clickEvent" :events="events" ref="calendar">
      <template v-slot:day-body>
        <div class="v-current-time" :style="{ top: nowY }"></div>
      </template>
    </v-calendar>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    events: [],
    ready: false
  }),
  computed: {
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
  },
  async created() {
    if (this.$globals.loggedIn && this.$globals.credentials) {
      try {
        let calendarResult = await this.$http.get("calendar/today", {
          headers: {
            Authorization: this.$globals.credentials,
          },
        });
        console.log(calendarResult.data);
        let calendarEvents = calendarResult.data.data.map((i) => {
          i["name"] = i["title"];
          i["start"] = new Date(i["start"])
          i["end"] = new Date(i["end"])
          i["timed"] = true
          return i;
        });
        console.log(calendarEvents);
        this.events = calendarEvents;
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  methods: {
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
    clickEvent(event) {
      if(event.event.link) {
        window.open(event.event.link, "_blank");
      }
    }
  },
};
</script>

<style>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
}
</style>