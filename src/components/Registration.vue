<template>
  <v-dialog v-model="showDialog" max-width="290">
    <v-card>
      <v-card-actions>
        <v-form v-model="valid" ref="form" @submit="valid && register()">
          <h4>Willkommen zu ASWE<b>PDA</b>!</h4>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="confirmPassw"
            label="Passwort bestätigen"
            type="password"
            :rules="[
              (v) => v == password || 'Passwörter müssen übereinstimmen',
            ]"
            required
          ></v-text-field>
          <v-btn
            block
            :disabled="!valid"
            type="submit"
            :loading="registering"
          >
            Registrieren
            <v-icon right>mdi-account-plus</v-icon>
          </v-btn>
          <footer>
            Wenn du bereits einen Account besitzt, kannst du dich stattdessen
            amelden!
          </footer>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassw: "",
    emailRules: [
      (v) => !!v || "Eine E-Mail muss angegeben werden",
      (v) => /.+@.+\..{2,}/.test(v) || "Die E-Mail muss valide sein",
    ],
    passwordRules: [
      (v) => !!v || "Ein Passwort muss angegeben werden",
      (v) =>
        (v && v.length >= 8) ||
        "Das Passwort muss mindestens 8 Zeichen lang sein",
    ],
    registering: false,
    valid: false,
  }),
  props: {
    value: Boolean,
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    register() {
      if (!this.valid) return;
      this.registering = true;
      setTimeout(() => {
        this.registering = false;
        this.$emit("registered");
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.v-form {
  footer {
    margin-top: 1em;
    font-size: 0.8em;
    opacity: 0.5;
  }
}
</style>