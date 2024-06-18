
import React from 'react';
import Tracklist from './Tracklist';

const Playlist = ({ name, tracks, onNameChange, onRemove, onSave }) => {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };
  const handleSave = () => {
    // Obtain the URIs to save the playlist to the Spotify account
    const trackUris = tracks.map((track) => track.uri);

    // Invoke the function provided as the onSave prop
    onSave(trackUris, name);

    // Reset the playlist name
    onNameChange('');
  };

  return (
    <div>
      <h2>{name}</h2>
      <input
        placeholder='Enter Your Playlist Name'
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <Tracklist tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button onClick={handleSave}>Save to Spotify</button>
    </div>
  );
};

export default Playlist;
