const SpotifyAuth = {
  clientId: 'YOUR API CLIENT ID', // Add your Spotify API client ID here
  redirectUri: '',
  accessToken: '',
  expiresIn: 0,

  async savePlaylist(trackUris, playlistName) {
    if (!this.accessToken) {
       // If there is no access token, redirect the user to the login page
      return;
    }

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      // Create the playlist
      const createPlaylistResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: playlistName,
          public: false, // Set to true if you want the playlist to be public
        }),
      });

      if (!createPlaylistResponse.ok) {
        throw new Error('Error creating playlist');
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Add tracks to the playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          uris: trackUris,
        }),
      });

      if (!addTracksResponse.ok) {
        throw new Error('Error adding tracks to playlist');
      }

      console.log('Playlist saved successfully!');
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  },

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    // Get the access token from the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      this.expiresIn = Number(expiresInMatch[1]);

      // Remove the access token from the URL
      window.setTimeout(() => (this.accessToken = ''), this.expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // URL temizle

      return this.accessToken;
    } else {
       // If there is no access token in the URL and not in localStorage, redirect to the login page
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=playlist-modify-public%20playlist-modify-private`;
    }
  },
};

export default SpotifyAuth;
