<script>
export default {
    methods: {
        async getArtist(artist) {
            let artistResult = await this.$http.get(`/spotify/artist/${artist}`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return artistResult.data.data;
        },
        async playGenre(genre) {
            let playlistResult = await this.$http.get(`/spotify/genre/${genre}`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return playlistResult.data.data;
        },
        async getUserPlaylists() {
            let playlistResult = await this.$http.get(`/spotify/user/playlists`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return playlistResult.data.data;
        },
        async getUserFavoriteArtists(genre) {
            let artistResult = await this.$http.get(`/spotify/user/favorite/artists${genre ? '?genre=' + genre : ''}`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return artistResult.data.data;
        },
        async getUserFavoriteGenres() {
            let genreResult = await this.$http.get(`/spotify/user/favorite/genres`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return genreResult.data.data;
        },
        async getUserFavoriteTracks() {
            let tracksResult = await this.$http.get(`/spotify/user/favorite/tracks`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return tracksResult.data.data;
        },
        async getPlaylists(search) {
            let playlistResult = await this.$http.get(`/spotify/playlists/${search}`, {
                headers: {
                    Authorization: this.$globals.spotifyCredentials
                }
            });
            return playlistResult.data.data;
        }
    }
}
</script>