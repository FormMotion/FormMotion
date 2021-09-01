import Phaser from ‘phaser’;
import React from ‘react’;
export default class PauseScene extends Phaser.Scene {
    constructor() {
        super(‘PauseScene’);
        this.spaceBar;
        this.player;
        this.physics;
        this.registry;
        this.events;
        this.musicPaused;
        this.soundPaused;
    };
    // Goals: needs to pause, restart, go back to drawing for a new character
    init(data) {
        console.log(‘data’, data)
        this.soundPaused = data.soundPaused
        this.musicPaused = data.musicPaused
    }
    create() {
        this.spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
          );
        this.physics.pause()
        // Popup box
        this.popup = this.add.graphics();
        this.popup.lineStyle(1, 0x2a275c);
        this.popup.fillStyle(0xAE8C9B, 0.7);
        this.popup.strokeRect(225,125,750,550);
        this.popup.fillRect(225,125,750,550);
        this.physics.pause()
        // Menu button squares
        // Resume Current Game Button Square
        this.button1 = this.add.graphics()
        .lineStyle(1, 0x2a275c)
        .fillStyle(0xD9E6A1, 1)
        .strokeRect(252, 600, 200, 60)
        .fillRect(252, 600, 200, 60)
        // x, y , width, height DO NOT MOVE THESE!
        // // Restart new game with Current Character Button Square
        // this.button2 = this.add.graphics()
        // .lineStyle(1, 0x2a275c)
        // .fillStyle(0xD9E6A1, 1)
        // .strokeRect(500, 600, 200, 60)
        // .fillRect(500, 600, 200, 60)
        // // Redraw new character Button Square
        // this.button3 = this.add.graphics()
        // .lineStyle(1, 0x2a275c)
        // .fillStyle(0xD9E6A1, 1)
        // .strokeRect(735, 600, 200, 60)
        // .fillRect(735, 600, 200, 60)
        // Add Menu Title
        this.add
            .text(600, 200, ‘Pause Menu’, {
                fill: ‘#251E20’,
                fontSize: ‘60px’,
                fontFamily: ‘arial narrow’,
            })
            .setOrigin(0.5);
        // Add description of game 1
                this.add
                .text(600,
                    300,
                    ‘Resume the game to continue with this character.‘,
                    {
                        fill: ‘#251E20’,
                        fontSize: ‘26px’,
                        align: ‘center’,
                        fontFamily: ‘arial’,
                        wordWrap: {width: 600, height: 400, useAdvancedWrap: true},
                    }
                )
                .setOrigin(0.5);
                // // Add description of game 2
                // this.add
                // .text(600,
                //     400,
                //     ‘Toggle the sound effects Off/On’,
                //     {
                //         fill: ‘#251E20’,
                //         fontSize: ‘26px’,
                //         align: ‘center’,
                //         fontFamily: ‘arial’,
                //         wordWrap: {width: 600, height: 400, useAdvancedWrap: true},
                //     }
                // )
                // .setOrigin(0.5);
                // // Add description of game 3
                // this.add
                // .text(600,
                //     500,
                //     ‘Toggle the music Off/On’,
                //     {
                //         fill: ‘#251E20’,
                //         fontSize: ‘26px’,
                //         align: ‘center’,
                //         fontFamily: ‘arial’,
                //         wordWrap: {width: 600, height: 400, useAdvancedWrap: true},
                //     }
                // )
                // .setOrigin(0.5);
    // Buttons
    //Resume Game Button
            this.resumeGameButton = this.add
            .text(615, 650, ‘Resume Game’, {
                fill: ‘#473A3F’,
                fontSize: ‘26px’,
                fontFamily: ‘arial’,
            })
            .setOrigin(2.0, 1.25);
            this.resumeGameButton.setInteractive();
            this.resumeGameButton.on(‘pointerdown’, () => {
                this.scene.resume(‘MainScene’);
                this.scene.stop();
            });
            this.spaceBar = this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );
         //Sound Effect Off On Button
            // this.soundEffectsButton = this.add
            // .text(860, 650, ‘Sounds Off/On’, {
            //     fill: ‘#473A3F’,
            //     fontSize: ‘26px’,
            //     fontFamily: ‘arial’,
            // })
            // .setOrigin(2.0, 1.25);
            // this.soundEffectsButton.setInteractive();
            // this.soundEffectsButton.on(‘pointerdown’, () => {
            // this.soundPaused = !this.soundPaused
            // console.log(“Sound effects off/on”)
            // });
            // this.spaceBar = this.input.keyboard.addKey(
            //     Phaser.Input.Keyboard.KeyCodes.SPACE
            // );
        //Toggle Music Off On  Button
            // this.musicButton = this.add
            // .text(1050, 650, ‘Music Off/On’, {
            //     fill: ‘#473A3F’,
            //     fontSize: ‘26px’,
            //     fontFamily: ‘arial’,
            // })
            // .setOrigin(2.0, 1.25);
            // this.musicButton.setInteractive();
            // this.musicButton.on(‘pointerdown’, () => {
            // this.musicPaused = !this.musicPaused
            // console.log(“this.musicPaused Pause SCENE”, this.musicPaused)
            // });
            // this.spaceBar = this.input.keyboard.addKey(
            //     Phaser.Input.Keyboard.KeyCodes.SPACE
            // );
//---------------------------------------------------------------------------
 // Restart Game Button
// HOLD OFF ON RESTART FOR NOW. Difficult to restart a scene from within another scene
            // this.restartGameButton = this.add
            // .text(840, 650, ‘Restart Game’, {
            //     fill: ‘#473A3F’,
            //     fontSize: ‘26px’,
            //     fontFamily: ‘arial’,
            // })
            // .setOrigin(2.0, 1.25);
            // this.restartGameButton.setInteractive();
            // this.restartGameButton.on(‘pointerdown’, () => {
            //     this.registry.destroy(‘MainScene’); // destroy registry
            //     this.events.off(‘MainScene’); // disable all active events
            //     this.scene.restart(‘MainScene’); // restart current scene
            //     this.scene.stop();
            // console.log(‘RE-START CURRENT GAME!’)
            // });
}
    update() {
        // Space Bar to Resume the Game
        const spaceBarPressed = this.spaceBar.isDown;
        if (spaceBarPressed) {
        console.log(‘SpaceBar was pressed - inside MainScene’);
        this.scene.resume(‘MainScene’,{ soundPaused: this.soundPaused, musicPaused: this.musicPaused });
        this.scene.stop();
        }
    }
}
