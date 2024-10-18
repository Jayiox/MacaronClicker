import React, { useEffect, useState, useContext } from 'react';
import rollerImage from '../assets/images/Roller.png';
import heartImage from '../assets/images/heart.png';
import macaronImage from '../assets/images/macaron.png';
import Tooltip from './Tooltip';
import './UpgradeRoller.css';
import { GameContext } from '../contexts/GameContext';

const rollerMacaronsPerSecond = 2;

function UpgradeRoller() {
  const { macaronCount, rollers, rollerCost, allTimeMacarons, dispatch } = useContext(GameContext);
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchaseRoller = () => {
    if (macaronCount >= rollerCost) {
      dispatch({ type: 'BUY_ROLLER' });
    }
  };

  useEffect(() => {
    if (rollers > 0) {
      const interval = setInterval(() => {
        dispatch({ type: 'INCREMENT_MACARONS', payload: rollers * rollerMacaronsPerSecond });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rollers, dispatch]);

  return (
    <>
      <div
        className="upgrade-roller-container"
        onClick={handlePurchaseRoller}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="roller-info">
          <div className="roller-details">
            <img
              src={rollerImage}
              alt="Roller"
              className="roller-image"
            />
            <div className="roller-text">
              <h1 className="roller-title">Roller</h1>
              <div className="roller-cost">
                <img
                  src={macaronImage}
                  alt="Macaron"
                  className="macaron-image"
                />
                <p className="macaron-cost">{rollerCost}</p>
              </div>
            </div>
          </div>
          <div className="roller-count">
            {rollers}
          </div>
        </div>

        {isHovered && (
          <Tooltip positionClass="right-full top-0 ml-2">
            <h1>Roller</h1>
            <p>Each roller produces {rollerMacaronsPerSecond} macarons per second</p>
            <p>{rollers} rollers producing {rollers * rollerMacaronsPerSecond} macarons per second</p>
            <p>Number of macarons clicked so far: {allTimeMacarons}</p>
          </Tooltip>
        )}
      </div>

      {Array.from({ length: rollers || 0 }).map((_, index) => {
        const animationDuration = 10 + index * 2;
        return (
          <img
            key={index}
            src={heartImage}
            alt="Heart"
            className="roller-animation"
            style={{
              animationDuration: `${animationDuration}s`
            }}
          />
        );
      })}
    </>
  );
}

export default UpgradeRoller;