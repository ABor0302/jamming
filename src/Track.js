import React from 'react';

const Track = ({ track, onAdd,onRemove,isRemoval }) => {
  const handleAdd = () => {
    if (track.isSelected === undefined || !track.isSelected) {
      //If isSelected is undefined or false, proceed with the operation
      track.isSelected = true;
      
    }
    onAdd(track);
    console.log(track);
  };
  const handleRemove = () => {
    onRemove(track);
  }

  return (
    <li>
      <strong>{track.name}</strong> - {track.artist} - {track.album}
      <button onClick={handleAdd}>Add</button>
      {isRemoval && <button onClick={handleRemove}>Remove</button>}
    </li>
  );
};

export default Track;
