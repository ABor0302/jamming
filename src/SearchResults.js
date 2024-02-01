import React from 'react';
import Track from './Track';

const SearchResults = ({ tracks, onAdd }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {tracks.map((track) => (
          <Track key={track.id} track={track} onAdd={onAdd} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;