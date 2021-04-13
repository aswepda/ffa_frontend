<template>
  <v-card color="#350A67" dark height="100%">
    <v-card-title
      ><span>Guten Abend!</span><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Guten Abend {{ firstName }}! Für deinen Abend habe ich dir einige Dinge
      vorbereitet. 😊</v-card-text
    >
    <v-card-actions v-if="(selection == 0)">
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="test">
          <v-icon left small>mdi-message</v-icon>Guten Abend!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weatherTomorrow"><v-icon left small>mdi-weather-partly-cloudy</v-icon>Wie wird das
          Wetter morgen?
        </v-btn>
        <v-btn
          class="ml-2 mb-1"
          outlined
          rounded
          small
          @click="calendarTomorrow"><v-icon left small>mdi-calendar</v-icon>Was steht morgen an?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotify">
          <v-icon left small>mdi-spotify</v-icon>Etwas Musik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="wakeUpTime">
          <v-icon left small>mdi-subway-variant</v-icon>Wann muss ich morgen
          aufstehen?
        </v-btn>
      </div>
    </v-card-actions>
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
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlaySleepMusic()">
            <v-icon left small>mdi-spotify</v-icon>Einschlafmusik spielen
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="selection = 0">
            <v-icon left small>mdi-arrow-left</v-icon>Zurück
          </v-btn>
        </div>
      </v-card-actions>
    </div>
    <div v-if="(selection == 2)">
      <v-card-actions>
        <div class="d-flex">
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
        <div class="d-flex">
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
        <div class="d-flex">
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
import CalendarVue from "../../mixins/api/Calendar.vue";
import DirectionsVue from "../../mixins/api/Directions.vue";
import SpotifyVue from "../../mixins/api/Spotify.vue";
import WeatherVue from "../../mixins/api/Weather.vue";

/*
selections:
0 : nothing
1 : select kind of spotify seach
2 : select playlist
3 : select artist
4 : select genre
*/

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
      try {
        let events = await this.getEvents("today");
        this.$emit("data", {
          type: "message",
          own: false,
          speak: true,
          text: `Hey ${
            this.firstName
          }! Ich hoffe du hattest einen schönen Tag heute. 🌞 \n
          Du hattest heute ${events.length} Termin${
            events.length != 1 ? "e" : ""
          }. ${
            events.length == 0
              ? "Du hast deine freie Zeit gut genutzt! 😊"
              : "Das war ein produktiver Tag! 💪"
          }`,
        });
      } catch (e) {
        console.error(e);
        this.$emit("data", {
          type: "message",
          own: false,
          text: `Hey ${this.firstName}! Ich hoffe du hattest einen schönen Tag heute. 🌞`,
          speak: true,
        });
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
        let weatherTomorrow = weather.daily[1];
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
          dateString: "Morgen",
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
    async spotifyPlaySleepMusic() {
      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer Playlist zum Einschlafen. 😴🎶",
      });

      let searchTerm = ["ruhig", "calm", "schlaf", "sleep"];
      let randomPlaylist = (await this.getPlaylists(searchTerm[Math.floor(Math.random() * searchTerm.length)]))[0];
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
      this.selection = 0;
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
          if (this.$globals.getSetting("workplace")) {
            let mode = this.$globals.getSetting("directionMode") || "driving";
            let workplace = this.$globals.getSetting("workplace");
            let direction = await this.getDirection(workplace, mode);
            let hours = Math.floor(direction.value / 60 / 60);
            let minutes = Math.round((direction.value / 60) % 60);
            this.$emit("data", {
              type: "message",
              own: false,
              speak: true,
              text: `Dein erster Termin heißt ${events[0].title} und beginnt um ${events[0].start.getHours()}:${events[0].start.getMinutes()} Uhr! \n
              Zu deiner Arbeitsstelle ${workplace} wirst du morgen ${this.parseDirectionText(mode)} etwa ${hours} Stunden und ${minutes} Minuten benötigen!`,
            });
          } else {
              this.$emit("data", {
              type: "message",
              own: false,
              speak: true,
              text: `Dein erster Termin heißt ${events[0].title} und beginnt um ${events[0].start.getHours()}:${events[0].start.getMinutes()} Uhr!`,
              });
          }
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
  data: () => ({
    selection: 0,
    search: "",
    playlists: "",
    favoriteArtists: "",
    favoriteGenres: ""
  }),
};
</script>

<style>
</style>