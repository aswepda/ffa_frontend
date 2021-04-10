<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" @click.middle="debugDialog = true"></v-app-bar-nav-icon>
      <v-toolbar-title>FFA</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      src="@/assets/img/pda_background.jpg"
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
        <!--<v-list-item to="/about">
          <v-list-item-icon><v-icon>mdi-information</v-icon></v-list-item-icon>
          <v-list-item-title> About </v-list-item-title>
        </v-list-item>-->
        <v-list-item to="/agent">
          <v-list-item-icon><v-icon>mdi-face-agent</v-icon></v-list-item-icon>
          <v-list-item-title> Agent </v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings">
          <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-title> Einstellungen </v-list-item-title>
        </v-list-item>
      </v-list>
      <template #append>
        <v-divider />
        <v-text-field label="Backend" v-model="backendURL" class="mx-2 mt-3 mb-0" hide-details="auto" outlined @keyup.enter="setBackend"/>
        <notification-manager class="mx-3 mb-4"/>
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
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-container>
    </v-main>
    <v-footer app absolute>
      <div class="mx-auto text-center">
        &copy; {{ new Date().getFullYear() }} <strong>FFA</strong> Team
        <br>
        <span class="font-weight-light text-body-2">Release <a :href="releaseURL" target="_blank">{{gitHash}}</a></span>
      </div>
    </v-footer>
    <v-snackbar bottom right :value="updateExists" :timeout="-1" color="primary">
      Eine neue Version ist verfügbar!
      <template #action>
        <v-btn text @click="refreshApp" :loading="initiatedRefresh" outlined> Aktualisieren </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar bottom multi-line :value="!online" :timeout="-1" color="error">
      <div class="d-flex align-center">
        <div><v-icon left>mdi-network-strength-off</v-icon></div>
        <div>Du scheinst offline zu sein..<br>Manche Funktionen werden wahrscheinlich nicht wie erwartet funktionieren.</div>
      </div>
    </v-snackbar>
    <debug v-model="debugDialog"/>
  </v-app>
</template>

<script>
import Account from "./components/Account.vue";
import Debug from "./components/dialogs/Debug.vue";
import NotificationManager from './components/NotificationManager.vue';
import update from "./mixins/update";

export default {
  name: "App",

  components: {
    Account,
    Debug,
    NotificationManager,
  },
  data: () => ({
    registrationDialog: false,
    authCode: "",
    backendURL: "https://pda-backend.herokuapp.com",
    debugDialog: false,
    online: navigator.onLine
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
    gitHash() {
      return process.env.VUE_APP_GIT_HASH;
    },
    releaseURL() {
      return `https://github.com/aswepda/pda_frontend/commit/${this.gitHash}`;
    }
  },
  methods: {
    async toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    setBackend() {
      this.$http.defaults.baseURL = this.backendURL;
    },
    updateOnlineStatus(e) {
        const { type } = e;
        this.online = type === 'online';
    }
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  mixins: [update],
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
.v-navigation-drawer {
  overflow-y: auto
}
</style>
