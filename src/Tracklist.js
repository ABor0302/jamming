import React from 'react';
import Track from './Track';

const Tracklist = ({ tracks, onRemove, isRemoval }) => {
  return (
    <ul>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onRemove={onRemove} isRemoval={isRemoval} />
      ))}
    </ul>
  );
};

export default Tracklist;