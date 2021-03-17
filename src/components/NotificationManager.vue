<template>
  <div class="notificationmanager">
    <v-switch
      @change="changeState"
      v-model="enabled"
      label="Benachrichtigungen"
      :error-messages="errorMessages"
      hide-details="auto"
      :loading="loading"
    ></v-switch>
  </div>
</template>

<script>
export default {
  data: () => ({
    enabled: false,
    disallowed: false,
    unsupported: false,
    loading: false,
    interval: null,
    notifications: [
      {
        hour:  20,
        minute: 23,
        route: "test",
        message:
          "Guten Morgen!\nKlicke hier um gleich zu deiner Morgen-Routine zu kommen!",
        lastHandled: null,
      },
    ],
  }),
  created() {
    if (this.$globals.notificationsEnabled) {
      if (this.allowed) {
        this.enabled = true;
        this.startNotificationHandler();
      } else {
        this.$globals.setNotificationsEnabled(false);
      }
    }
  },
  methods: {
    startNotificationHandler() {
      this.interval = setInterval(this.handleNotifications, 10000);
    },
    handleNotifications() {
      for (let notification of this.notifications) {
        let curDate = new Date();
        let notDate = new Date();
        notDate.setHours(notification.hour, notification.minute);
        if (
          (curDate.valueOf() - notDate.valueOf() < 5 * 60 * 1000) &&
            notification.lastHandled == null ||
          curDate.valueOf() - notification.lastHandled > 10 * 60 * 1000
        ) {
          let notify = new Notification("FFA", {
            body: notification.message,
          });
          notify.onclick = function () {
            parent.focus();
            window.focus();
            this.close();
          };
          notification.lastHandled = curDate;
        }
      }
    },
    async changeState() {
      if (this.enabled) {
        await this.requestPermissions();
        if (this.allowed) {
          this.startNotificationHandler();
        }
      } else {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.$globals.setNotificationsEnabled(this.enabled);
    },
    async requestPermissions() {
      this.loading = true;
      if (!window.Notification) {
        console.log("Browser does not support notifications.");
        this.unsupported = true;
        this.enabled = false;
      } else {
        if (Notification.permission !== "granted") {
          let perm = await Notification.requestPermission();
          if (perm === "granted") {
            // show notification here
            new Notification("FFA", {
              body: "Benachrichtigungen aktiviert!",
            });
          } else {
            console.log("User blocked notifications.");
            this.disallowed = true;
            this.enabled = false;
          }
          this.loading = false;
        } else {
          new Notification("FFA", {
            body: "Benachrichtigungen aktiviert!",
          });
          this.loading = false;
        }
      }
    },
  },
  computed: {
    allowed() {
      return Notification.permission === "granted";
    },
    errorMessages() {
      if (this.disallowed) {
        return "Von Browser blockiert";
      } else if (this.unsupported) {
        return "Ununterstützt";
      }
      return null;
    },
  },
};
</script>

<style>
</style>