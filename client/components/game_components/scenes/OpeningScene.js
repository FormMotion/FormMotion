import Phaser from 'phaser';

export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super('OpeningScene');
        this.spaceBar
    }

    create() {

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // Popup box
        this.popup = this.add.graphics();
        this.popup.lineStyle(1, 0x2a275c);
        this.popup.fillStyle(0x7c8d99, 0.9);
        this.popup.strokeRect(225,125,750,550);
        this.popup.fillRect(225,125,750,550);

        // Start button square
        this.button = this.add.graphics();
        this.button.lineStyle(1, 0x2a275c);
        this.button.fillStyle(0xf6304, 0.5);
        this.button.strokeRect(540, 500, 150, 50);
        this.button.fillRect(540, 500, 150, 50);

        // Show the Avatar in the pop up box
        this.player = this.add
        .sprite(350, 350, 'standingAvatar')
        .setScale(0.25)
        .setOrigin(1.8, 0.02) // player placement

        // Add title
        this.add
            .text(600, 200, 'FormMotion', {
                fill: '#fff',
                fontSize: '60px',
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        // Add description of game
        this.add
            .text(700,
                320,
                'Hop around your world, from one platform to another, be sure to collect your prizes to earn points!',
                {
                    fill: '#fff',
                    fontSize: '20px',
                    align: 'right',
                    wordWrap: {width: 480, height: 445, useAdvancedWrap: true},
                }
            )
            .setOrigin(0.5);

        // Add instructions
        this.add
            .text(750, 400, '<= => to move | ^ to jump', {
                fill: '#fff',
                fontSize: '20px',
                align: 'right',
            })
            .setOrigin(0.5)

        //Start Button 
        this.startButton = this.add
            .text(615, 525, 'Start', {
                fill: '#fff', // white text
                fontSize: '30px',
                fontStyle: 'bold'
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

}

