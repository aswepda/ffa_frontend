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
    <v-card-actions v-if="(selection == 0)">
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
        <v-btn class="ml-2 mb-1" outlined rounded small @click="spotify">
          <v-icon left small>mdi-spotify</v-icon>Etwas Musik bitte!
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="dirWork">
          <v-icon left small>mdi-subway-variant</v-icon>Wie lange brauche ich
          zur Arbeit?
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
          <v-btn class="ml-2 mb-1" outlined rounded small @click="spotifyPlayMorningMusic()">
            <v-icon left small>mdi-spotify</v-icon>"Guten Morgen" Musik spielen
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
    async spotifyPlayMorningMusic() {
      this.$emit("data", {
        type: "message",
        own: false,
        text:
          "Natürlich! Ich suche kurz nach einer Playlist für einen guten Morgen. 🎶🌄",
      });

      let searchTerm = ["guten morgen", "morning", "good morning"];
      let randomPlaylist = (await this.getPlaylists(searchTerm[Math.floor(Math.random() * searchTerm.length)]))[0];
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
      this.selection = 0;
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
        if(ex instanceof window.GeolocationPositionError) {
          this.$emit("data", {
            type: "message",
            own: false,
            text:
              "Ich hatte leider Probleme bei deiner Standortabfrage! Prüfe bitte ob du diese Anwendung dazu berechtigt hast deinen Standort abzurufen! 🚧",
          });
        } else {
          this.$emit("data", {
            type: "message",
            own: false,
            text:
              "Ich konnte deinen Arbeitsplatz leider nicht finden. Bitte schaue in den Einstellungen nach, ob du ihn korrekt geschrieben hast. 👀"
          })
        }
        
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