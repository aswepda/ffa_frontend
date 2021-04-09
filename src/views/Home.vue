<template>
  <div class="home">
    <v-row class="mb-6">
      <v-col sm=12 md=7>
        <h1 class="text-h2">Willkommen beim <strong>F</strong>ood & <strong>F</strong>itness <strong>A</strong>gent!</h1>
        <h2 class="text-subtitle-1">Dein persönlicher Agent für deinen ganzen Tag egal ob früh oder spät!</h2>
      </v-col>
      <v-col sm=12 md=5>
        <v-img src="/img/hikedude.png" class="mx-auto" contain max-width="60%"></v-img>
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
              <br>
              Agent
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Der <strong>FFA</strong> unterstützt dich mithilfe von auf den Alltag zugeschnittenen Routinen. :)
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center">
              <v-icon x-large>mdi-alarm</v-icon>
              <br>
              Erinnerungen
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Mithilfe schlauer Erinnerungen erinnert dich <strong>FFA</strong> an deine Routinen und Abläufe!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center titlewrap">
              <v-icon x-large>mdi-spotify</v-icon>
              <br>
              Spotify Integration
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Mithilfe der Spotify Integration schlägt dir <strong>FFA</strong> mit Sicherheit Lieder vor die dir gefallen könnten. 🎶
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3">
        <v-card height="100%">
          <v-card-title>
            <div class="mx-auto text-center titlewrap">
              <v-icon x-large>mdi-calendar</v-icon>
              <br>
              Google Kalender Integration
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            Durch die Google Kalender Integration kann dich <strong>FFA</strong> auch bei deiner Tages- und Terminplanung unterstützen! 📅
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex mt-4 justify-center">
      <v-btn @click="crunch"><v-icon left>{{appleIcon}}</v-icon> APFEL</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    applestate: true
  }),
  computed: {
    loggedIn() {
      return this.$globals.loggedIn;
    },
    appleIcon() {
      if (this.applestate) {
        return "mdi-food-apple"
      } else {
        return "mdi-food-apple-outline"
      }
    }
  },
  methods: {
    crunch() {
      this.applestate = !this.applestate
      if(!this.applestate) {
        new Audio("/FOODEat_Apple crunched 1 (ID 1113)_BSB.mp3").play();
      }
    }
  }
};
</script>

<style>
.titlewrap {
  word-break: normal;
}
</style>
