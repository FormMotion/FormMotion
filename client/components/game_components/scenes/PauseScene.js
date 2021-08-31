import Phaser from 'phaser';
import React from 'react';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
        this.spaceBar;
        this.player;
        this.physics;

    };

    // Goals: needs to pause, restart, go back to drawing for a new character

    create() {
        this.physics.pause()
        //this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) 
       
        // this.physics.pause() // this does not work.
        console.log('Begin Pause Scene - code running inside Pause Scene create method')

            // Popup box
            this.popup = this.add.graphics();
            this.popup.lineStyle(1, 0x2a275c);
            this.popup.fillStyle(0x7c8d99, 0.9);
            this.popup.strokeRect(225,125,750,550);
            this.popup.fillRect(225,125,750,550);
            this.physics.pause()

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

  // Resume Game Button
  this.resumeGameButton = this.add
  .text(615, 525, 'Resume Game', {
    fill: '#fff', // white text
    fontSize: '30px',
    fontStyle: 'bold',
  })
  .setOrigin(1.5);

this.resumeGameButton.setInteractive();
this.resumeGameButton.on('pointerdown', () => {
  this.scene.resume('MainScene');
  this.scene.stop();
});

this.spaceBar = this.input.keyboard.addKey(
  Phaser.Input.Keyboard.KeyCodes.SPACE
);

const spaceBarPressed = this.spaceBar.isDown;

if (spaceBarPressed) {
  console.log('SpaceBar was pressed - inside MainScene');

  this.scene.resume('MainScene');
  this.scene.stop();
}


            // New Game Button
                // SAME CHARACTER
             this.newGameButton = this.add
             .text(615, 525, 'Start New Game', {
                 fill: '#fff', // white text
                 fontSize: '30px',
                 fontStyle: 'bold'
             })
             .setOrigin(0.02);

         this.newGameButton.setInteractive();
         this.newGameButton.on(
             'pointerdown',
             () => {

                 // Below was taken from the MainScene Game Over Restart() code : line 257 !! Does not work yet.

                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.resume('MainScene'); // restart the MainScene
                this.scene.stop();
                 
                 console.log("New Game button clicked")
             },
             this
         );
    
    }// end of Create Function

}