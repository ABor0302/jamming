// SearchBar.js
import React, { useState } from 'react';
import SpotifyAuth from './SpotifyAuth';

const SearchBar = ({ onSearch, onSavePlaylist }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const accessToken = SpotifyAuth.getAccessToken();

      if (!accessToken) {
        // If there is no access token, redirect the user to the login page
        return;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const tracks = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          isSelected: true,
        }));

        onSearch(tracks);
      } else {
        // Handle error
        console.error('Error fetching data from Spotify API:', response.statusText);
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a song, artist, or album"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
