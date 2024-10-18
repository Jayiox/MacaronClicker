import React, { useState } from 'react';
import macaronImage from '../assets/images/macaron.png';
import gifAnimation from '../assets/images/animation.gif';

function MacaronImage({ handleMacaronClick }) {
  const [clicks, setClicks] = useState([]);
  const [count, setCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    handleMacaronClick();
    setClicks([...clicks, count]);
    setCount(count + 1);

    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 100);

    setTimeout(() => {
      setClicks((prevClicks) => prevClicks.filter((c) => c !== count));
    }, 1000);
  };

  return (
    <div className="relative inline-block" onClick={handleClick}>
      <img
        src={gifAnimation}
        alt="Animation"
        className="absolute z-0 pointer-events-none"
        style={{ width: '100px', height: '100px', top: '-40px', left: '130px'}}
      />
      <img
        src={macaronImage}
        alt="Macaron"
        className={`relative z-10 w-72 cursor-pointer outline-none ${isBouncing ? 'animate-bounceInward' : ''}`}
      />

      {clicks.map((key) => (
        <div key={key} className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 font-bold text-2xl animate-moveUpFadeOut">+1</div>
          <img src={macaronImage} alt="Small Macaron" className="w-12 h-12 absolute animate-popUp" />
        </div>
      ))}
    </div>
  );
}

export default MacaronImage;