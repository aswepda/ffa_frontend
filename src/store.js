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
      notificationsEnabled: false
    }
  },
  created() {
    this.email = JSON.parse(window.localStorage.getItem('email'));
    this.credentials = JSON.parse(window.localStorage.getItem('credentials'));
    this.spotifyCredentials = JSON.parse(window.localStorage.getItem('spotifycredentials'))
    this.notificationsEnabled = JSON.parse(window.localStorage.getItem('notificationsEnabled'))
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
    }
  },
  methods: {
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