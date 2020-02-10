import React from 'react';

const GenraForm = props => {
  return (
    <div>
      {props.genraList.map(genre => {
        return (
          <button
            onClick={() => {
              props.handleClick(props.client, genre);
            }}
            key={genre}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};

export default GenraForm;
