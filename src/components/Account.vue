<template>
  <v-list dense>
    <v-list-item two-line>
      <v-list-item-avatar color="indigo">
        <v-icon v-if="!loggedIn">mdi-account-circle</v-icon>
        <span v-else>{{ accountName.substring(0,2) }}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title> {{ accountName }} </v-list-item-title>
        <v-list-item-subtitle> {{ accountMessage }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div v-if="!loggedIn">
    <v-list-item @click="loginDialog = true; closeDrawer()">
      <v-list-item-icon><v-icon>mdi-login</v-icon></v-list-item-icon>
      <v-list-item-title> Login </v-list-item-title>
    </v-list-item>
    <v-list-item @click="registrationDialog = true; closeDrawer()">
      <v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>
      <v-list-item-title> Registrieren </v-list-item-title>
    </v-list-item>
    </div>
    <v-list-item v-if="loggedIn" @click="logout">
      <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
      <v-list-item-content> Logout </v-list-item-content>
    </v-list-item>
    <Registration v-model="registrationDialog" />
    <Login v-model="loginDialog" />
  </v-list>
</template>

<script>
import Login from './Login.vue';
import Registration from "./Registration.vue";
export default {
  components: { Registration, Login },
  data: () => ({
    registrationDialog: false,
    loginDialog: false,
  }),
  computed: {
    loggedIn() {
      return this.$globals.loggedIn;
    },
    accountName() {
      return this.loggedIn ? this.$globals.email : 'Anonymous'
    },
    accountMessage() {
      return this.loggedIn ? 'Du bist angemeldet! :)' : 'Nicht angemeldet!'
    }
  },
  methods: {
    closeDrawer() {
      this.$globals.setDrawer(false);
    },
    logout() {
      this.$globals.setLoggedIn(false);
      this.$globals.setEmail(null);
    }
  }
};
</script>

<style>
</style>