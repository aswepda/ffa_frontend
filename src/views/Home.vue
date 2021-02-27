<template>
  <div class="home">
    <Welcome v-if="!loggedIn" />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";

export default {
  name: "Home",
  components: {
    Welcome,
  },
  computed: {
    loggedIn() {
      return this.$globals.loggedIn;
    },
  },
};
</script>
