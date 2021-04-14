<template>
  <v-card height="450" :max-width="maximumWidth" width="100%">
    <v-calendar
      class="pa-2"
      type="day"
      @click:event="eventClicked"
      :events="events"
      ref="calendar"
      :start="start"
    >
      <template v-slot:day-body>
        <div class="current-time" :style="{ top: nowY }" v-if="!start"></div>
      </template>
    </v-calendar>
  </v-card>
</template>

<script>
export default {
  props: {
    events: Array,
    height: Number,
    "max-width": Number,
    "open-on-click": Boolean,
    start: String
  },
  data: () => ({
    ready: false,
  }),
  computed: {
    computedHeight() {
      return this.height || 450;
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
    eventClicked(elem) {
      if (this.openOnClick && elem.event.link) {
        window.open(elem.event.link, "_blank");
      }
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

.current-time::before {
  content: "";
  position: absolute;
  background-color: #ea4335;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: -5px;
  margin-left: -6.5px;
}
</style>