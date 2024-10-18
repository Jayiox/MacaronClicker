import React from 'react';

function Help() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Macaron Clicker</h1>
      <p>
        Macaron Clicker is a fun and simple incremental game where you collect macarons by clicking on the macaron image. The more macarons you collect, the more upgrades you can purchase to increase your macaron production.
      </p>
      <h2>How to Play</h2>
      <ol>
        <li>Click on the macaron in the center of the screen to earn macarons.</li>
        <li>Use the macarons to buy upgrades such as Cursors and Rollers, which will automatically generate more macarons over time.</li>
        <li>Each upgrade will have a different cost and will increase your macaron production by a set amount.</li>
        <li>Keep clicking and upgrading to maximize your macaron production!</li>
        <li>If you want to start over, you can use the "Wipe Game" button in the settings.</li>
      </ol>
    </div>
  );
}

export default Help;