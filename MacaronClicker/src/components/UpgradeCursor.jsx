import React, { useEffect, useState, useContext } from 'react';
import cursorImage from '../assets/images/Cursor.png';
import heartImage from '../assets/images/heart.png';
import macaronImage from '../assets/images/macaron.png';
import Tooltip from './Tooltip';
import './UpgradeCursor.css';
import { GameContext } from '../contexts/GameContext';

const cursorMacaronsPerSecond = 1;

function UpgradeCursor() {
  const { macaronCount, cursors, cursorCost, allTimeMacarons, dispatch } = useContext(GameContext);
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchaseCursor = () => {
    if (macaronCount >= cursorCost) {
      dispatch({ type: 'BUY_CURSOR' });
    }
  };

  useEffect(() => {
    if (cursors > 0) {
      const interval = setInterval(() => {
        dispatch({ type: 'INCREMENT_MACARONS', payload: cursors * cursorMacaronsPerSecond });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cursors, dispatch]);

  return (
    <>
      <div
        className="upgrade-cursor-container"
        onClick={handlePurchaseCursor}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="cursor-info">
          <div className="cursor-details">
            <img src={cursorImage} alt="Cursor" className="cursor-image" />
            <div className="cursor-text">
              <h1 className="cursor-title">Cursor</h1>
              <div className="cursor-cost">
                <img src={macaronImage} alt="Macaron" className="macaron-image" />
                <p className="macaron-cost">{cursorCost}</p>
              </div>
            </div>
          </div>
          <div className="cursor-count">
            {cursors}
          </div>
        </div>

        {isHovered && (
          <Tooltip positionClass="right-full top-0 ml-2">
            <h1>Cursor</h1>
            <p>Each cursor produces {cursorMacaronsPerSecond} macarons per second</p>
            <p>{cursors} cursors producing {cursors * cursorMacaronsPerSecond} macarons per second</p>
            <p>Number of macarons clicked so far: {allTimeMacarons}</p>
          </Tooltip>
        )}
      </div>

      {[...Array(cursors)].map((_, index) => {
        const animationDuration = 10 + index * 2;
        return (
          <img
            key={index}
            src={heartImage}
            alt="Heart"
            className="cursor-animation"
            style={{
              animationDuration: `${animationDuration}s`
            }}
          />
        );
      })}
    </>
  );
}

export default UpgradeCursor;