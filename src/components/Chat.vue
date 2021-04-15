<template>
  <div class="chat">
    <v-row
      v-for="message in messages"
      :key="message.id"
      :justify="message.own ? 'end' : 'start'"
      class="mb-3"
    >
      <component :is="getComponent(message)" v-bind="getProps(message)">{{
        getSlotData(message)
      }}</component>
    </v-row>
  </div>
</template>

<script>
const Location = () => import(/* webpackChunkName: "location" */ "./content/Location.vue"); // lazy chunk splitting
const Message = () => import(/* webpackChunkName: "message" */"./content/Message.vue");
const Spotify = () => import(/* webpackChunkName: "spotify" */"./content/Spotify.vue");
const Calendar = () => import(/* webpackChunkName: "calendar" */"./content/Calendar.vue");
const Speech = () => import(/* webpackChunkName: "speech" */"./content/Speech.vue");
const Weather = () => import(/* webpackChunkName: "weather" */"./content/Weather.vue");

export default {
  props: {
    defaultMessages: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    messages: [],
  }),
  methods: {
    getComponent(message) {
      switch (message.type.toLowerCase()) {
        case "speech": {
          return Speech;
        }
        case "message": {
          return Message;
        }
        case "location": {
          return Location;
        }
        case "spotify": {
          return Spotify;
        }
        case "calendar": {
          return Calendar;
        }
        case "weather": {
          return Weather;
        }
        default: {
          return Message;
        }
      }
    },
    getProps(message) {
      switch (message.type.toLowerCase()) {
        case "speech": {
          return { text: message.text, autoplay: message.autoplay };
        }
        case "message": {
          return {
            from: message.own ? "du" : "pda",
            date: message.date || new Date(),
          };
        }
        case "location": {
          return {
            lat: message.lat,
            lon: message.lon,
            title: message.name,
            rating: message.rating || null,
            "rating-count": message.ratingCount || null,
            url: message.url || null,
          };
        }
        case "spotify": {
          return {
            uri: message.uri,
            title: message.title,
            isCollapsed: message.isCollapsed,
          };
        }
        case "calendar": {
          return {
            height: message.height || null,
            events: message.events,
            openOnClick: true,
            start: message.start || null
          };
        }
        case "weather": {
          return {
            city: message.city || "Unbekannt",
            icon: message.icon,
            temperature: message.temperature,
            windspeed: message.windspeed,
            humidity: message.humidity,
            condition: message.condition,
            dateString: message.dateString || null
          };
        }
      }
    },
    getSlotData(message) {
      switch (message.type.toLowerCase()) {
        case "message":
        case "spotify":
        case "location": {
          return message.text || "-";
        }
      }
    },
    addMessage(message) {
      if (message.type === "message" && !("date" in message))
        message["date"] = new Date();
      if (!("id" in message)) message["id"] = Math.random();
      this.messages.push(message);
      if (message.type === "message" && message.speak && this.$globals.getSetting('speechEnabled') != false) {
        let speechMessage = { ...message };
        speechMessage.text = speechMessage.text.replace(/[^\x20-\xFF]/g, ""); // Replaces non ascii-characters like emojis etc.
        speechMessage.type = "speech";
        speechMessage["id"] = Math.random();
        this.messages.push(speechMessage);
      }
    },
  },
  mounted() {
    for(let message of this.defaultMessages) {
      this.messages.push(message);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>