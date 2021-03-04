<template>
  <v-card height="450" :max-width="maximumWidth">
    <v-calendar class="pa-2" type="day" :events="events" ref="calendar">
      <template v-slot:day-body>
        <div class="current-time" :style="{ top: nowY }"></div>
      </template>
    </v-calendar>
  </v-card>
</template>

<script>
export default {
  props: ['events', 'height', 'max-width'],
  data: () => ({
    ready: false,
  }),
  computed: {
    computedHeight() {
      return this.height || 450
    },
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
    maximumWidth() {
      return this["max-width"] || 480;
    },
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
  },
};
</script>

<style>
.current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
}
</style>