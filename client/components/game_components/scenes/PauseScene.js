import Phaser from 'phaser';
import React from 'react';
export default class PauseScene extends Phaser.Scene {
  constructor() {
    super('PauseScene');
    this.spaceBar;
    this.player;
    this.physics;
    this.registry;
    this.events;
    this.soundEffectsButton;
    this.musicButton;
  }
  // Goals: needs to pause, restart, go back to drawing for a new character

  create() {
    // this.spaceBar = this.input.keyboard.addKey(
    //   Phaser.Input.Keyboard.KeyCodes.SPACE
    // );

    // Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    // this.popup.fillStyle(0xae8c9b, 0.7);
    this.popup.fillStyle(0xb2b09b, 0.7);
    this.popup.strokeRect(225, 125, 750, 550);
    this.popup.fillRect(225, 125, 750, 550);
    this.physics.pause();

    // Menu button squares
    // Resume Current Game Button Square
    // this.button1 = this.add
    //   .graphics()
    //   .lineStyle(1, 0x2a275c)
    //   .fillStyle(0xd9e6a1, 1)
    //   .strokeRect(252, 600, 200, 60)
    //   .fillRect(252, 600, 200, 60);
    // x, y , width, height DO NOT MOVE THESE!

    // // Sound Button
    // this.button2 = this.add
    //   .graphics()
    //   .lineStyle(1, 0x2a275c)
    //   .fillStyle(0xd9e6a1, 1)
    //   .strokeRect(500, 600, 200, 60)
    //   .fillRect(500, 600, 200, 60);

    // Music Button
    // this.button3 = this.add
    //   .graphics()
    //   .lineStyle(1, 0x2a275c)
    //   .fillStyle(0xd9e6a1, 1)
    //   .strokeRect(735, 600, 200, 60)
    //   .fillRect(735, 600, 200, 60);

    // Add Menu Title
    this.add
      .text(600, 200, 'Pause Menu', {
        fill: '#251E20',
        fontSize: '60px',
        fontFamily: 'arial narrow',
      })
      .setOrigin(0.5);

    // Add description of game 1
    this.add
      .text(600, 300, 'Resume the game to continue with this character.', {
        fill: '#251E20',
        fontSize: '26px',
        align: 'center',
        fontFamily: 'arial',
        wordWrap: { width: 600, height: 400, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    // // Add description of game 2
    this.add
      .text(600, 400, 'Toggle the sound effects Off/On', {
        fill: '#251E20',
        fontSize: '26px',
        align: 'center',
        fontFamily: 'arial',
        wordWrap: { width: 600, height: 400, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    // Add description of game 3
    this.add
      .text(600, 500, 'Toggle the music Off/On', {
        fill: '#251E20',
        fontSize: '26px',
        align: 'center',
        fontFamily: 'arial',
        wordWrap: { width: 600, height: 400, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    // Buttons
    //Resume Game Button
    this.resumeGameButton = this.add
      .text(615, 650, 'Resume Game', {
        // fill: '#473A3F',
        fill: '#43AA8B',
        fontSize: '26px',
        fontFamily: 'arial',
      })
      .setOrigin(2.0, 1.25);
    this.resumeGameButton.setInteractive();
    this.resumeGameButton.on('pointerdown', () => {
      this.scene.resume('MainScene');
      this.scene.stop();
    });
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Sound Effect and Music off/on Buttons
    this.spinningOut = this.sound.get('spinningOut');

    // if one sound effect is muted, they're all muted, so we can just check one
    this.pickup = this.sound.get('pickup');

    this.soundNames = [
      'pickup',
      'jump',
      'land',
      'gameOver',
      'direction',
      'down',
    ];
    this.soundEffects = this.soundNames.map((soundName) => {
      return this.sound.get(soundName);
    });

    if (this.pickup.mute === false) {
      this.soundEffectsButton = this.add.text(860, 650, 'Turn sounds off', {
        fill: '#43AA8B',
        fontSize: '26px',
        fontFamily: 'arial',
      });
    } else {
      this.soundEffectsButton = this.add.text(860, 650, 'Turn sounds on', {
        fill: '#FF6F59',
        fontSize: '26px',
        fontFamily: 'arial',
      });
    }
    this.soundEffectsButton
      .setOrigin(2.0, 1.25)
      .setInteractive()
      .on('pointerdown', () => this.toggleSound());

    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //  Toggle Music Off On  Button

    if (this.spinningOut.mute === false) {
      this.musicButton = this.add.text(1050, 650, 'Turn music off', {
        fill: '#43AA8B',
        fontSize: '26px',
        fontFamily: 'arial',
      });
    } else {
      this.musicButton = this.add.text(1050, 650, 'Turn music on', {
        fill: '#FF6F59',
        fontSize: '26px',
        fontFamily: 'arial',
      });
    }

    this.musicButton
      .setOrigin(2.0, 1.25)
      .setInteractive()
      .on('pointerdown', () => this.toggleMusic());
  }

  toggleSound() {
    // if sound effects are muted, toggle back to ON (turn mute off)
    if (this.pickup.mute === true) {
      this.soundEffects.forEach((soundEffect) => {
        soundEffect.mute = false;
      });
      this.soundEffectsButton.setStyle({ fill: '#543211' });
      this.soundEffectsButton.setText('Turn sounds off');
    }
    // if sound effects are not muted, toggle back to OFF (turn mute on)
    else {
      this.soundEffects.forEach((soundEffect) => {
        soundEffect.mute = true;
      });
      this.soundEffectsButton.setStyle({ fill: '#473A3F' });
      this.soundEffectsButton.setText('Turn sounds on');
    }
  }

  toggleMusic() {
    // if music is muted
    if (this.spinningOut.mute === false) {
      this.spinningOut.mute = true;
      this.musicButton.setStyle({ fill: '#543211' });
      this.musicButton.setText('Turn music on');
    }
    // if music is not muted
    else {
      this.spinningOut.mute = false;
      this.musicButton.setStyle({ fill: '#473A3F' });
      this.musicButton.setText('Turn music off');
    }
  }

  update() {
    // Space Bar to Resume the Game
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    const spaceBarPressed = this.spaceBar.isDown;
    if (spaceBarPressed) {
      this.scene.resume('MainScene');
      this.scene.stop();
    }
  }
}
