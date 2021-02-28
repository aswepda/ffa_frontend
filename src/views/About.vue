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
    </v-container>
  </div>
</template>

<script>
import Location from "../components/content/Location.vue";
export default {
  components: { Location },
};
</script>