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

  preload() {
    //loading button images
    this.load.image('resume-game', 'assets/game-buttons/Resume-Button.png');
    this.load.image('music-off', 'assets/game-buttons/Music-Off.png');
    this.load.image('music-on', 'assets/game-buttons/Music-On.png');
    this.load.image('sound-off', 'assets/game-buttons/Sounds-Off.png');
    this.load.image('sound-on', 'assets/game-buttons/Sounds-On.png');
  }

  create() {
    // Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    this.popup.fillStyle(0x81B29A, 3);
    this.popup.strokeRect(225, 125, 750, 550);
    this.popup.fillRect(225, 125, 750, 550);
    this.physics.pause();

    // Resume Game Button

    this.resumeGameButton = this.add
      .image(600, 225, 'resume-game')
      .setScale(0.65)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.resume('MainScene');
        this.scene.stop();
      });

    // Add Sound On/Off Buttons

    // 'pickup' is one sound effect. If one is muted, they're all muted, so we name
    // this one so we can check if sound effects are muted before we decide if the button
    // says to turn sound effects off or on

    this.pickup = this.sound.get('pickup');

    this.soundNames = [
      'pickup',
      'jump',
      'land',
      'gameOver',
      'direction',
      'down',
    ];

    // array of all sound effects
    this.soundEffects = this.soundNames.map((soundName) => {
      return this.sound.get(soundName);
    });

    // if sound effects are not muted, button says sound is on
    if (this.pickup.mute === false) {
      this.soundEffectsButton = this.add.image(600, 400, 'sound-on');
    }
    // if sound effects ARE muted,button says sound is off
    else {
      this.soundEffectsButton = this.add.image(600, 400, 'sound-off');
    }
    this.soundEffectsButton
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.toggleSound());

    // Add Music On/Off Buttons

    this.spinningOut = this.sound.get('spinningOut');
    // if music is NOT muted:
    if (this.spinningOut.mute === false) {
      this.musicButton = this.add.image(600, 575, 'music-on');
    }
    // if music IS muted:
    else {
      this.musicButton = this.add.image(600, 575, 'music-off');
    }

    this.musicButton
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.toggleMusic());

    // setting this.spaceBar
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  toggleSound() {
    // if sound effects are muted, toggle back to ON (turn mute off)
    if (this.pickup.mute === true) {
      this.soundEffects.forEach((soundEffect) => {
        soundEffect.mute = false;
      });
      this.soundEffectsButton.setTexture('sound-on');
    }
    // if sound effects are not muted, toggle back to OFF (turn mute on)
    else {
      this.soundEffects.forEach((soundEffect) => {
        soundEffect.mute = true;
      });

      this.soundEffectsButton.setTexture('sound-off');
    }
  }

  toggleMusic() {
    // if music is not muted, toggle back to OFF (turn mute on)
    if (this.spinningOut.mute === false) {
      this.spinningOut.mute = true;
      this.musicButton.setTexture('music-off');
    }
    // if music is muted, toggle back to ON (turn mute off)
    else {
      this.spinningOut.mute = false;
      this.musicButton.setTexture('music-on');
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
