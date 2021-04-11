<template>
  <v-card color="#245535" dark height="100%">
    <v-card-title
      ><span>Sport 🏀</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Hey Sportsfreund! Bereit für ein bisschen Bewegung? 💪</v-card-text
    >
    <v-card-actions v-if="!selection && !question">
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weather"
          ><v-icon left small>mdi-message</v-icon>Schlag mir etwas Sport vor!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyWorkout">
          <v-icon left small>mdi-spotify</v-icon>Etwas Sportmusik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="places">
          <v-icon left small>mdi-map-marker</v-icon>Sportangebote in meiner Nähe
        </v-btn>
      </div>
    </v-card-actions>
    <v-card-actions v-if="question">
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places(activity)">
        <v-icon left small>mdi-check-bold</v-icon>Ja!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="question=false">
          <v-icon left small>mdi-close-thick</v-icon>Nein danke!
        </v-btn>
      </div>
    </v-card-actions>
    <div v-if="selection">
      <v-card-actions>
        <div class="d-flex flex-wrap" >
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('schwimmbad')">
          <v-icon left small>mdi-swim</v-icon>Schwimmbad
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('golfplatz')">
          <v-icon left small>mdi-golf</v-icon>Golfplatz
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('kletterhalle')">
          <v-icon left small>mdi-carabiner</v-icon>Kletterhalle
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('fitnessstudio')">
          <v-icon left small>mdi-dumbbell</v-icon>Fitnessstudio
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection=false">
          <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
        </div>
      </v-card-actions>
      <v-card-actions>
        <div class="d-flex">
          <v-text-field dense outlined v-model="search" label="eigene Suche" class="mx-2">
          </v-text-field>
          <v-btn outlined rounded @click="search_places(search)" v-if="search">
          <v-icon left small>mdi-magnify</v-icon>{{search || "eigene Suche"}}
          </v-btn>
        </div>
          </v-card-actions>
        </div>
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
        if (weather.weather[0].id >= 800) {
          var badWeatherActivities = ['Ab ins Fitnessstudio!', 'Zeit fürs Hallenbad!', 'Perfekt für die Kletterhalle!'];
          var randomInt = Math.floor(Math.random() * badWeatherActivities.length);
          this.$emit("data", {
          type: "message",
          own: false,
          text: `Das Wetter sieht aktuell nicht so gut aus. ${badWeatherActivities[randomInt]}`,
          });
          if (badWeatherActivities[randomInt].includes('Fitnessstudio')) {
            this.activity = 'fitnessstudio';
            this.$emit("data", {
              type: "message",
            own: false,
            text: "Soll ich für dich nach einem Fitnessstudio in deiner Nähe schauen?",
            });
            this.question = true;
          } else if (badWeatherActivities[randomInt].includes('Hallenbad')) {
            this.activity = 'hallenbad';
            this.$emit("data", {
              type: "message",
            own: false,
            text: "Soll ich für dich nach einem Hallenbad in deiner Nähe suchen?",
            });
            this.question = true;
          } else if (badWeatherActivities[randomInt].includes('Kletterhalle')) {
            this.activity = 'kletterhalle';
            this.$emit("data", {
              type: "message",
            own: false,
            text: "Soll ich für dich nach einer Kletterhalle in deiner Nähe schauen?",
            });
            this.question = true;
          }
        }
        else {
          var goodWeatherActivities = ['Geh doch eine Runde joggen!', 'Zeit für eine tolle Radtour!', 'Wie wäre es mit Golf?'];
          if (weather.main.temp - 273.15 > 20) {
            goodWeatherActivities.push('Zeit fürs Freibad!');
          }
          var randomInt2 = Math.floor(Math.random() * goodWeatherActivities.length);
          this.$emit("data", {
            type: "message",
            own: false,
            text: `Das Wetter sieht gut aus. ${goodWeatherActivities[randomInt2]}`,
          });
          if (goodWeatherActivities[randomInt2].includes('Golf')) {
            this.activity = 'golfplatz';
            this.$emit("data", {
              type: "message",
            own: false,
            text: "Soll ich für dich nach einem Golfplatz in deiner Nähe schauen?",
            });
            this.question = true;
          }
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
    async spotifyWorkout() {
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
    async places(){
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Zeige mir Sportangebote in meiner Nähe an.",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Wie willst du dich sportlich betätigen?",
      });
    this.selection = true
    },
    async search_places(type){
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎",
      });
      let result = await this.getPlacesNearby(type)
      let rResult = result[Math.floor(Math.random() * (result.length > 5 ? 5 : result.length))];
      let latitude = rResult.geometry.location.lat;
      let longitude = rResult.geometry.location.lng;
      this.question = false;
      this.selection = false;
      this.$emit("data", {
        type: "location",
        lat: rResult.geometry.location.lat,
        lon: rResult.geometry.location.lng,
        name: rResult.name,
        rating: rResult.rating,
        ratingCount: rResult.user_ratings_total,
        url: rResult.url,
        text: `📞: ${rResult.formatted_phone_number ? rResult.formatted_phone_number: '-'}\n💲: ${rResult.price_level ? rResult.price_level: '-'}/4`,
      })
      try {
        let mode = this.$globals.getSetting("directionMode") || "driving";
        let destination = `${latitude},${longitude}`
        let direction = await this.getDirection(destination, mode);
        let hours = Math.floor(direction.value / 60 / 60);
        let minutes = Math.round((direction.value / 60) % 60);
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Ich habe ${rResult.name} für dich gefunden. 
          Zu ${rResult.name} würdest du momentan ${this.parseDirectionText(mode)} etwa ${hours} Stunden und ${minutes} Minuten benötigen!`,
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

  data: ()=>({
    selection : false,
    question: false,
    activity: "",
    search : ""
  })
};
</script>

<style>
</style>