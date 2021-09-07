import Phaser from "phaser";

export default class OpeningScene extends Phaser.Scene {
  constructor() {
    super("OpeningScene");
    this.player;
  }

  preload() {
    this.load.image(
      "instructions",
      "assets/game-buttons/OpeningInstructions.png"
    );
    this.load.image("start_button", "assets/game-buttons/start-button.png");
    this.load.image("press_pause", "assets/game-buttons/or_press_pause.png");
  }

  create() {
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Popup box
    this.popup = this.add.graphics();
    this.popup.lineStyle(1, 0x2a275c);
    this.popup.fillStyle(0x0094c6, 7);
    this.popup.strokeRect(225, 125, 750, 550);
    this.popup.fillRect(225, 125, 750, 550);

    // Show the Avatar in the pop up box
    this.player = this.add
      .sprite(650, 375, "standingPlayer")
      .setScale(0.25)
      .setOrigin(2.0, 0.5); // player placement

    //add image
    this.add.image(600, 400, "instructions").setScale(0.6);

    this.add.text(
      275,
      650,
      "Hint: PowerUps increase prize points and make you immune to slime!",
      { fill: "black" }
    );

    //Start Button
    this.startButton = this.add
      .image(400, 570, "start_button")
      .setOrigin(0.5)
      .setScale(0.5);

    this.startButton.setInteractive();
    this.startButton.on(
      "pointerdown",
      () => {
        this.scene.resume("MainScene");
        this.scene.stop();
      },
      this
    );
  }

  update() {
    // Space Bar to Resume the Game
    const spaceBarPressed = this.spaceBar.isDown;

    if (spaceBarPressed) {
      this.scene.resume("MainScene");
      this.scene.stop();
    }
  }
}
