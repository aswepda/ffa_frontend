<template>
  <v-card color="#F47458" dark height="100%">
    <v-card-title
      ><span>Guten Morgen!</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Hey {{ firstName }}! Für deinen perfekten Start in den Tag habe ich dir
      einige Dinge vorbereitet. 😊</v-card-text
    >
    <v-card-actions>
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="test">
          <v-icon left small>mdi-message</v-icon>Guten Morgen!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weather"
          ><v-icon left small>mdi-weather-partly-cloudy</v-icon>Wie wird denn
          das Wetter?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="calendar"
          ><v-icon left small>mdi-calendar</v-icon>Was steht an?
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalendarVue from "../../mixins/api/Calendar.vue";
import WeatherVue from "../../mixins/api/Weather.vue";
export default {
  methods: {
    close() {
      this.$emit("closed");
    },
    test() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Guten Morgen!",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Guten Morgen ${this.firstName}! Ich hoffe du hast heute einen schönen Tag. 🌞`,
        speak: true,
      });
    },
    async weather() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Wie ist denn das Wetter so?",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎",
      });
      try {
        let weather = await this.getWeather("now");
        this.$emit("data", {
          type: "message",
          own: false,
          text: `In ${weather.name} ist es momentan ${(
            weather.main.temp - 273.15
          )
            .toFixed(2)
            .toString()
            .replace(".", ",")}°C bei ${
            weather.main.humidity
          }% Luftfeuchtigkeit. ⛅`,
          speak: true,
        });
        this.$emit("data", {
          type: "weather",
          own: false,
          city: weather.name,
          icon: weather.weather[0].icon,
          temperature: weather.main.temp - 273.15,
          windspeed: weather.wind.speed,
          humidity: weather.main.humidity,
          condition: weather.weather[0].description,
        });
      } catch (ex) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Ich hatte leider Probleme bei deiner Standortabfrage! Prüfe bitte ob du diese Anwendung dazu berechtigt hast deinen Standort abzurufen! 🚧",
        });
      }
    },
    async calendar() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Was steht heute so an?",
      });
      if (!this.$globals.credentials) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Du scheinst nicht mit Google angemeldet zu sein! Damit ich deine Kalendereinträge abrufen kann musst du dich mit Google anmelden.",
        });
        return;
      }
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎📅",
      });
      try {
        let events = await this.getEvents("today");
        this.$emit("data", {
          type: "message",
          own: false,
          speak: true,
          text: `Heute befinde${events.length == 1 ? "t" : "n"} sich ${
            events.length
          } Termin${events.length != 1 ? "e" : ""} in deinem Kalender. ${
            events.length == 0
              ? "Genieße deinen freien Tag! 😊"
              : "Du schaffst das! 💪"
          }`,
        });
        if (events.length) {
          this.$emit("data", {
            type: "calendar",
            own: false,
            events: events,
          });
        }
      } catch (ex) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Etwas ist schiefgelaufen.. Bitte versuche deinen Google-Account nochmal ab- und anzumelden.",
        });
      }
    },
  },
  computed: {
    firstName() {
      return this.$globals.firstName || "du";
    },
  },
  mixins: [WeatherVue, CalendarVue],
};
</script>

<style>
</style>