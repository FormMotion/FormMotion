import Phaser from "phaser";
import React from "react";
class Prize extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setScale(0.7);
  }
}

class Slime extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setScale(0.5);
  }
}

class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setScale(0.5);
  }
}

export default class Game extends Phaser.Scene {
  constructor() {
    super("MainScene");

    //Game Items (player, cursors, platforms, etc)
    this.player;
    this.cursors;
    this.platforms;
    this.bgscale;

    //Interactive Items - prizes, enemies, power ups
    this.prizes;
    this.prizesCollected = 0;
    this.prizesText = "Grace Hopping Along!";
    this.pickupPrize;
    this.slime;
    this.powerUp;
    this.poweredUp = false;
    this.poweredUpTimer;

    //Noises
    this.jumpNoise;
    this.landNoise;
    this.gameOverAudio;
    this.directionAudio;
    this.downNoise;

    //Movement and Misc.
    this.justLanded;
    this.justJumped = 0;
    this.spaceBar;
    this.alreadyPlaying;
    this.pauseButton;
  }

  // find out if music/sounds are already playing from a previous game
  init(data) {
    if (data) {
      this.alreadyPlaying = data.alreadyPlaying;
      if (data.alreadyPlaying) {
        this.prizesCollected = 0;
        this.poweredUp = false;
      }
    }
  }

  preload() {
    //////////**********BACKGROUNDS**********//////////

    const purpleMountains = localStorage.getItem("purpleMountains");
    const mysteriousForest = localStorage.getItem("mysteriousForest");

    console.log("purple mountains", purpleMountains);
    console.log("mysterious forest", mysteriousForest);

    let bg10 = "assets/backgrounds/Snow/Snow Layer 01.png";
    let bg9 = "assets/backgrounds/Snow/Snow Layer 02.png";
    let bg8 = "assets/backgrounds/Snow/Snow Layer 03.png";
    let bg7 = "assets/backgrounds/Snow/Snow Layer 04.png";
    let bg6 = "assets/backgrounds/Snow/Snow Layer 05.png";
    let bg5 = "assets/backgrounds/Snow/Snow Layer 06.png";
    let bg4 = "assets/backgrounds/Snow/Snow Layer 07.png";
    let bg3 = "assets/transparent_background_500_x_800.png";
    let bg2 = "assets/transparent_background_500_x_800.png";
    let bg1 = "assets/transparent_background_500_x_800.png";
    this.bgscale = 4;

    ///////Purple Desert Mountains////////////////////
    if (purpleMountains === "true" && mysteriousForest === "false") {
      bg10 = "assets/backgrounds/parallax_mountains/parallax-mountain-bg.png";
      bg9 =
        "assets/backgrounds/parallax_mountains/parallax-mountain-foreground-trees.png";
      bg8 =
        "assets/backgrounds/parallax_mountains/parallax-mountain-montain-far.png";
      bg7 =
        "assets/backgrounds/parallax_mountains/parallax-mountain-mountains.png";
      bg6 = "assets/backgrounds/parallax_mountains/parallax-mountain-trees.png";
      bg5 = "assets/transparent_background_500_x_800.png";
      bg4 = "assets/transparent_background_500_x_800.png";
      bg3 = "assets/transparent_background_500_x_800.png";
      bg2 = "assets/transparent_background_500_x_800.png";
      bg1 = "assets/transparent_background_500_x_800.png";
      this.bgscale = 5;
    }

    ///////Mysterious Forest////////////////////
    if (mysteriousForest === "true" && purpleMountains === "false") {
      bg10 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 01.png";
      bg9 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 02.png";
      bg8 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 03.png";
      bg7 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 04.png";
      bg6 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 05.png";
      bg5 =
        "assets/backgrounds/Mysterious Forest (update 3.0)/Mysterious Layer 06.png";
      bg4 = "assets/transparent_background_500_x_800.png";
      bg3 = "assets/transparent_background_500_x_800.png";
      bg2 = "assets/transparent_background_500_x_800.png";
      bg1 = "assets/transparent_background_500_x_800.png";
      this.bgscale = 4;
    }

    if (!this.alreadyPlaying) {
      //Static images hosted within assets folder
      this.load.image("bg-10", bg10);
      this.load.image("bg-9", bg9);
      this.load.image("bg-8", bg8);
      this.load.image("bg-7", bg7);
      this.load.image("bg-6", bg6);
      this.load.image("bg-5", bg5);
      this.load.image("bg-4", bg4);
      this.load.image("bg-3", bg3);
      this.load.image("bg-2", bg2);
      this.load.image("bg-1", bg1);

      this.load.image("slime", "assets/single_slime.png");

      //loading button images
      this.load.image("pause-button", "assets/game-buttons/Pause-Button.png");

      //Loaded from localStorage - user drawn images
      let drawnCharacter = localStorage.getItem("playerDrawnCharacter");
      let drawnPlatform = localStorage.getItem("playerDrawnPlatform");
      let drawnPrize = localStorage.getItem("playerDrawnPrize");
      const standing = localStorage.getItem("standingAvatar");
      const landing = localStorage.getItem("landingAvatar");
      const forward = localStorage.getItem("forwardMovementAvatar");
      const jumping = localStorage.getItem("jumpingMovementAvatar");
      const slimed = localStorage.getItem("slimeAvatar");

      //Default Character
      let defaultCharacter = new Image();
      defaultCharacter.src = drawnCharacter;
      this.textures.addBase64("defaultCharacter", defaultCharacter);

      // CHARACTER DRAWN
      if (standing !== "false") {
        //Standing / Jumping in Place
        const standingAvatar = new Image();
        standingAvatar.src = standing;
        this.textures.addBase64("standingPlayer", standing, standingAvatar);

        //Landing
        const landingAvatar = new Image();
        landingAvatar.src = landing;
        this.textures.addBase64("landingPlayer", landing, landingAvatar);

        //Forward Movement (not jumping)
        const forwardAvatar = new Image();
        forwardAvatar.src = forward;
        this.textures.addBase64("forwardPlayer", forward, forwardAvatar);

        //Forward Movement (jumping)
        const jumpingAvatar = new Image();
        jumpingAvatar.src = jumping;
        this.textures.addBase64("jumpingPlayer", jumping, jumpingAvatar);

        //Slimed!
        const slimeAvatar = new Image();
        slimeAvatar.src = slimed;
        this.textures.addBase64("slimePlayer", slimed, slimeAvatar);
      }

      //powerUp
      this.load.image("powerup", "assets/powerup_basic.png");

      // PLATFORM DRAWN
      const platformData = new Image();
      platformData.src = drawnPlatform;
      this.textures.addBase64("platform", drawnPlatform, platformData);

      this.load.image("platform", "assets/eyePlatform.png");

      // PRIZE DRAWN
      const prizeData = new Image();
      prizeData.src = drawnPrize;
      this.textures.addBase64("prize", drawnPrize, prizeData);

      //Background Music
      this.load.audio("spinningOut", "assets/music/spinningOut.wav");

      // Sounds
      this.load.audio("pickup", "assets/sounds/kalimba_chime.mp3");
      this.load.audio("jump", "assets/sounds/jump-3.wav");
      this.load.audio("land", "assets/sounds/bonk-4.wav");
      this.load.audio("gameOver", "assets/sounds/lose-5.wav");
      this.load.audio("down", "assets/sounds/bonk-1.wav");
      this.load.audio("direction", "assets/sounds/bonk-5.wav");
    }
  }

  create() {
    //Opening Scene launch pop-up
    this.scene.launch("OpeningScene");
    this.scene.pause("MainScene");

    //Background
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 1000;

    //This allows for parallax scrolling
    this.add
      .image(width * 0.5, height * 0.5, "bg-10")
      .setScrollFactor(0)
      .setScale(5);
    createAligned(this, totalWidth, "bg-9", 0.2, this.bgscale);
    createAligned(this, totalWidth, "bg-8", 0.4, this.bgscale);
    createAligned(this, totalWidth, "bg-7", 0.6, this.bgscale),
      createAligned(this, totalWidth, "bg-6", 0.8, this.bgscale);
    createAligned(this, totalWidth, "bg-5", 1, this.bgscale);
    createAligned(this, totalWidth, "bg-4", 1.2, this.bgscale);
    createAligned(this, totalWidth, "bg-3", 1.4, this.bgscale);
    createAligned(this, totalWidth, "bg-2", 1.6, this.bgscale),
      createAligned(this, totalWidth, "bg-1", 1.8, this.bgscale);

    //Platforms

    this.platforms = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    for (let i = 1; i < 5; i++) {
      const x = 450 * i;
      const y = 300;
      //shouldn't go higher than 450 for y-axis or the bottom of the background shows

      const platform = this.platforms.create(x, y, "platform");
      platform.setSize(250, 75, true);

      const tweenY = 375;
      const tweenX = Phaser.Math.Between(100, 400);
      const tweenDuration = Phaser.Math.Between(200, 1200);

      this.tweens.timeline({
        targets: platform.body.velocity,
        loop: -1,
        yoyo: true,
        tweens: [
          { x: 0, y: -tweenY, duration: tweenDuration },
          { x: tweenX, y: tweenY, duration: tweenDuration },
          { x: 0, y: -tweenY, duration: tweenDuration },
          { x: -tweenX, y: tweenY, duration: tweenDuration },
        ],
      });

      platform.body.updateFromGameObject();
    }

    //Avatar / Player Character
    this.player = this.physics.add
      .sprite(450, 0, "standingPlayer")
      .setScale(0.25)
      .setSize(250, 745, true);

    //Prize
    this.prizes = this.physics.add.group({
      classType: Prize,
    });

    const style = { color: "#D35400", fontSize: 30 };
    this.prizesText = this.add
      .text(600, 10, " ", style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    //Slime Enemy
    this.slime = this.physics.add.group({
      classType: Slime,
    });

    //Power Up
    this.powerUp = this.physics.add.group({
      classType: PowerUp,
    });

    //Colliders
    this.physics.add.collider(this.platforms, this.prizes);
    this.physics.add.collider(this.platforms, this.slime);
    this.physics.add.collider(this.platforms, this.player);
    this.physics.add.collider(this.platforms, this.powerUp);

    this.physics.add.overlap(
      this.player,
      this.prizes,
      this.handleCollectPrize,
      undefined, //this is for a process callback that we are not using
      this
    );

    this.physics.add.overlap(
      this.player,
      this.slime,
      this.handleSlime,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.powerUp,
      this.handlePowerUp,
      undefined,
      this
    );

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    //Cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.addPointer(2);

    //Camera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(1, 0);

    if (!this.alreadyPlaying) {
      //Sounds
      this.pickupPrize = this.sound.add("pickup", { volume: 0.5, loop: false });
      this.jumpNoise = this.sound.add("jump", { volume: 1, loop: false });
      this.landNoise = this.sound.add("land", { volume: 1, loop: false });
      this.gameOverAudio = this.sound.add("gameOver", {
        volume: 1,
        loop: false,
      });
      this.directionAudio = this.sound.add("direction", {
        volume: 1,
        loop: false,
      });
      this.downNoise = this.sound.add("down", { volume: 1, loop: false });

      //Background Music
      this.spinningOut = this.sound.add("spinningOut", {
        volume: 0.1,
        loop: true,
      });
    }

    // this gets rid of errors when we're trying to play music before it's possible to play music,
    // and checking to make sure there isn't already music playing from a previous game before playing
    if (!this.alreadyPlaying) {
      if (!this.sound.locked) {
        this.spinningOut.play();
      } else {
        this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
          this.spinningOut.play();
        });
      }
    }

    //Pause button

    this.pauseButton = this.add
      .image(40, 50, "pause-button")
      .setScrollFactor(0)
      .setScale(0.55)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.pause();
        this.scene.launch("PauseScene");
      });
  }

  update() {
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    const spaceBarPressed = this.spaceBar.isDown;

    if (spaceBarPressed) {
      this.scene.pause();
      this.scene.launch("PauseScene");
    }

    //Player Movement
    const leftCursor = this.cursors.left;
    const rightCursor = this.cursors.right;
    const upCursor = this.cursors.up;
    const downCursor = this.cursors.down;
    const pointer1 = this.input.pointer1;
    const pointer2 = this.input.pointer2;

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.justJumped = 0;
      this.landNoise.play();
      this.player.setVelocityY(-500);
      this.player.setTexture("landingPlayer");
      this.justLanded = this.player.y;
    } else if (!touchingDown & (this.player.y < this.justLanded - 5)) {
      this.player.setTexture("standingPlayer");
    }

    if (leftCursor.isDown || (pointer1.isDown && pointer1.x < 500)) {
      this.player.setVelocityX(-450);
      this.player.setTexture("forwardPlayer");
      this.player.flipX = true; // Avatar facing left
      if (upCursor.isDown && this.justJumped <= 2) {
        this.player.setTexture("jumpingPlayer");
      }
    } else if (rightCursor.isDown || (pointer1.isDown && pointer1.x > 700)) {
      this.player.setVelocityX(450);
      this.player.setTexture("forwardPlayer");
      this.player.flipX = false; // Avatar facing right
      if (upCursor.isDown) {
        this.player.setTexture("jumpingPlayer");
      }
    } else if (upCursor.isDown && this.justJumped <= 2) {
      this.player.setTexture("jumpingPlayer");
    } else {
      this.player.setVelocityX(0);
    }

    //Player needs to hold down second input (finger) to float/jump on touchscreen
    if (
      pointer1.isDown &&
      pointer2.isDown &&
      this.player.y > -350 &&
      this.player.y < 400 &&
      this.justJumped <= 2
    ) {
      this.justJumped++;
      this.jumpNoise.play();
      this.player.setVelocityY(-400);
    }

    //For jumping up
    const didPressJump = Phaser.Input.Keyboard.JustDown(upCursor);
    if (
      didPressJump &&
      this.player.y > -350 &&
      this.player.y < 400 &&
      this.justJumped <= 2
    ) {
      this.justJumped++;
      this.jumpNoise.play();
      this.player.setVelocityY(-400);
    }

    //For jumping down
    const didPressDown = Phaser.Input.Keyboard.JustDown(downCursor);
    if (didPressDown) {
      this.downNoise.play();
      this.player.setVelocityY(500);
    }

    //For left and right sound effects
    const didPressLeft = Phaser.Input.Keyboard.JustDown(leftCursor);
    const didPressRight = Phaser.Input.Keyboard.JustDown(rightCursor);
    if (didPressLeft) {
      this.directionAudio.play();
    }
    if (didPressRight) {
      this.directionAudio.play();
    }

    //Platform Infinite Scrolling
    this.platforms.children.iterate(child => {
      const platform = child;
      const scrollX = this.cameras.main.scrollX;
      if (platform.x <= scrollX - 100) {
        platform.x = this.player.x + 200;
        platform.body.updateFromGameObject();
        this.addPrizeAbove(platform);
        this.addSlimeAbove(platform);
        this.addPowerUp();
      }
    });

    //Ends game if player falls below bottom of screen
    if (this.player.y > 800) {
      const style = { color: "#fff", fontSize: 80 };
      this.add.text(400, 400, "GAME OVER", style).setScrollFactor(0);
      this.add
        .text(400, 500, `Final Score: ${this.prizesCollected}`, style)
        .setScrollFactor(0);

      this.gameOverAudio.play();
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      // if restarting, let the new game know if music is already playing so it
      // doesn't play multiple times at once
      this.scene.restart({
        alreadyPlaying: true,
      }); // restart current scene
    }
  }

  //Adds the prizes above the platforms
  addPrizeAbove(sprite) {
    //this will add the prize instance above the given sprite (in this case, it will be a platform) using the sprite's display height as a guide
    const y = sprite.y - 500;
    const prize = this.prizes.get(sprite.x + 450, y, "prize");

    //makes active and visible so we can reuse prizes - otherwise they disappear and don't come back after our player collects them
    prize.setActive(true);
    prize.setVisible(true);
    this.add.existing(prize);
    //sets the physics body size
    prize.body.setSize(90, 90);
    //Makes sure the physics are enabled
    this.physics.world.enable(prize);
    return prize;
  }
  //Handles what happens when the player interacts with a prize sprite
  handleCollectPrize(player, prize) {
    //Bleep noise when we pick up a prize!
    this.pickupPrize.play();
    //this hides the prize from display and disables the physics
    this.prizes.killAndHide(prize);
    this.physics.world.disableBody(prize.body);
    if (this.poweredUp) {
      this.prizesCollected++;
    }
    this.prizesCollected++;
    this.prizesText.text = `Score: ${this.prizesCollected}`;
  }

  addSlimeAbove(sprite) {
    if (this.prizesCollected >= 5) {
      let xPlus = Phaser.Math.Between(500, 1500);

      if (this.prizesCollected >= 10 && this.prizesCollected < 15) {
        xPlus = Phaser.Math.Between(500, 1000);
      }
      if (this.prizesCollected >= 15) {
        xPlus = Phaser.Math.Between(500, 750);
      }

      const y = sprite.y - Phaser.Math.Between(300, 700);
      const slime = this.slime.get(sprite.x + xPlus, y, "slime");

      slime.setActive(true);
      slime.setVisible(true);
      this.add.existing(slime);
      slime.body.setSize(60, 60);
      this.physics.world.enable(slime);
      return slime;
    }
  }

  handleSlime() {
    if (!this.poweredUp) {
      this.player.setTexture("slimePlayer");
      const style = { color: "#fff", fontSize: 80 };
      this.add.text(400, 400, "GAME OVER", style).setScrollFactor(0);
      this.add
        .text(400, 500, `Final Score: ${this.prizesCollected}`, style)
        .setScrollFactor(0);

      this.gameOverAudio.play();
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.restart({
        alreadyPlaying: true,
      });
    }
  }

  addPowerUp() {
    if (
      this.prizesCollected > 1 &&
      this.prizesCollected % 10 === 0 &&
      !this.poweredUp
    ) {
      const powerUp = this.powerUp
        .get(this.player.x + 400, 100, "powerup")
        .setScale(1.5);
      powerUp.setActive(true);
      powerUp.setVisible(true);
      this.add.existing(powerUp);
      powerUp.body.setSize(90, 90);
      return powerUp;
    }
  }

  handlePowerUp() {
    this.poweredUp = true;
    this.player.setTint(0xffdb22);
    this.player.setScale(0.45);

    function onEvent() {
      this.poweredUp = false;
      this.player.setTint(0xffffff);
      this.player.setScale(0.25);
    }

    this.poweredUpTimer = this.time.delayedCall(10000, onEvent, [], this);
  }
}

//this will allow us to have an infinite background
const createAligned = (scene, totalWidth, texture, scrollFactor, bgscale) => {
  //Let's look at this to figure out why the background disappears
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;
  let x = 500;
  for (let i = 0; i < count; i++) {
    const m = scene.add
      .image(x, scene.scale.height, texture)
      .setOrigin(1, 1)
      .setScrollFactor(scrollFactor)
      .setScale(bgscale);
    x += m.width;
  }
};
