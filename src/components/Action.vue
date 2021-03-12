<template>
  <v-card :color="color" dark height="100%">
    <div class="d-flex flex-no-wrap justify-space-between action-content">
      <div class="d-flex flex-column">
        <v-card-text class="pb-1" v-if="featured">⭐ Empfohlen</v-card-text>
        <v-card-title :class="featured ? 'pt-0' : ''"> {{title}} </v-card-title>
        <v-card-subtitle> <slot/> </v-card-subtitle>
        <v-card-actions class="mt-auto">
          <v-btn class="ml-2 mt-5 mb-1" outlined rounded small @click="letsgo">
            Los geht's!
          </v-btn>
        </v-card-actions>
      </div>
      <v-img
        contain
        class="ma-3"
        :src="imageURL"
        max-width="40%"
        max-height="130"
      ></v-img>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    featured: Boolean,
    imageURL: String,
    color: String,
    title: String,
  },
  methods: {
    letsgo() {
      this.$emit('clicked');
    }
  }
};
</script>

<style>
.action-content {
  height: 100%
}
</style>