<template>
  <div class="notificationmanager">
    <v-switch
      @change="changeState"
      v-model="notificationsEnabled"
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
    notificationsEnabled: false,
    disallowed: false,
    unsupported: false,
    loading: false,
    interval: null,
    registration: null,
    notifications: [
      {
        hour: 9,
        minute: 0,
        message: "Guten Morgen!\nDenke an deine heutige Morgen-Routine!",
        icon: "/img/morning.png",
        lastHandled: null,
      },
      {
        hour: 11,
        minute: 30,
        message: "Guten Mittag!\nVergesse deine Mittagspause nicht! 😊",
        icon: "/img/eat.png",
        lastHandled: null
      },
      {
        hour: 16,
        minute: 30,
        message: "Lust auf ein bisschen Sport?\nSchau doch mal in deine Sport Routine!",
        icon: "/img/test.png"
      },
      {
        hour: 21,
        minute: 0,
        message: "Guten Abend!\nGehst du bald ins Bett? Dann werfe doch nochmal einen Blick in deine Gute Nacht Routine! 🌃",
        icon: "/img/sleep_cloud.png"
      }
    ],
  }),
  async created() {
    if (this.$globals.notificationsEnabled) {
      if (this.allowed) {
        this.notificationsEnabled = true;
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
          curDate.valueOf() - notDate.valueOf() < 15 * 60 * 1000 &&
          curDate.valueOf() - notDate.valueOf() >= 0 &&
          (!notification.lastHandled ||
            notification.lastHandled && curDate.valueOf() - notification.lastHandled.valueOf() > 60 * 60 * 1000)
        ) {
          let notify = new Notification("FFA", {
            body: notification.message,
            icon: notification.icon,
            requireInteraction: true
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
      if (this.notificationsEnabled) {
        await this.requestPermissions();
        if (this.allowed) {
          this.startNotificationHandler();
        }
      } else {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.$globals.setNotificationsEnabled(this.notificationsEnabled);
    },
    async requestPermissions() {
      this.loading = true;
      if (!window.Notification) {
        console.log("Browser does not support notifications.");
        this.unsupported = true;
        this.notificationsEnabled = false;
      } else {
        if (Notification.permission !== "granted") {
          try {
            let perm = await Notification.requestPermission();
            if (perm === "granted") {
              // show notification here
              new Notification("FFA", {
                body: "Benachrichtigungen aktiviert!",
              });
            } else {
              console.log("User blocked notifications.");
              this.disallowed = true;
              this.notificationsEnabled = false;
            }
          } catch (err) {
            this.notificationsEnabled = false;
            this.unsupported = true;
          } finally {
            this.loading = false;
          }
        } else {
          try {
            new Notification("FFA", {
              body: "Benachrichtigungen aktiviert!",
            });
          } catch (err) {
            this.notificationsEnabled = false;
            this.unsupported = true;
          } finally {
            this.loading = false;
          }
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