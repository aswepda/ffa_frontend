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
          ><v-icon left small>mdi-weather-partly-cloudy</v-icon>Wie ist denn
          das Wetter?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="calendar"
          ><v-icon left small>mdi-calendar</v-icon>Was steht an?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyMorning">
          <v-icon left small>mdi-spotify</v-icon>Etwas Morgenmusik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="dirWork">
          <v-icon left small>mdi-subway-variant</v-icon>Wie lange brauche ich
          zur Arbeit?
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
    async spotifyMorning() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Ich würde mich über ein bisschen Morgenmusik freuen!",
      });

      if (this.notifySpotifyLogin()) return;

      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer passenden Playlist für dich. 🎶",
      });

      let searchTerm = ["guten morgen", "morning", "good morning"];
      let playlistResult = await this.getPlaylists(
        searchTerm[Math.floor(Math.random() * searchTerm.length)]
      );
      let randomPlaylist =
        playlistResult[Math.floor(Math.random() * playlistResult.length)];
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Ich habe die Playlist ${randomPlaylist.name} von ${randomPlaylist.owner} gefunden! Ich hoffe sie gefällt dir. 🎵🐦🌞`,
        speak: true,
      });
      this.$emit("data", {
        type: "spotify",
        own: false,
        title: randomPlaylist.name,
        uri: randomPlaylist.uri,
      });
    },
    async dirWork() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Wie lange brauche ich gerade zur Arbeit?",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Warte kurz, während ich das für dich nachschlage..`,
      });
      if (!this.$globals.getSetting("workplace")) {
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Du hast leider keinen Arbeitsplatz eingestellt. Stelle einen in den Einstellungen ein um dir die Dauer zum Arbeitsplatz anzeigen zu lassen!`,
        })
        return;
      }
      try {
        let mode = this.$globals.getSetting("directionMode") || "driving";
        let workplace = this.$globals.getSetting("workplace")
        let direction = await this.getDirection(workplace, mode);
        let hours = Math.floor(direction.value / 60 / 60);
        let minutes = Math.round((direction.value / 60) % 60);
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Zu deiner Arbeitsstelle ${workplace} würdest du momentan ${this.parseDirectionText(mode)} etwa ${hours} Stunden und ${minutes} Minuten benötigen!`,
          speak: true,
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