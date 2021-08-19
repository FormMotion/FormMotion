import Phaser from 'phaser';
import React from 'react';
import MainScene from './scenes/MainScene';

export default class Game extends React.Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: true,
                },
            },
            scale: {
                parent: 'game-container',
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            },
            scene: MainScene,
        };
        new Phaser.Game(config);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <div id="phaser-game" />;
    }
}