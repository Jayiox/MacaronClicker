import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import './Settings.css';

function Settings() {
  const { wipeGame } = useContext(GameContext);

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-item">
        <p className="wipe-warning">This will wipe your save/game!</p>
        <button
          onClick={wipeGame}
          className="settings-wipe-btn"
        >
          Wipe Game
        </button>
      </div>
    </div>
  );
}

export default Settings;