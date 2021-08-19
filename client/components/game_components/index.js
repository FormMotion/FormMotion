import Phaser from 'phaser';
import React from 'react';
import MainScene from './scenes/MainScene'
import OpeningScene from './scenes/OpeningScene'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene
})