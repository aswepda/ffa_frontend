<template>
  <v-dialog v-model="showDialog" max-width="290">
    <v-card>
      <v-card-actions>
        <v-form v-model="valid" ref="form" @submit.prevent="valid && signin()">
          <h4>Willkommen zurück!</h4>
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
          <v-btn
            block
            :disabled="!valid"
            type="submit"
            :loading="signingin"
          >
            Anmelden
            <v-icon right>mdi-login</v-icon>
          </v-btn>
          <footer>
            Wenn du noch keinen Account besitzt, kannst du dich stattdessen registrieren!
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
    signingin: false,
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
    signin() {
      if (!this.valid) return;
      this.signingin = true;
      setTimeout(() => { // REPLACE WITH ACTUAL LOGIC
        this.signingin = false;
        this.$emit("signedin");
        this.$globals.setLoggedIn(true);
        this.$globals.setEmail(this.email);
        this.$refs.form.reset();
        this.showDialog = false;
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