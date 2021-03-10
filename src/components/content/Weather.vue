<template>
  <v-card :max-width="maximumWidth">
    <v-card-title> Stuttgart </v-card-title>
    <v-card-subtitle> Montag, 01:00 Uhr, Bewölkt</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="7" class="flex-grow-1 flex-shrink-0">
          <div class="d-flex align-start">
            <div class="text-h1 text--primary">12</div>
            <div class="text-h4 text--primary font-weight-light">°C</div>
          </div>
        </v-col>
        <v-col cols="5" class="flex-grow-0 flex-shrink-1">
          <v-img src="/img/weather/clouds.svg" contain />
        </v-col>
      </v-row>
      <v-row align="space-around">
        <v-col>
          <div class="d-flex flex-column align-center">
            <img src="/img/weather/precipation.svg" height="40px"/>
            <div>3% Regenwahrscheinlichkeit</div>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column align-center">
            <img src="/img/weather/wind.svg" height="40px"/>
            <div>12km/h Windgeschwindigkeit</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import width from "../../mixins/width";
export default {
  mixins: [width],
};
</script>

<style>
</style>