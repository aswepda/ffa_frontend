<template>
  <div class="home">
    <v-row class="mb-6">
      <v-col sm="12" md="7">
        <h1 class="text-h2">
          Willkommen beim <strong>F</strong>ood & <strong>F</strong>itness
          <strong>A</strong>gent!
        </h1>
        <h2 class="text-subtitle-1">
          Dein persönlicher Agent für deinen ganzen Tag egal ob früh oder spät!
        </h2>
      </v-col>
      <v-col sm="12" md="5">
        <v-img
          src="@/assets/img/hikedude.png"
          class="mx-auto"
          contain
          max-width="60%"
        ></v-img>
      </v-col>
    </v-row>
    <v-btn to="/agent" block class="mb-6" color="primary">Loslegen!</v-btn>
    <h2 class="text-h4 mb-2">Features</h2>
    <v-row>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center">
              <v-icon x-large>mdi-face-agent</v-icon>
              <br />
              Agent
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Der <strong>FFA</strong> unterstützt dich mithilfe von auf den
            Alltag zugeschnittenen Routinen. :)
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center">
              <v-icon x-large>mdi-alarm</v-icon>
              <br />
              Erinnerungen
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Mithilfe schlauer Erinnerungen erinnert dich <strong>FFA</strong> an
            deine Routinen und Abläufe!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center titlewrap">
              <v-icon x-large>mdi-spotify</v-icon>
              <br />
              Spotify Integration
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Mithilfe der Spotify Integration schlägt dir
            <strong>FFA</strong> mit Sicherheit Lieder vor die dir gefallen
            könnten. 🎶
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center titlewrap">
              <v-icon x-large>mdi-calendar</v-icon>
              <br />
              Google Kalender Integration
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Durch die Google Kalender Integration kann dich
            <strong>FFA</strong> auch bei deiner Tages- und Terminplanung
            unterstützen! 📅
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <hr class="mt-6" />
    <h2 class="text-h4 mb-2 mt-6">Beispiel</h2>
    <div class="exampleChat">
      <Chat :defaultMessages="exampleMessages" />
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat";
export default {
  components: { Chat },
  name: "Home",
  computed: {
    loggedIn() {
      return this.$globals.loggedIn;
    },
  },
  data: () => ({
    exampleMessages: [
      {
        type: "message",
        own: true,
        text: "Guten Morgen!",
        date: new Date("Sun Apr 11 2021 12:05:33 GMT+0200"),
        id: 0.39636840620814495,
      },
      {
        type: "message",
        own: false,
        text: "Guten Morgen! Ich hoffe du hast heute einen schönen Tag. 🌞",
        speak: true,
        date: new Date("Sun Apr 11 2021 12:05:33 GMT+0200"),
        id: 0.7637131559215018,
      },
      {
        type: "message",
        own: true,
        text: "Wie ist denn das Wetter so?",
        date: new Date("Sun Apr 11 2021 12:05:40 GMT+0200"),
        id: 0.4311579207912648,
      },
      {
        type: "message",
        own: false,
        text: "Ich schaue kurz für dich nach! 🔎",
        date: new Date("Sun Apr 11 2021 12:05:40 GMT+0200"),
        id: 0.8937918288524249,
      },
      {
        type: "message",
        own: false,
        text:
          "In Ludwigsburg ist es momentan 16,45°C bei 44% Luftfeuchtigkeit. ⛅",
        speak: true,
        date: new Date("Sun Apr 11 2021 12:05:48 GMT+0200"),
        id: 0.07648951990133912,
      },
      {
        type: "weather",
        own: false,
        city: "Ludwigsburg",
        icon: "02d",
        temperature: 16.450000000000045,
        windspeed: 3.09,
        humidity: 44,
        condition: "Ein paar Wolken",
        id: 0.8548020336591997,
      },
      {
        type: "message",
        own: true,
        text: "Wie lange brauche ich gerade zur Arbeit?",
        date: new Date("Sun Apr 11 2021 12:14:05 GMT+0200"),
        id: 0.31331477598406643,
      },
      {
        type: "message",
        own: false,
        text: "Warte kurz, während ich das für dich nachschlage..",
        date: new Date("Sun Apr 11 2021 12:14:05 GMT+0200"),
        id: 0.23417613341118493,
      },
      {
        type: "message",
        own: false,
        text:
          "Zu deiner Arbeitsstelle DHBW Stuttgart Fakultät Technik würdest du momentan mit ÖPNV etwa 1 Stunden und 18 Minuten benötigen!",
        speak: true,
        date: new Date("Sun Apr 11 2021 12:14:12 GMT+0200"),
        id: 0.35540869144409504,
      },
    ],
  }),
};
</script>

<style>
.titlewrap {
  word-break: normal;
}
.exampleChat {
  position: relative;
}
.exampleChat::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 90%
  );
  width: 100%;
  height: 5em;
}
.exampleChat::after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 90%
  );
  width: 100%;
  height: 5em;
  margin-bottom: -12px;
  margin-left: -15px;
}
</style>
