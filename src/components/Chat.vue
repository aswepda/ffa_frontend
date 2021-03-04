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
const Location = () => import("./content/Location.vue"); // lazy chunk splitting
const Message = () => import("./content/Message.vue");
const Spotify = () => import("./content/Spotify.vue");
const Calendar = () => import("./content/Calendar.vue");

export default {
  data: () => ({
    messages: [
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
        text:
          "Ich habe die folgenden Termine in deinem Kalender gefunden! 📅",
      },
      {
        type: "calendar",
        own: false,
        id: 7,
        events: [
          {
            name: "Zahnarzt",
            start: new Date().toISOString().slice(0, 10) + " 09:00",
            end: new Date().toISOString().slice(0, 10) + " 10:30",
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
    ],
  }),
  methods: {
    getComponent(message) {
      switch (message.type.toLowerCase()) {
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
        default: {
          return Message;
        }
      }
    },
    getProps(message) {
      switch (message.type.toLowerCase()) {
        case "message": {
          return { from: message.own ? "du" : "pda", date: new Date() };
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
          };
        }
      }
    },
    getSlotData(message) {
      switch (message.type.toLowerCase()) {
        case "message": {
          return message.text || "-";
        }
        case "location": {
          return message.text || "-";
        }
        case "spotify": {
          return message.text || "-";
        }
      }
    },
  },
};
</script>

<style>
</style>