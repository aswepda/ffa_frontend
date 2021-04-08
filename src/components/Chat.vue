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
  data: () => ({
    messages: [
      /*
      {
        type: "message",
        own: true,
        id: 1,
        text: "Zeige mir einen interessanten Ort!",
      },
      {
        type: "message",
        own: false,
        id: 2,
        text: "Das könnte dir vielleicht gefallen! 👀",
      },
      {
        type: "speech",
        own: false,
        id: 2,
        text: "Das könnte dir vielleicht gefallen!",
      },
      {
        type: "location",
        own: false,
        id: 3,
        lat: "48.784708",
        lon: "9.174249",
        name: "DHBW Stuttgart",
        url: "https://dhbw-stuttgart.de",
        text: `Die Duale Hochschule Baden-Württemberg ist seit dem 1. März 2009 eine
          staatliche duale Hochschule in Baden-Württemberg, die duale
          Studiengänge anbietet. Sie ist, unter Einbeziehung aller
          Studienakademien, die nach Studierendenzahl größte Hochschule des
          Landes und, wie die meisten Hochschulen in Baden-Württemberg, eine
          Körperschaft des öffentlichen Rechts.`,
      },
      {
        type: "message",
        own: true,
        id: 4,
        text: "Hast du ein Lied für mich?",
      },
      {
        type: "message",
        own: false,
        id: 5,
        text: "Na klar! 🎶",
      },
      {
        type: "spotify",
        own: false,
        id: 6,
        uri: "spotify:track:4oYzwOTWpP3JTyKrTHJtqw",
        title: "Awaken - Big Wild",
        text: `Dieses Lied könnte dir vielleicht gefallen!`,
      },
      { type: "message", own: true, id: 7, text: "Was steht heute an?" },
      {
        type: "message",
        own: false,
        id: 8,
        text: "Ich habe die folgenden Termine in deinem Kalender gefunden! 📅",
      },
      {
        type: "speech",
        own: false,
        id: 12,
        text:
          "Ich habe die folgenden Termine in deinem Kalender gefunden! Heute hast du nicht so viel zu tun.",
        autoplay: true,
      },
      {
        type: "calendar",
        own: false,
        id: 9,
        events: [
          {
            name: "Zahnarzt",
            start: new Date().toISOString().slice(0, 10) + " 09:00",
            end: new Date().toISOString().slice(0, 10) + " 10:30",
            link: "https://google.com",
          },
          {
            name: "Friseurbesuch",
            start: new Date().toISOString().slice(0, 10) + " 14:00",
            end: new Date().toISOString().slice(0, 10) + " 14:30",
          },
          {
            name: "Steuererklärung abgeben",
            start: new Date().toISOString().slice(0, 10) + " 17:00",
            end: new Date().toISOString().slice(0, 10) + " 18:00",
          },
        ],
      },
      {
        type: "message",
        own: true,
        id: 10,
        text: "Wie ist denn das Wetter so?",
      },
      {
        type: "message",
        own: false,
        id: 11,
        text: "In Stuttgart ist es momentan Regnerisch bei etwa 12°C.",
      },
      {
        type: "speech",
        own: false,
        id: 12,
        text: "In Stuttgart ist es momentan regnerisch bei etwa 12°C.",
        autoplay: false,
      },
      {
        type: "weather",
        own: false,
        id: 13,
        city: "Stuttgart",
        icon: "10d",
        temperature: 12,
        windspeed: 5,
        humidity: 13,
        condition: "Regnerisch",
      },*/
    ],
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