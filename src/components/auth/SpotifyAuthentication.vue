<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      client_id: "d5550bed36f64690a6d2ae32d26023bd",
      scopes: "user-top-read playlist-modify-private",
      redirect_uri: "https://aswepda.surge.sh/#/",
      me: null,
    };
  },
  methods: {
    async login() {
      let popup = window.open(
        `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=${encodeURIComponent(this.redirect_uri)}&scope=${encodeURIComponent(this.scopes)}&show_dialog=true`,
        "Login with Spotify",
        "width=800,height=600"
      );

      window.spotifyCallback = async (payload) => {
        // alert(payload)

        popup.close();

        let authResult = await this.$http.post("auth/spotify", {
          code: payload,
        });
        
        this.$globals.setSpotifyCredentials(authResult.data.credentials);
      };
    },
  },
  mounted() {
    this.token = window.location.search.substr(1).split("&")[0].split("=")[1];

    if (this.token) {
      //alert(this.token)

      window.opener.spotifyCallback(this.token);
    }
  },
};
</script>