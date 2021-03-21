<script>
export default {
    methods: {
        async getUserPlaylists(search) {
            let playlistResult = await this.$http.get(`/spotify/user/playlists/${search || ''}`, {
                headers: {
                    'Authentication': this.$globals.spotifyCredentials
                }
            });
        },
        async getUserFavoriteArtists(genre) {
            let artistResult = await this.$http.get(`/spotify/user/favorite/arists${genre ? '?genre=' + genre : ''}`, {
                headers: {
                    Authentication: this.$globals.spotifyCredentials
                }
            });
            return artistResult.data.data;
        },
        async getUserFavoriteGenres() {
            let genreResult = await this.$http.get(`/spotify/user/favorite/genres`, {
                headers: {
                    Authentication: this.$globals.spotifyCredentials
                }
            });
            return genreResult.data.data;
        },
        async getUserFavoriteTracks() {
            let tracksResult = await this.$http.get(`/spotify/user/favorite/tracks`, {
                headers: {
                    Authentication: this.$globals.spotifyCredentials
                }
            });
            return tracksResult.data.data;
        },
        async getPlaylists(search) {
            let playlistResult = await this.$http.get(`/spotify/playlists/${search}`, {
                headers: {
                    Authentication: this.$globals.spotifyCredentials
                }
            });
            return playlistResult.data.data;
        }
    }
}
</script>