import Phaser from "phaser";

//Parallax Mountains
let bg5 = 'assets/backgrounds/parallax_mountains/parallax-mountain-bg.png'
let bg4 = 'assets/backgrounds/parallax_mountains/parallax-mountain-montain-far.png'
let bg3 = 'assets/backgrounds/parallax_mountains/parallax-mountain-mountains.png'
let bg2 = 'assets/backgrounds/parallax_mountains/parallax-mountain-trees.png'
let bg1 = 'assets/backgrounds/parallax_mountains/parallax-mountain-foreground-trees.png'
let bgscale = 3

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.player;
    this.cursors;
    this.platforms;
  }

  preload() {
    this.load.image('bg-5', bg5)
    this.load.image('bg-4', bg4)
    this.load.image('bg-3', bg3)
    this.load.image('bg-2', bg2)
    this.load.image('bg-1', bg1)
    //this.load.image("background", "/assets/backgrounds/nightwithmoon.png");
    this.load.image("platform", "assets/temp_platform.png");
    //this.load.image("playerRight", "assets/temp_char_facing_right_run.png");
    this.load.image("playerLeft", "assets/temp_char_facing_left_run.png");
  }

  create() {

    const width = this.scale.width
    const height = this.scale.height
    const totalWidth = width*10

    const playerDrawnCharacter = localStorage
  .getItem('playerDrawnCharacter')
  .slice(21);

  let arrayBuffer = Phaser.Utils.Base64.Base64ToArrayBuffer(playerDrawnCharacter);

  console.log(arrayBuffer)

  const makeImage = async () => {
    const playerDrawnCharacter = localStorage.getItem('playerDrawnCharacter');
    const base64 = await fetch(playerDrawnCharacter);
    const blob = await base64.blob();
    console.log(blob)
    return blob
  };

  makeImage()

    let assetLoader = 0
    this.textures.addBase64('playerRight', arrayBuffer) 
    assetLoader++


    if (assetLoader >= 1) {
      //Background
      

      this.add.image(width * 0.5, height * 0.5, 'bg-5').setScrollFactor(0).setScale(5)
      createAligned(this, totalWidth, 'bg-4', 0.25, bgscale)
      createAligned(this, totalWidth, 'bg-3', 0.5, bgscale)
      createAligned(this, totalWidth, 'bg-2', 1, bgscale), 
      createAligned(this, totalWidth, 'bg-1', 1.25, bgscale)

      //Platforms
      this.platforms = this.physics.add.staticGroup();

      for (let i = 0; i < 5; i++) {
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
  }

  update() {
    //Player Movement
    const touchingDown = this.player.body.touching.down;
    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(300);
    } else if (this.cursors.up.isDown && !touchingDown) {
      //Need to fix this so we can't fly into space!!!
      this.player.setVelocityY(-400);
    } else {
      this.player.setVelocityX(0);
    }

    //Platform Infinite Scrolling
    this.platforms.children.iterate(child => {
      const platform = child;
      const scrollX = this.cameras.main.scrollX;
      if (platform.x <= scrollX - 50) {
        platform.x = this.player.x + 625;
        platform.body.updateFromGameObject();
      }
    });
  }
}

//this will allow us to have an infinite background
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width 
  const count = Math.ceil(totalWidth / w) * scrollFactor

  let x = 0
  for (let i = 0; i < count; i++) {
    const m = scene.add.image(x, scene.scale.height, texture).setOrigin(1,1).setScrollFactor(scrollFactor).setScale(4)
    x += m.width
  }

}