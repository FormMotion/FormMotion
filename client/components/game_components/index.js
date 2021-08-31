import Phaser from 'phaser';
import React from 'react';
import MainScene from './scenes/MainScene';
import OpeningScene from './scenes/OpeningScene';
import PauseScene from './scenes/PauseScene';

export default class Game extends React.Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 800,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 550 },
                    debug: false,
                },
            },
            scale: {
                parent: 'game-container',
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            },
            scene: [MainScene, OpeningScene, PauseScene],
        };
        new Phaser.Game(config);
    }
    shouldComponentUpdate() {
        return false;
    }
    //Why do we need this line? 
    render() {
        return <div id="phaser-game" />;
    }
}
