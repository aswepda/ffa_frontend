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
        default: {
          return Message;
        }
      }
    },
    getProps(message) {
      switch (message.type.toLowerCase()) {
        case "message": {
          return { from: (message.own? 'du' : 'pda'), date: new Date() };
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
      }
    },
  },
};
</script>

<style>
</style>