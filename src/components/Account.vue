<template>
  <div class="account">
    <v-list dense>
      <v-list-item two-line>
        <v-list-item-avatar color="indigo">
          <v-icon v-if="!$globals.loggedIn">mdi-account-circle</v-icon>
          <img v-else-if="accountIcon" :src="accountIcon" />
          <span v-else>{{ accountName.substring(0, 2) }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title> {{ accountName }} </v-list-item-title>
          <v-list-item-subtitle> {{ accountMessage }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-if="!$globals.loggedIn">
        <v-list-item @click="authGoogle()">
          <v-list-item-icon><v-icon>mdi-google</v-icon></v-list-item-icon>
          <v-list-item-title> Anmelden mit Google </v-list-item-title>
        </v-list-item>
      </div>
      <v-list-item v-if="$globals.loggedIn" @click="logout">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-title> Logout Google</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list dense>
      <v-list-item v-if="!$globals.spotifyLoggedIn" @click="$refs.spotify.login()">
        <v-list-item-icon><v-icon>mdi-spotify</v-icon></v-list-item-icon>
        <v-list-item-title> Anmelden mit Spotify </v-list-item-title>
      </v-list-item>
      <v-list-item v-else @click="logoutSpotify">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-title> Logout Spotify </v-list-item-title>
      </v-list-item>
    </v-list>
    <spotify-authentication ref="spotify" />
  </div>
</template>

<script>
import SpotifyAuthentication from "./auth/SpotifyAuthentication.vue";

export default {
  components: { SpotifyAuthentication },
  data: () => ({
    accountIcon: "",
  }),
  computed: {
    accountName() {
      return this.$globals.loggedIn && this.$globals.email
        ? this.$globals.email
        : "Anonymous";
    },
    accountMessage() {
      return this.$globals.loggedIn ? "Du bist angemeldet! :)" : "Nicht angemeldet!";
    },
  },
  methods: {
    closeDrawer() {
      this.$globals.setDrawer(false);
    },
    logout() {
      this.$globals.setEmail(null);
      this.$globals.setCredentials(null);
      this.accountIcon = null;
    },
    logoutSpotify() {
      this.$globals.setSpotifyCredentials(null);
    },
    async authGoogle() {
      try {
        this.authCode = await this.$gAuth.getAuthCode();
        let authorizationResult = await this.$http.post("auth/google", {
          code: this.authCode,
        });
        if (authorizationResult.data.credentials) {
          this.$globals.setCredentials(authorizationResult.data.credentials);
          await this.refreshGoogleInfo();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async refreshGoogleInfo() {
      if (this.$globals.loggedIn && this.$globals.credentials) {
        try {
          let accountResult = await this.$http.get("auth/google", {
            headers: {
              Authorization: this.$globals.credentials,
            },
          });
          this.$globals.setFirstName(accountResult.data.given_name);
          this.$globals.setEmail(accountResult.data.email);
          this.accountIcon = accountResult.data.picture;
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  async created() {
    this.refreshGoogleInfo();
  },
};
</script>

<style>
</style>