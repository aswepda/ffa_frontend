<template>
  <div class="about">
    <v-container>
      <h1 class="text-h3 mt-3">Über ASWE<b>PDA</b></h1>
      <p class="subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut alias
        inventore dicta provident quasi accusantium quaerat veniam obcaecati!
        Fugiat id nulla natus distinctio voluptatem repellat pariatur architecto
        non esse explicabo.
      </p>
      <v-row justify="start" class="mb-4">
        <v-card max-width="480">
          <v-card-subtitle
            >pda am {{ new Date().toLocaleString() }}</v-card-subtitle
          >
          <v-card-text class="text--primary"
            >Ich dachte, dieser Ort könnte dich vielleicht
            interessieren!</v-card-text
          >
        </v-card>
      </v-row>
      <v-row justify="start" class="mb-4">
        <Location
          lon="9.174249"
          lat="48.784708"
          title="DHBW Stuttgart"
          :rating="3.5"
          :rating-count="413"
          url="https://dhbw-stuttgart.de"
        >
          Die Duale Hochschule Baden-Württemberg ist seit dem 1. März 2009 eine
          staatliche duale Hochschule in Baden-Württemberg, die duale
          Studiengänge anbietet. Sie ist, unter Einbeziehung aller
          Studienakademien, die nach Studierendenzahl größte Hochschule des
          Landes und, wie die meisten Hochschulen in Baden-Württemberg, eine
          Körperschaft des öffentlichen Rechts.
        </Location>
      </v-row>
      <v-row justify="start" class="mb-4">
        <weather icon="01d" temperature="20" city="Stuttgart" :humidity="28" windspeed="3" condition="Sonnig"/>
      </v-row>
      <v-row justify="start" align="stretch">
        <v-col class="col-md-6">
        <v-card color="#245535" dark elevation="12" height="100%">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text class="pb-1">⭐ Empfohlen</v-card-text>
              <v-card-title class="pt-0"> Sport 🏀 </v-card-title>
              <v-card-subtitle>
                Lust auf ein bisschen Sport? :)
              </v-card-subtitle>
              <v-card-actions class="card-actions">
                <v-btn class="ml-2 mt-5 mb-1" outlined rounded small>
                  Los geht's!
                </v-btn>
              </v-card-actions>
            </div>
            <v-img
              contain
              class="ma-3"
              src="/img/test.png"
              max-width="40%"
              max-height="130"
            ></v-img>
          </div>
        </v-card>
        </v-col>
        <v-col class="col-md-6">
        <v-card color="#350A67" dark height="100%">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title> Gute Nacht 🌃</v-card-title>
              <v-card-subtitle>
                Deine Abendroutine
              </v-card-subtitle>
              <v-card-actions class="card-actions">
                <v-btn class="ml-2 mt-5 mb-1" outlined rounded small>
                  Los geht's!
                </v-btn>
              </v-card-actions>
            </div>
            <v-img
              contain
              class="ma-3"
              src="/img/sleep_cloud.png"
              max-width="40%"
              max-height="130"
            ></v-img>
          </div>
        </v-card>
        </v-col>
      </v-row>
      <v-row justify="start" class="mb-4" align="stretch">
        <v-col class="col-md-6">
          <Action imageURL="/img/morning.png" color="#F47458" title="Guten Morgen ☕">
            Guten Morgen! Deine Routine für den Start in den Tag. :)
          </Action>
        </v-col>
        <v-col class="col-md-6">
          <Action imageURL="/img/eat.png" color="#365DA4" title="Essen 🥗">
            Frühstück, Mittagessen oder Abendessen?<br>Deine Routine für jeden Hunger.
          </Action>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Action from '../components/usecases/ActionCard.vue';
import Location from "../components/content/Location.vue";
import Weather from '../components/content/Weather.vue';
export default {
  components: { Location, Weather, Action },
};
</script>

<style scoped>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>