import React, { useState,useEffect} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import SpotifyAuth from './SpotifyAuth';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  useEffect(() => {

    // Retrieve the access token when the page is loaded
    SpotifyAuth.getAccessToken();
  }, []);

  // Function used to update search results
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // Function used to update the playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

   // Function used to add or remove a track from the playlist
  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    const updatedTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedTracks);
  };
  
  // Function used to save the playlist to Spotify
  const savePlaylist = (trackUris, playlistName) => {
    SpotifyAuth.savePlaylist(trackUris, playlistName);
  };

  return (
    <div>
      <h1>Jammming App</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults tracks={searchResults} onAdd={addTrack} />
      <Playlist
        name={playlistName}
        tracks={playlistTracks}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        onSave={savePlaylist}
      />
    </div>
  );
}

export default App;