<template>
  <div class="home">
    <Welcome v-if="!loggedIn" />
    <Agent v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";
import Agent from '../components/Agent.vue';

export default {
  name: "Home",
  components: {
    Welcome,
    Agent,
  },
  computed: {
    loggedIn() {
      return this.$globals.loggedIn;
    },
  },
};
</script>
