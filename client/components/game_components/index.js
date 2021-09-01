import Phaser from 'phaser';
import React, { useEffect } from 'react';
import MainScene from './scenes/MainScene';
import OpeningScene from './scenes/OpeningScene';
import PauseScene from './scenes/PauseScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  className: 'canvas',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scale: {
    // mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: [MainScene, OpeningScene, PauseScene],
};

const Game = () => {
  useEffect(() => {
    function resize() {
      const canvas = document.querySelector('canvas');
      const width = window.innerWidth;
      const height = window.innerHeight;
      const wratio = width / height;
      const ratio = Number(config.width) / Number(config.height);
      if (wratio < ratio) {
        canvas.style.width = width + 'px';
        canvas.style.height = width / ratio + 'px';
      } else {
        canvas.style.width = height * ratio + 'px';
        canvas.style.height = height + 'px';
      }
    }
    new Phaser.Game(config);
    resize();
    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, []);

  // window.onload = function () {
  //   new Phaser.Game(config);
  //   resize();
  //   window.addEventListener('resize', resize, false);
  // };

  return <div id="phaser-game" />;
};

export default Game;
