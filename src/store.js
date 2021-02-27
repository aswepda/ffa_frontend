import Vue from 'vue';
export var globalStore = new Vue({
  name: 'store',
  data() {
    return {
      notificationStorage: [],
      email: "",
      drawer: null,
      loggedIn: false,
    }
  },
  created() {
    this.loggedIn = JSON.parse(window.localStorage.getItem('loggedIn'));
    this.email = JSON.parse(window.localStorage.getItem('email'));
  },
  computed: {
    activeNotifications() {
      return this.notificationStorage.filter(notification => notification.active);
    }
  },
  methods: {
    setDrawer(state) {
      this.drawer = state;
    },
    setEmail(email) {
      this.email = email;
      window.localStorage.setItem('email', JSON.stringify(email))
    },
    setLoggedIn(state) {
      window.localStorage.setItem('loggedIn', JSON.stringify(state))
      this.loggedIn = state;
    },
    addNotification(message, status, icon, timeout) {
      var notificationObj = { message, status, icon, active: true, id: Math.random() };
      this.notificationStorage.push(notificationObj);
      if (timeout) {
        setTimeout(() => {
          notificationObj.active = false;
        }, timeout);
      }
    }
  },
});