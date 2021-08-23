import Phaser from 'phaser';

<<<<<<< HEAD
// const makeImage = async () => {
//   const playerDrawnCharacter = localStorage.getItem('playerDrawnCharacter');
//   const base64 = await fetch(playerDrawnCharacter);
//   const blob = await base64.blob();
// };

const playerDrawnCharacter = localStorage
  .getItem('playerDrawnCharacter')
  .slice(22);
=======
//Parallax Mountains
let bg5 = 'assets/backgrounds/parallax_mountains/parallax-mountain-bg.png'
let bg4 = 'assets/backgrounds/parallax_mountains/parallax-mountain-montain-far.png'
let bg3 = 'assets/backgrounds/parallax_mountains/parallax-mountain-mountains.png'
let bg2 = 'assets/backgrounds/parallax_mountains/parallax-mountain-trees.png'
let bg1 = 'assets/backgrounds/parallax_mountains/parallax-mountain-foreground-trees.png'
let bgscale = 3


//This is a separate class so we can set up internal configuration details for the prize Sprite here
class Prize extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.setScale(0.5)
  }
}
>>>>>>> main

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
    this.player;
    this.cursors;
    this.platforms;
    this.prizes;
    this.prizesCollected = 0;
    this.prizesText = 'Grace Hopping Along!';
    this.pickupPrize;
  }

  preload() {
<<<<<<< HEAD
    this.load.image(
      'bg-5',
      'assets/backgrounds/parallax_mountains/parallax-mountain-bg.png'
    );
    this.load.image(
      'bg-4',
      'assets/backgrounds/parallax_mountains/parallax-mountain-montain-far.png'
    );
    this.load.image(
      'bg-3',
      'assets/backgrounds/parallax_mountains/parallax-mountain-mountains.png'
    );
    this.load.image(
      'bg-2',
      'assets/backgrounds/parallax_mountains/parallax-mountain-trees.png'
    );
    this.load.image(
      'bg-1',
      'assets/backgrounds/parallax_mountains/parallax-mountain-foreground-trees.png'
    );
    //this.load.image("background", "/assets/backgrounds/nightwithmoon.png");
    this.load.image('platform', 'assets/temp_platform.png');
    this.load.image('playerRight', 'assets/temp_char_facing_right_run.png');
    this.load.image('playerLeft', 'assets/temp_char_facing_left_run.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10;

    let assetLoader = 0;
    // this.textures.addBase64('playerRight', playerDrawnCharacter);
    assetLoader++;

    if (assetLoader >= 1) {
      // Background

      this.add
        .image(width * 0.5, height * 0.5, 'bg-5')
        .setScrollFactor(0)
        .setScale(5);
      createAligned(this, totalWidth, 'bg-4', 0.25);
      createAligned(this, totalWidth, 'bg-3', 0.5);
      createAligned(this, totalWidth, 'bg-2', 1);
      createAligned(this, totalWidth, 'bg-1', 1.25);
=======
    //Static images hosted within assets folder
    this.load.image('bg-5', bg5)
    this.load.image('bg-4', bg4)
    this.load.image('bg-3', bg3)
    this.load.image('bg-2', bg2)
    this.load.image('bg-1', bg1)
    this.load.image("platform", "assets/temp_platform.png")
    this.load.image("prize", 'assets/temp_coin.png')

    this.load.audio('pickup', 'assets/kalimba_chime.mp3')

    //Loaded from localStorage - user drawn images
    let dataURI = localStorage.getItem('playerDrawnCharacter')

    let data = new Image();
    data.src = dataURI
    this.textures.addBase64('playerFacingRight', dataURI, data)

  }

  create() {   

    const width = this.scale.width
    const height = this.scale.height
    const totalWidth = width*10

      //Background

      this.add.image(width * 0.5, height * 0.5, 'bg-5').setScrollFactor(0).setScale(5)
      createAligned(this, totalWidth, 'bg-4', 0.25, bgscale)
      createAligned(this, totalWidth, 'bg-3', 0.5, bgscale)
      createAligned(this, totalWidth, 'bg-2', 1, bgscale), 
      createAligned(this, totalWidth, 'bg-1', 1.25, bgscale)
>>>>>>> main

      //Platforms
      this.platforms = this.physics.add.staticGroup();

      for (let i = 1; i < 5; i++) {
        const x = 300 * i;
        const y = Phaser.Math.Between(150, 450);
        //shouldn't go higher than 450 for y-axis or the bottom of the background shows

        const platform = this.platforms.create(x, y, 'platform');
        platform.scale = 0.2;

        const body = platform.body;
        body.updateFromGameObject();
      }

      //Avatar / Player Character
      this.player = this.physics.add
<<<<<<< HEAD
        .sprite(240, 320, 'playerRight')
        .setScale(0.2);
=======
        .sprite(300, 100, 'playerFacingRight').setScale(0.1)


      //Prize
      this.prizes = this.physics.add.group({
        classType: Prize
      })

      const style = {color: '#fff', fontSize: 24 }
      this.prizesText = this.add.text(
        600, 10, 'Grace Hopping Along!', style
      ).setScrollFactor(0).setOrigin(0.5, 0)

>>>>>>> main

      //Colliders
      this.physics.add.collider(this.platforms, this.player);
      this.physics.add.collider(this.platforms, this.prizes)
      this.physics.add.overlap(
        this.player,
        this.prizes,
        this.handleCollectPrize,
        undefined, //this is for a process callback that we are not using
        this
      )

      this.player.body.checkCollision.up = false;
      this.player.body.checkCollision.left = false;
      this.player.body.checkCollision.right = false;

      //Cursors
      this.cursors = this.input.keyboard.createCursorKeys();

      //Camera
      this.cameras.main.startFollow(this.player);
<<<<<<< HEAD
    }
=======

      //Sounds
      this.pickupPrize = this.sound.add('pickup', {volume: 0.5, loop: false})
    
>>>>>>> main
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
    } else {
      this.player.setVelocityX(0);
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up)

    if (didPressJump && !touchingDown && this.player.y > -75 && this.player.y < 400) {
      console.log('player.y on jump', this.player.y)
      this.player.setVelocityY(-300)
    }

 

    //Platform Infinite Scrolling
    this.platforms.children.iterate((child) => {
      const platform = child;
      const scrollX = this.cameras.main.scrollX;
      if (platform.x <= scrollX - 100) {
        platform.x = this.player.x + Phaser.Math.Between(650, 850);
        platform.body.updateFromGameObject();
        this.addPrizeAbove(platform)
      }
    });

    //Ends game if player falls below bottom of screen
    if (this.player.y > 550){
      const style = {color: '#fff', fontSize: 80 }
      this.add.text(
        600, 400, 'GAME OVER', style
      ).setScrollFactor(0)


    }
  }

  //Adds the prizes above the platforms 
  addPrizeAbove(sprite) {
    //this will add the prize instance above the given sprite (in this case, it will be a platform) using the sprite's display height as a guide
    const y = sprite.y - sprite.displayHeight*2
    const prize = this.prizes.get(sprite.x, y, 'prize')
    //makes active and visible so we can reuse prizes - otherwise they disappear and don't come back after our player collects them
    prize.setActive(true)
    prize.setVisible(true)
    this.add.existing(prize)
    //sets the physics body size
    prize.body.setSize(prize.width, prize.height)
    //Makes sure the physics are enabled 
    this.physics.world.enable(prize)
    return prize
  }

  //Handles what happens when the player interacts with a prize sprite
  handleCollectPrize(player, prize){
    //Bleep noise when we pick up a prize! 
    this.pickupPrize.play()
    //this hides the prize from display and disables the physics
    this.prizes.killAndHide(prize)
    this.physics.world.disableBody(prize.body)
    this.prizesCollected++
    this.prizesText.text = `You found ${this.prizesCollected}!`
  }

}

//this will allow us to have an infinite background
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
<<<<<<< HEAD
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;
=======

  //Let's look at this to figure out why the background disappears
  const w = scene.textures.get(texture).getSourceImage().width 
  const count = Math.ceil(totalWidth / w) * scrollFactor
>>>>>>> main

  let x = 0;
  for (let i = 0; i < count; i++) {
    const m = scene.add
      .image(x, scene.scale.height, texture)
      .setOrigin(1, 1)
      .setScrollFactor(scrollFactor)
      .setScale(4);
    x += m.width;
  }
<<<<<<< HEAD
};
=======

}

//this will add the prizes above platforms - may want to make them more random than one on each platform
>>>>>>> main
