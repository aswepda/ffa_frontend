<template>
  <v-card :max-width="maximumWidth">
    <v-card-title> {{city}} </v-card-title>
    <v-card-subtitle> {{weekday}}, {{time}}, {{condition}}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="7" class="flex-grow-1 flex-shrink-0">
          <div class="d-flex align-start">
            <div class="text-h1 text--primary">{{temperature ? temperatureFormatted : '-'}}</div>
            <div class="text-h4 text--primary font-weight-light">°C</div>
          </div>
        </v-col>
        <v-col cols="5" class="flex-grow-0 flex-shrink-1">
          <v-img max-height="110" :src="weatherIcon" contain />
        </v-col>
      </v-row>
      <v-row align-content="space-around">
        <v-col>
          <div class="d-flex flex-column align-center">
            <img src="@/assets/img/weather/humidity.svg" height="40px" alt="Luftfeuchte"/>
            <div>{{humidity}}% Luftfeuchte</div>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column align-center">
            <img src="@/assets/img/weather/wind.svg" height="40px" alt="Windgeschwindigkeit"/>
            <div>{{windspeed}} km/h Windgeschwindigkeit</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import width from "../../mixins/width";
const weatherIcons = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'overcast',
  '02n': 'overcast_night',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'clouds',
  '04n': 'clouds',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snowing',
  '13n': 'snowing',
  '50d': 'mist',
  '50n': 'mist'
}
export default {
  mixins: [width],
  props: {
    city: String,
    icon: String,
    temperature: Number,
    windspeed: Number,
    humidity: Number,
    condition: String,
    now: {
      type: Date,
      default: () => {return new Date()}
    }
  },
  computed: {
    weekday() {
      return this.now.toLocaleString(window.navigator.language, {weekday: 'long'})
    },
    time() {
      return this.now.toLocaleString(window.navigator.language, {hour: 'numeric'})
    },
    weatherIcon() {
      return require(`@/assets/img/weather/${weatherIcons[this.icon]}.svg`);
    },
    temperatureFormatted() {
      return this.temperature.toFixed(2).replace('.',',');
    }
  }
};
</script>

<style>
</style>