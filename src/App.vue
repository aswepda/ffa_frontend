<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ASWE<b>PDA</b></v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      dark
      height="100%"
    >
      <template #prepend>
        <Account />
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item to="/">
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title> Home </v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-icon><v-icon>mdi-information</v-icon></v-list-item-icon>
          <v-list-item-title> About </v-list-item-title>
        </v-list-item>
        <v-list-item to="/test">
          <v-list-item-title> Dynamischer Test </v-list-item-title>
        </v-list-item>
      </v-list>
      <template #append>
        <v-divider />
        <v-list nav dense>
          <v-list-item @click="toggleTheme">
            <v-list-item-icon
              ><v-icon>mdi-theme-light-dark</v-icon></v-list-item-icon
            >
            <v-list-item-title> Theme wechseln </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app absolute>
      <div class="mx-auto">
        &copy; {{ new Date().getFullYear() }} ASWE<b>PDA</b> Team
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Account from "./components/Account.vue";

export default {
  name: "App",

  components: {
    Account,
  },

  data: () => ({
    registrationDialog: false,
    authCode: "",
  }),
  computed: {
    drawer: {
      get() {
        return this.$globals.drawer;
      },
      set(value) {
        this.$globals.setDrawer(value);
      },
    },
  },
  methods: {
    async toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
}
</style>
