import Phaser from 'phaser';

export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super('OpeningScene');
        this.player
    }

    create() {
        this.spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // Popup box
        this.popup = this.add.graphics();
        this.popup.lineStyle(1, 0x2a275c);
        this.popup.fillStyle(0xAE8C9B, 0.7);
        this.popup.strokeRect(225,125,750,550);
        this.popup.fillRect(225,125,750,550);

        // Start button square
        this.button = this.add.graphics();
        this.button.lineStyle(1, 0x2a275c);
        this.button.fillStyle(0xD9E6A1, 1);
        this.button.strokeRect(540, 500, 150, 50);
        this.button.fillRect(540, 500, 150, 50);

        // Show the Avatar in the pop up box
        this.player = this.add
        .sprite(600, 350, 'standingPlayer')
        .setScale(0.25)
        .setOrigin(2.0, 0.50) // player placement

        // Add title
        this.add
            .text(600, 200, 'FormMotion', {
                fill: '#473A3F',
                fontSize: '30px',
                fontFamily: 'arial',
            })
            .setOrigin(0.5);

        // Add description of game
        this.add
            .text(700,
                320,
                'Hop around your world, from one platform to another, be sure to collect your prizes to earn points!',
                {
                    fill: '#251E20',
                    fontSize: '26px',
                    align: 'right',
                    fontFamily: 'arial',
                    wordWrap: {width: 480, height: 445, useAdvancedWrap: true},
                }
            )
            .setOrigin(0.5);

        // Add instructions
        this.add
            .text(750, 400, '<= => to move | ^ to jump', {
                fill: '#251E20',
                fontSize: '26px',
                align: 'right',
            })
            .setOrigin(0.5)

        //Start Button 
        this.startButton = this.add
            .text(615, 525, 'Start', {
                fill: '#251E20',
                fontSize: '30px',
                fontFamily: 'arial'
            })
            .setOrigin(0.5);

        this.startButton.setInteractive();
        this.startButton.on(
            'pointerdown',
            () => {
                this.scene.resume('MainScene');
                this.scene.stop();
            },
            this
        );
    }

        update() {
        // Space Bar to Resume the Game
        const spaceBarPressed = this.spaceBar.isDown;
  
        if (spaceBarPressed) {
        console.log('SpaceBar was pressed - inside MainScene');
        this.scene.resume('MainScene',{ soundPaused: false, musicPaused: false});
        this.scene.stop();
        }
    }

}

