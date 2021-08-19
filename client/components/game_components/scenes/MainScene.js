import Phaser from "phaser";

//My theory is that we can pull in the images and then run them through the preload

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.player;
    this.cursors;
    this.platforms;
  }

  preload() {
    this.load.image("background", "/assets/backgrounds/nightwithmoon.png");
    this.load.image("platform", "/assets/temp_platform.png");
    this.load.image("playerRight", "assets/temp_char_facing_right_run.png");
  }

  create() {
    //Background
    this.add.image(500, 360, "background").setScrollFactor(0, 1);

    //Platforms
    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 10; i++) {
      const x = 250 * i;
      const y = Phaser.Math.Between(400, 550);

      const platform = this.platforms.create(x, y, "platform");
      platform.scale = 0.2;

      const body = platform.body;
      body.updateFromGameObject();
    }

    //Avatar / Player Character
    this.player = this.physics.add
      .sprite(240, 320, "playerRight")
      .setScale(0.2);

    //Colliders
    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    //Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //Camera
    this.cameras.main.startFollow(this.player);
  }

  update() {
    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-400);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(400);
    } else if (this.cursors.up.isDown && !touchingDown) {
        //Need to fix this so we can't fly into space!!!
      this.player.setVelocityY(-400);
    } else {
      this.player.setVelocityX(0);
    }
  }
}
