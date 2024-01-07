import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Settings = () => {
  const [newMaxCols, setNewMaxCols] = useState(5);

  return (
    <div className="container">
      <input
        type="number"
        value={newMaxCols}
        onChange={(e) => setNewMaxCols(e.target.value)}
        min="3"
        max="9"
      ></input>
      <NavLink to={`/`}>
        <button
          onClick={() => {
            if (/[3-9]/.test(newMaxCols)) {
              localStorage.setItem('maxCols', newMaxCols);
            } else {
              alert("must be words 3 - 9 in length")
            }
          }}
        >
          Update Word Length
        </button>
      </NavLink>
    </div>
  );
};

export default Settings;
