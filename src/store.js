import Vue from 'vue';
export var globalStore = new Vue({
  name: 'store',
  data() {
    return {
      notificationStorage: [],
      email: "",
      drawer: null,
      credentials: '',
      spotifyCredentials: '',
      firstName: '',
      notificationsEnabled: false,
      settings: {}
    }
  },
  created() {
    this.email = JSON.parse(window.localStorage.getItem('email'));
    this.credentials = JSON.parse(window.localStorage.getItem('credentials'));
    this.spotifyCredentials = JSON.parse(window.localStorage.getItem('spotifycredentials'))
    this.notificationsEnabled = JSON.parse(window.localStorage.getItem('notificationsEnabled'))
    this.settings = JSON.parse(window.localStorage.getItem('settings')) || {}
  },
  computed: {
    activeNotifications() {
      return this.notificationStorage.filter(notification => notification.active);
    },
    loggedIn() {
      return !!this.credentials
    },
    spotifyLoggedIn() {
      return !!this.spotifyCredentials
    },
    name() {
      return this.settings.name || this.firstName
    }
  },
  methods: {
    setSetting(setting, value) {
      this.settings[setting] = value;
      window.localStorage.setItem('settings', JSON.stringify(this.settings))
    },
    getSetting(setting) {
      if (setting in this.settings)
        return this.settings[setting]
      return null;
    },
    setDrawer(state) {
      this.drawer = state;
    },
    setFirstName(name) {
      this.firstName = name
    },
    setEmail(email) {
      this.email = email;
      window.localStorage.setItem('email', JSON.stringify(email))
    },
    setCredentials(credentials) {
      this.credentials = credentials;
      window.localStorage.setItem('credentials', JSON.stringify(credentials))
    },
    setSpotifyCredentials(credentials) {
      this.spotifyCredentials = credentials;
      window.localStorage.setItem('spotifycredentials', JSON.stringify(credentials))
    },
    addNotification(message, status, icon, timeout) {
      var notificationObj = { message, status, icon, active: true, id: Math.random() };
      this.notificationStorage.push(notificationObj);
      if (timeout) {
        setTimeout(() => {
          notificationObj.active = false;
        }, timeout);
      }
    },
    setNotificationsEnabled(state) {
      this.notificationsEnabled = state;
      window.localStorage.setItem('notificationsEnabled', JSON.stringify(state))
    }
  },
});