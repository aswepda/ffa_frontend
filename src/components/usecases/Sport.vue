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
    <v-card-actions v-if="selection == 0 && !question">
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weather"
          ><v-icon left small>mdi-message</v-icon>Schlag mir etwas Sport vor!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotify">
          <v-icon left small>mdi-spotify</v-icon>Etwas Musik bitte!
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
    <div v-if="(selection == 5)">
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
        <div class="d-flex flex-wrap">
          <v-text-field dense outlined v-model="search" label="eigene Suche" class="mx-2">
          </v-text-field>
          <v-btn outlined rounded @click="search_places(search)" v-if="search">
          <v-icon left small>mdi-magnify</v-icon>{{search || "eigene Suche"}}
          </v-btn>
        </div>
      </v-card-actions>
    </div>
    <div v-if="(selection == 1)">
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayPlaylist()">
            <v-icon left small>mdi-spotify</v-icon>Playlist spielen
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayArtist()">
            <v-icon left small>mdi-spotify</v-icon>Interpreten spielen
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayGenre()">
            <v-icon left small>mdi-spotify</v-icon>Genre spielen
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyWorkout()">
            <v-icon left small>mdi-spotify</v-icon>Workout Musik spielen
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection = 0">
            <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
        </div>
      </v-card-actions>
    </div>
    <div v-if="(selection == 2)">
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayPlaylist(playlists[0].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ playlists[0].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayPlaylist(playlists[1].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ playlists[1].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayPlaylist(playlists[2].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ playlists[2].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayPlaylist(playlists[3].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ playlists[3].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection = 1">
            <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
          <v-text-field dense outlined v-model="search" label="Playlist suchen" class="mx-2">
          </v-text-field>
          <v-btn outlined rounded @click="spotifyPlayPlaylist(search)" v-if="search">
            <v-icon left small>mdi-magnify</v-icon>{{ search || "Playlist suchen" }}
          </v-btn>
        </div>
      </v-card-actions>
    </div>
    <div v-if="(selection == 3)">
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayArtist(favoriteArtists[0].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteArtists[0].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayArtist(favoriteArtists[1].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteArtists[1].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayArtist(favoriteArtists[2].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteArtists[2].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayArtist(favoriteArtists[3].name)">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteArtists[3].name }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection = 1">
            <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
          <v-text-field dense outlined v-model="search" label="Interpreten suchen" class="mx-2">
          </v-text-field>
          <v-btn outlined rounded @click="spotifyPlayArtist(search)" v-if="search">
            <v-icon left small>mdi-magnify</v-icon>{{ search || "Interpreten suchen" }}
          </v-btn>
        </div>
      </v-card-actions>
    </div>
    <div v-if="(selection == 4)">
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayGenre(favoriteGenres[0])" >
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteGenres[0] }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayGenre(favoriteGenres[1])">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteGenres[1] }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayGenre(favoriteGenres[2])">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteGenres[2] }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayGenre(favoriteGenres[3])">
            <v-icon left small>mdi-spotify</v-icon>{{ favoriteGenres[3] }}
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection = 1">
            <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
          <v-text-field dense outlined v-model="search" label="Genre suchen" class="mx-2">
          </v-text-field>
          <v-btn outlined rounded @click="spotifyPlayGenre(search)" v-if="search">
            <v-icon left small>mdi-magnify</v-icon>{{ search || "Genre suchen" }}
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

/*
selections:
0 : nothing
1 : select kind of spotify seach
2 : select playlist
3 : select artist
4 : select genre
5 : select sport location
*/

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
        if (weather.weather[0].id < 800) {
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
    async spotify() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Ich würde mich über ein bisschen Musik freuen!",
      });

      if (this.notifySpotifyLogin()) return;

      this.$emit("data", {
        type: "message",
        own: false,
        text: "Klar doch! Was willst du denn hören?",
      });
      this.selection = 1;
    },
    async spotifyPlayGenre(genre) {
      if (genre) {
        let genrePlaylist = await this.playGenre(genre);
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Hier ist eine Playlist mit ${genre} Musik!\n Ich hoffe es gefällt dir! 🎵`,
          speak: true,
        });
        this.$emit("data", {
          type: "spotify",
          own: false,
          title: genrePlaylist.name,
          uri: genrePlaylist.uri,
        });
        this.selection = 0;
        this.search = "";
      } else {
        this.favoriteGenres = await this.getUserFavoriteGenres();
        this.selection = 4;
      }
    },
    async spotifyPlayArtist(artist) {
      if (artist) {
        let searchedArtist = (await this.getArtist(artist))[0];
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Hier ist der Interpret ${searchedArtist.name}!\n Viel Spaß beim hören! 🎵`,
          speak: true,
        });
        this.$emit("data", {
          type: "spotify",
          own: false,
          title: searchedArtist.name,
          uri: searchedArtist.uri,
        });
        this.selection = 0;
        this.search = "";
      } else {
        this.favoriteArtists = await this.getUserFavoriteArtists();
        this.selection = 3;
      }
    },
    async spotifyPlayPlaylist(name) {
      if (name) {
        let searchedPlaylist = (await this.getPlaylists(name))[0];
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Hier ist die Playlist ${searchedPlaylist.name} von ${searchedPlaylist.owner} !\nIch hoffe sie gefällt dir. 🎵`,
          speak: true,
        });
        this.$emit("data", {
          type: "spotify",
          own: false,
          title: searchedPlaylist.name,
          uri: searchedPlaylist.uri,
        });
        this.selection = 0;
        this.search = "";
      } else {
        this.playlists = await this.getUserPlaylists();
        this.selection = 2;
      }
    },
    async spotifyWorkout() {
      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer motivierenden Sport Playlist für dich. 🎶",
      });

      let searchTerm = ["motivation", "workout", "sport"];
      let randomPlaylist = (await this.getPlaylists(searchTerm[Math.floor(Math.random() * searchTerm.length)]))[0];
      this.$emit("data", {
        type: "message",
        own: false,
        text: `Ich habe die Playlist ${randomPlaylist.name} von ${randomPlaylist.owner} gefunden! Ich hoffe sie gefällt dir. 🎵🏃‍♂️💪`,
        speak: true,
      });
      this.$emit("data", {
        type: "spotify",
        own: false,
        title: randomPlaylist.name,
        uri: randomPlaylist.uri,
      });
      this.selection = 0;
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
    this.selection = 5;
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
      this.selection = 0;
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
    selection: 0,
    question: false,
    activity: "",
    search : "",
    playlists: "",
    favoriteArtists: "",
    favoriteGenres: ""
  })
};
</script>

<style>
</style>