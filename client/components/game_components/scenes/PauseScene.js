import Phaser from 'phaser';
import React from 'react';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.spacebar;
    }

    // needs to pause, restart, save character

    create() {
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        // this.spacebar = this.input.keyboard.createCursorKeys();
        const didPressSpacebar =  Phaser.Input.Keyboard.JustDown(this.spacebar)
        if(didPressSpacebar & this.spacebar.spacebar.isDown){
            this.game.paused = true
            console.log('spacebar pressed!')
            // Popup box
            this.popup = this.add.graphics();
            this.popup.lineStyle(1, 0x2a275c);
            this.popup.fillStyle(0x7c8d99, 0.9);
            this.popup.strokeRect(225,125,750,550);
            this.popup.fillRect(225,125,750,550);

            // Menu button squares
            this.button = this.add.graphics();
            this.button.lineStyle(1, 0x2a275c);
            this.button.fillStyle(0xf6304, 0.5);
            this.button.strokeRect(540, 500, 150, 50);
            this.button.fillRect(540, 500, 150, 50);

            // Add Menu Title

            
            this.add
                .text(600, 200, 'Menu', {
                    fill: '#fff',
                    fontSize: '60px',
                    fontStyle: 'bold',
                })
                .setOrigin(0.5);

            // Add description of game
            this.add
                .text(700,
                    320,
                    'Paused',
                    {
                        fill: '#fff',
                        fontSize: '20px',
                        align: 'right',
                        wordWrap: {width: 480, height: 445, useAdvancedWrap: true},
                    }
                )
                .setOrigin(0.5);

            //ReStart Game Button 
            this.reStartButton = this.add
                .text(615, 525, 'Start', {
                    fill: '#fff', // white text
                    fontSize: '30px',
                    fontStyle: 'bold'
                })
                .setOrigin(0.5);

            this.reStartButton.setInteractive();
            this.reStartButton.on(
                'pointerdown',
                () => {
                    this.scene.resume('MainScene');
                    this.scene.stop();
                    console.log('Restart Game')
                },
                this
            );

            // Resuem Game Button
            this.resumeGameButton = this.add
                .text(615, 525, 'Start', {
                    fill: '#fff', // white text
                    fontSize: '30px',
                    fontStyle: 'bold'
                })
                .setOrigin(0.5);

            this.resumeGameButton.setInteractive();
            this.resumeGameButton.on(
                'pointerdown',
                () => {
                    this.scene.stop();
                    console.log("resumeGame")
                },
                this
            );
            // Download Character Button
            this.downloadButton = this.add
                .text(615, 525, 'Start', {
                    fill: '#fff', // white text
                    fontSize: '30px',
                    fontStyle: 'bold'
                })
                .setOrigin(0.5);

            this.downloadButton.setInteractive();
            this.downloadButton.on(
                'pointerdown',
                () => {
                // PUT IN THE DOWNLOAD THING
                console.log('download')
                },
                this
            );
        }

    }

}