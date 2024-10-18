import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MacaronImage from './components/MacaronImage';
import Footer from './components/Footer';
import UpgradeCursor from './components/UpgradeCursor';
import UpgradeRoller from './components/UpgradeRoller';
import Help from './components/Help';
import { GameProvider, GameContext } from './contexts/GameContext';
import Settings from './components/Settings';
import RegisterLogin from './components/RegisterLogin';
import './App.css';

function App() {
  const { macaronCount, dispatch } = useContext(GameContext);

  const handleMacaronClick = () => {
    dispatch({ type: 'INCREMENT_MACARONS' });
  };

  return (
    <div className="app-container">
      <Header macaronCount={macaronCount} />

      <div className="main-content">
        <div className="sidebar-left">
          <Settings />
          <RegisterLogin />
        </div>

        <div className="main-panel">
          <MacaronImage handleMacaronClick={handleMacaronClick} />
        </div>

        <div className="sidebar-right">
          <h2 className="upgrades-title">Upgrades</h2>
          <UpgradeCursor />
          <UpgradeRoller />
        </div>
      </div>

      <Footer />

      <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <a href="/help" target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce', textDecoration: 'none' }}>Help</a>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default AppWrapper;