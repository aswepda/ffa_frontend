<template>
  <v-card color="#365DA4" dark height="100%">
    <v-card-title
      ><span>{{ mealText }}! {{ mealEmoji }}</span
      ><v-spacer></v-spacer
      ><v-btn icon @click="close" class="ml-auto"
        ><v-icon>mdi-close</v-icon></v-btn
      ></v-card-title
    >
    <v-card-text
      >Hey {{ firstName }}! Ich bin dir beim Planen deiner nächsten Mahlzeit
      gerne behilflich! 😊</v-card-text
    >
    <v-card-actions v-if="!selection">
      <div class="d-flex flex-wrap">
        <v-btn class="ml-2 mb-1" outlined rounded small @click="nextBreak">
          <v-icon left small>mdi-clock</v-icon>Wann kann ich Pause machen?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="weather">
          <v-icon left small>mdi-weather-partly-cloudy</v-icon>Wie wird denn
          das Wetter zur Mittagspause?
        </v-btn>
        <v-btn class="ml-2 mb-1" outlined rounded small @click="places">
          <v-icon left small>mdi-chef-hat</v-icon>Zeige mir ein Restaurant in meiner Nähe
        </v-btn>
      </div>
    </v-card-actions>
    <div v-if="selection">
      <v-card-actions>
        <div class="d-flex flex-wrap" >
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('italienisches Restaurant')">
          <v-icon left small>mdi-pizza</v-icon>Italienisches Restaurant
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('mexikanisch Restaurant')">
          <v-icon left small>mdi-chili-mild</v-icon>Mexikanisches Restaurant
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('Fast Food')">
          <v-icon left small>mdi-food</v-icon>Fast Food
          </v-btn>
          <v-btn class="ml-2 mb-1" outlined rounded small @click="search_places('Bäcker')">
          <v-icon left small>mdi-baguette</v-icon>Bäcker
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
import CalendarVue from "../../mixins/api/Calendar.vue";
import WeatherVue from "../../mixins/api/Weather.vue";
import PlacesVue from "../../mixins/api/Places.vue";
import DirectionsVue from "../../mixins/api/Directions.vue";
export default {
  methods: {
    close() {
      this.$emit("closed");
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
          text: `In ${weather.name} wird das Wetter mittags ${(
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
    async places(){
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Zeige mir ein Restaurant in meiner Nähe an.",
      });
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Auf was hättest du heute Lust?",
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
      this.selection = false
       this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich habe " + rResult.name + " für dich gefunden, lass es dir schmecken",
        speak: true,
      });
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
          text: `Zu diesem Restaurant würdest du momentan ${this.parseDirectionText(mode)} etwa ${hours} Stunden und ${minutes} Minuten benötigen!`,
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
    async nextBreak() {
      this.$emit("data", {
        type: "message",
        own: true,
        text: "Wann hätte ich Zeit für meine Pause?",
      });
      if (!this.$globals.credentials) {
        this.$emit("data", {
          type: "message",
          own: false,
          text:
            "Du scheinst nicht mit Google angemeldet zu sein! Damit ich deine Kalendereinträge analysieren kann musst du dich mit Google anmelden.",
        });
        return;
      }
      this.$emit("data", {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎📅",
      });
      try {
        let freeTime = await this.getFreetime();
        if (!freeTime) {
          this.$emit("data", {
            type: "message",
            own: false,
            text:
              "Du hast die nächsten 4 Stunden frei! Genieße deine Pause. 🌻",
          });
        } else {
          console.log(freeTime);
          this.$emit("data", {
            type: "message",
            own: false,
            text: `Du hast zwischen ${freeTime.start
              .toLocaleTimeString(window.navigator.language)
              .substr(0, 5)} und ${freeTime.ende
              .toLocaleTimeString(window.navigator.language)
              .substr(0, 5)} Uhr ${
              freeTime.Dauer
            } Minuten Zeit für deine nächste Pause.`,
            speak: true,
          });
          this.$emit("data", {
            type: "calendar",
            own: false,
            events: [{
              timed: true,
              name: "Pause",
              start: freeTime.start,
              end: freeTime.ende
            }],
            openOnClick: false
          })
        }
      } catch (ex) {
        console.error(ex);
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
    mealText() {
      let curHours = new Date().getHours();
      if (curHours >= 4 && curHours <= 10) return "Frühstück";
      if (curHours >= 11 && curHours <= 16) return "Mittagsessen";
      if (curHours >= 17 && curHours <= 22) return "Abendessen";
      return "Mitternachtssnack";
    },
    mealEmoji() {
      switch (this.mealText) {
        case "Frühstück":
          return "🥣";
        case "Mittagsessen":
          return "🥗";
        case "Abendessen":
          return "🍝";
        case "Mitternachtssnack":
          return "😉";
        default:
          return "";
      }
    },
    firstName() {
      return this.$globals.name || "du";
    },
  },
  mixins: [CalendarVue, WeatherVue, PlacesVue, DirectionsVue],

  data: ()=>({
    selection : false,
    search : ""
  })
};
</script>
<style>
</style>