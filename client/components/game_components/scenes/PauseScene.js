import Phaser from "phaser";
import React from "react";

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super("PauseScene");
    this.spaceBar;
    this.player;
    this.physics;
    this.registry;
    this.events;
    this.soundEffectsButton;
    this.musicButton;
    this.pickup;
    this.spinningOut;
    this.jump;
    this.land;
    this.gameOver;
    this.direction;
    this.down;
  }

  preload() {
    //loading button images
    this.load.image("resume-game", "assets/game-buttons/Resume-Button.png");
    this.load.image("music-off", "assets/game-buttons/Music-Off.png");
    this.load.image("music-on", "assets/game-buttons/Music-On.png");
    this.load.image("sound-off", "assets/game-buttons/Sounds-Off.png");
    this.load.image("sound-on", "assets/game-buttons/Sounds-On.png");
  }

  create() {
    // Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    this.popup.fillStyle(0x81b29a, 3);
    this.popup.strokeRect(225, 125, 750, 550);
    this.popup.fillRect(225, 125, 750, 550);
    this.physics.pause();

    // Resume Game Button

    this.resumeGameButton = this.add
      .image(600, 225, "resume-game")
      .setScale(0.65)
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.resume("MainScene");
        this.scene.stop();
      });

    // Add Sound On/Off Buttons

    this.pickup = this.sound.get("pickup");
    this.jump = this.sound.get("jump");
    this.land = this.sound.get("land");
    this.gameOver = this.sound.get("gameOver");
    this.direction = this.sound.get("direction");
    this.down = this.sound.get("down");

    // 'pickup' is one sound effect. If one is muted, they're all muted, so we name
    // this one so we can check if sound effects are muted before we decide if the button
    // says to turn sound effects off or on

    // if sound effects are not muted, button says sound is on
    if (this.pickup.mute === false) {
      this.soundEffectsButton = this.add.image(600, 400, "sound-on");
    }
    // if sound effects ARE muted,button says sound is off
    if (this.pickup.mute === true) {
      this.soundEffectsButton = this.add.image(600, 400, "sound-off");
    }
    this.soundEffectsButton
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.toggleSound());

    // Add Music On/Off Buttons

    this.spinningOut = this.sound.get("spinningOut");
    // if music is NOT muted:
    if (this.spinningOut.mute === false) {
      this.musicButton = this.add.image(600, 575, "music-on");
    }
    // if music IS muted:
    if (this.spinningOut.mute === true) {
      this.musicButton = this.add.image(600, 575, "music-off");
    }

    this.musicButton
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.toggleMusic());

    // setting this.spaceBar
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  toggleSound() {
    // if sound effects are muted, toggle back to ON (turn mute off)
    if (this.pickup.mute === true) {
      this.jump.setMute(false);
      this.land.setMute(false);
      this.gameOver.setMute(false);
      this.direction.setMute(false);
      this.down.setMute(false);
      this.pickup.setMute(false);
      this.soundEffectsButton.setTexture("sound-on");
    }
    // if sound effects are not muted, toggle back to OFF (turn mute on)
    if (this.pickup.mute === false) {
      this.jump.setMute(true);
      this.land.setMute(true);
      this.gameOver.setMute(true);
      this.direction.setMute(true);
      this.down.setMute(true);
      this.pickup.setMute(true);

      this.soundEffectsButton.setTexture("sound-off");
    }
  }

  toggleMusic() {
    // if music is not muted, toggle back to OFF (turn mute on)
    if (this.spinningOut.mute === false) {
      this.spinningOut.setMute(true);
      this.musicButton.setTexture("music-off");
    }

    // if music is muted, toggle back to ON (turn mute off)
    else {
      this.spinningOut.setMute(false);
      this.musicButton.setTexture("music-on");
    }
  }

  update() {
    // Space Bar to Resume the Game
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    const spaceBarPressed = this.spaceBar.isDown;
    if (spaceBarPressed) {
      this.scene.resume("MainScene");
      this.scene.stop();
    }
  }
}
