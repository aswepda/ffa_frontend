<template>
  <v-card color="#F47458" dark height="100%">
    <v-card-title
      ><span>Guten Abend!</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Guten Abend {{ firstName }}! Für deinen perfekten Start in den Tag habe
      ich dir einige Dinge vorbereitet. 😊</v-card-text
    >
    <v-card-actions>
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="test">
          <v-icon left small>mdi-message</v-icon>Guten Abend!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weatherTomorrow"
          ><v-icon left small>mdi-weather-partly-cloudy</v-icon>Wie wird denn
          das Wetter morgen?
        </v-btn>
        <v-btn
          class="ml-2 mb-1"
          outlined
          rounded
          small
          @click="calendarTomorrow"
          ><v-icon left small>mdi-calendar</v-icon>Was steht morgen an?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyEvening">
          <v-icon left small>mdi-spotify</v-icon>Etwas Einschlafmusik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="wakeUpTime">
          <v-icon left small>mdi-subway-variant</v-icon>Wann muss ich morgen
          aufstehen?
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalendarVue from "../../mixins/api/Calendar.vue";
import DirectionsVue from "../../mixins/api/Directions.vue";
import SpotifyVue from "../../mixins/api/Spotify.vue";
import WeatherVue from "../../mixins/api/Weather.vue";

export default {
  methods: {
    close() {
      this.$emit("closed");
    },
    async test() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Guten Abend!",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Hey ${this.firstName}! Ich hoffe du hattest einen schönen Tag heute. 🌞`,
        speak: true,
      });
      try {
        let events = await this.getEvents("today");
        this.$emit("data", {
          type: "message",
          own: false,
          speak: true,
          text: `Du hattest heute ${events.length} Termin${
            events.length != 1 ? "e" : ""
          }. ${
            events.length == 0
              ? "Du hast deine freie Zeit gut genutzt! 😊"
              : "Das war ein produktiver Tag! 💪"
          }`,
        });
      } catch (e) {
        console.error(e);
      }
    },
    async weatherTomorrow() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Wie wird denn das Wetter morgen?",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎",
      });
      try {
        let weather = await this.getWeather("tomorrow");
        let cityName = (await this.getWeather("now")).name;
        let weatherTomorrow = weather.daily[0]
        this.$emit("data", {
          type: "message",
          own: false,
          text: `In ${cityName} werden es ${(weatherTomorrow.temp.day - 273.15)
            .toFixed(2)
            .toString()
            .replace(".", ",")}°C bei ${
            weatherTomorrow.humidity
          }% Luftfeuchtigkeit. ⛅`,
          speak: true,
        });
        this.$emit("data", {
          type: "weather",
          own: false,
          city: cityName,
          icon: weatherTomorrow.weather[0].icon,
          temperature: weatherTomorrow.temp.day - 273.15,
          windspeed: weatherTomorrow.wind_speed,
          humidity: weatherTomorrow.humidity,
          condition: weatherTomorrow.weather[0].description,
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
    async calendarTomorrow() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Was steht morgen so an?",
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
        let events = await this.getEvents("tomorrow");
        this.$emit("data", {
          type: "message",
          own: false,
          speak: true,
          text: `Morgen befinde${events.length == 1 ? "t" : "n"} sich ${
            events.length
          } Termin${events.length != 1 ? "e" : ""} in deinem Kalender. ${
            events.length == 0
              ? "Genieße deinen freien Tag morgen! 😊"
              : "Du schaffst das! 💪"
          }`,
        });
        if (events.length) {
          // TODO is calendar of tomorrow shown?
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
    async spotifyEvening() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Ich würde mich über ein bisschen Einschlafmusik freuen!",
      });

      if (this.notifySpotifyLogin()) return;

      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer passenden Playlist für dich. 🎶",
      });

      let searchTerm = [
        "nachts",
        "ruhig",
        "calm",
        "schlaf",
        "sleep",
      ];
      let playlistResult = await this.getPlaylists(
        searchTerm[Math.floor(Math.random() * searchTerm.length)]
      );
      let randomPlaylist =
        playlistResult[Math.floor(Math.random() * playlistResult.length)];
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Ich habe die Playlist ${randomPlaylist.name} von ${randomPlaylist.owner} gefunden!\nIch hoffe sie gefällt dir. 🎵🌜💤`,
        speak: true,
      });
      this.$emit("data", {
        type: "spotify",
        own: false,
        title: randomPlaylist.name,
        uri: randomPlaylist.uri,
      });
    },
    async wakeUpTime() {
      this.$emit("data", { 
        type: "message",
        own: true,
        text: "Wie lange kann ich morgen schlafen? 😴",
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
      try {
        let events = await this.getEvents("tomorrow");
        if (events.length) {
          this.$emit("data", {
            type: "message",
            own: false,
            speak: true,
            text: `Dein erster Termin heißt ${events[0].title} und beginnt um ${events[0].start}`,
          });
        } else {
          this.$emit("data", {
            type: "message",
            own: false,
            speak: true,
            text: `Morgen hast du keine Termine, du kannst ausschlafen!`,
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
    notifySpotifyLogin() {
      if (!this.$globals.spotifyCredentials) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Du scheinst nicht mit Spotify angemeldet zu sein! Damit ich Musik für dich finden kann musst du dich mit Spotify anmelden.",
        });
        return true;
      }
      return false;
    },
  },
  computed: {
    firstName() {
      return this.$globals.name || "du";
    },
  },
  mixins: [WeatherVue, CalendarVue, SpotifyVue, DirectionsVue],
};
</script>

<style>
</style>