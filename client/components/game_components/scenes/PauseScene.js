import Phaser from 'phaser';
import React from 'react';

// class Music extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y, texture) {
//     super(scene, x, y, texture);
//     this.setScale(0.5);
//   }
// }

// class Sounds extends Phaser.Physics.Arcade.Sprite {
//   constructor(scene, x, y, texture) {
//     super(scene, x, y, texture);
//     this.setScale(0.5);
//   }
// }

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
    this.load.image('turn-music-off', 'assets/game-buttons/Music-Off.png');
    this.load.image('turn-music-on', 'assets/game-buttons/Music-On.png');
    this.load.image('turn-sound-off', 'assets/game-buttons/Sounds-Off.png');
    this.load.image('turn-sound-on', 'assets/game-buttons/Sounds-On.png');

    let musicOff = new Image();
    musicOff.src = 'assets/game-buttons/Resume-Button.png';
    document.body.appendChild(musicOff);
    let musicOn = new Image();
    musicOn.src = 'assets/game-buttons/Music-On.png';
    document.body.appendChild(musicOn);
    let soundOff = new Image();
    soundOff.src = 'assets/game-buttons/Sounds-Off.png';
    document.body.appendChild(soundOff);
    let soundOn = new Image();
    soundOn.src = 'assets/game-buttons/Sounds-On.png';
    document.body.appendChild(soundOn);

    this.textures.addBase64('music-off', musicOff);
    this.textures.addBase64('music-on', musicOn);
    this.textures.addBase64('sound-off', soundOff);
    this.textures.addBase64('sound-on', soundOn);
  }

  create() {
    // Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    // this.popup.fillStyle(0xae8c9b, 0.7);
    this.popup.fillStyle(0xb2b09b, 0.7);
    this.popup.strokeRect(225, 125, 750, 550);
    this.popup.fillRect(225, 125, 750, 550);
    this.physics.pause();

    // Resume Game Button

    this.resumeGameButton = this.add
      .image(600, 300, 'resume-game')
      .setScale(0.5)
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

    // if sound effects are NOT muted:
    if (this.pickup.mute === false) {
      this.soundEffectsButton = this.add.image(600, 400, 'turn-sound-off');
    }
    // if sound effects ARE muted:
    else {
      this.soundEffectsButton = this.add.image(600, 400, 'turn-sound-on');
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
      this.musicButton = this.add.image(600, 500, 'turn-music-off');
    }
    // if music IS muted:
    else {
      this.musicButton = this.add.image(600, 500, 'turn-music-on');
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
      this.soundEffectsButton.destroy.image('turn-sound-on');
      this.soundEffectsButton.add
        .image(600, 400, 'turn-sound-off')
        .setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.toggleSound());
    }
    // if sound effects are not muted, toggle back to OFF (turn mute on)
    else {
      this.soundEffects.forEach((soundEffect) => {
        soundEffect.mute = true;
      });
      this.soundEffectsButton.destroy.image('turn-sound-off');
      this.soundEffectsButton.add
        .image(600, 400, 'turn-sound-on')
        .setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.toggleSound());
    }
  }

  toggleMusic() {
    // if music is muted
    if (this.spinningOut.mute === false) {
      this.spinningOut.mute = true;
      this.musicButton = this.add
        .image(600, 500, 'turn-music-off')
        .setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.toggleMusic());
      this.musicButton = this.image.destroy('turn-music-on');
    }
    // if music is not muted
    else {
      this.spinningOut.mute = false;
      this.musicButton = this.image.destroy('turn-music-off');
      this.musicButton = this.add
        .image(600, 500, 'turn-music-on')
        .setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.toggleMusic());
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
