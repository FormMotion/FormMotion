import Phaser from 'phaser';
import React from 'react';
import MainScene from './scenes/MainScene';
import OpeningScene from './scenes/OpeningScene';

export default class Game extends React.Component {
    componentDidMount() {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-app',
            mode: Phaser.Scale.RESIZE,
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
            scene: [MainScene, OpeningScene],
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
