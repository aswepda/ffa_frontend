<template>
  <v-card color="#F47458" dark height="100%">
    <v-card-title
      ><span>Sport!</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Hey Sportsfreund! Bereit für ein bisschen Sport? 😊</v-card-text
    >
    <v-card-actions>
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weather"
          ><v-icon left small>mdi-message</v-icon>Schlag mir etwas Sport vor!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyMorning">
          <v-icon left small>mdi-spotify</v-icon>Etwas Sportmusik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="dirWork">
          <v-icon left small>mdi-subway-variant</v-icon>Wie lange brauche ich
          bis in Gym?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="dirWork">
          <v-icon left small>mdi-map-marker</v-icon>Sportangebote in meiner Nähe
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import DirectionsVue from "../../mixins/api/Directions.vue";
import SpotifyVue from "../../mixins/api/Spotify.vue";
import WeatherVue from "../../mixins/api/Weather.vue";
import PlacesVue from "../../mixins/api/Places.vue";

export default {
  methods: {
    close() {
      this.$emit("closed");
    },
    test() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Hey FFA! Schlag mir etwas Sport vor!",
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
        text: "Schlag mir etwas Sport vor!",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Einen Moment bitte, ich analysiere das Wetter.. 🔎",
      });
      try {
        let weather = await this.getWeather("now");
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
        if (weather.weather[0].id < 800) {
          var badWeatherActivities = ['Ab ins Fitnessstudio!', 'Zeit fürs Hallenbad!', 'Perfekt für die Kletterhalle!'];
          var randomInt = Math.floor(Math.random() * badWeatherActivities.length);
          this.$emit("data", {
          type: "message",
          own: false,
          text: `Das Wetter sieht aktuell nicht so gut aus. ${badWeatherActivities[randomInt]}`,
          });
        }
        else {
          var goodWeatherActivities = ['Geh doch eine Runde joggen!', 'Zeit für eine tolle Radtour!', 'Ab auf den Golfplatz'];
          var randomInt2 = Math.floor(Math.random() * goodWeatherActivities.length);
          this.$emit("data", {
            type: "message",
            own: false,
            text: `Das Wetter sieht gut aus. ${goodWeatherActivities[randomInt2]}`,
          });
        }
          
      } catch (ex) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Ich hatte leider Probleme bei deiner Standortabfrage! Prüfe bitte ob du diese Anwendung dazu berechtigt hast deinen Standort abzurufen! 🚧",
        });
      }
    },
    async spotifyMorning() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Kannst du mir motivierende Musik für mein Workout empfehlen?",
      });

      if (this.notifySpotifyLogin()) return;

      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer passenden Playlist für dich. 🎶",
      });

      let searchTerm = ["motivation", "workout", "sport"];
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
  mixins: [WeatherVue, PlacesVue, SpotifyVue, DirectionsVue],
};
</script>

<style>
</style>