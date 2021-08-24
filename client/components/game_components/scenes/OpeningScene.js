import Phaser from 'phaser';

export default class OpeningScene extends Phaser.Scene {
    constructor() {
        super('OpeningScene');
    }

    create() {
        // Popup box
        this.popup = this.add.graphics();
        this.popup.lineStyle(1, 0x2a275c);
        this.popup.fillStyle(0x7c8d99, 0.5);
        this.popup.strokeRect(25,23,750,550);
        this.popup.fillRect(25,23,750,550);

        // Start button square
        this.button = this.add.graphics();
        this.button.lineStyle(1, 0x2a275c);
        this.button.fillStyle(0xf6304, 0.5);
        this.button.strokeRect(325, 465, 150, 50);
        this.button.fillRect(325, 465, 150, 50);

        // Show the Avatar in the pop up box
        this.player = this.add
        .sprite(300, 100, 'playerFacingRight')
        .setScale(0.25)
        .setOrigin(1.8, 0.02) // player placement

        // Add title
        this.add
            .text(400, 83, 'FormMotion', {
                fill: '#fff',
                fontSize: '40px',
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        // Add description of game
        this.add
            .text(400,
                200,
                'Hop around your world, from one platform to another, be sure to collect your prizes to earn points!',
                {
                    fill: '#fff',
                    fontSize: '20px',
                    align: 'center',
                    wordWrap: {width: 480, height: 445, useAdvancedWrap: true},
                }
            )
            .setOrigin(0.5);

        // Add instructions
        this.add
            .text(400, 340, '<= => to move | ^ to jump', {
                fill: '#fff',
                fontSize: '20px',
                align: 'center',
            })
            .setOrigin(0.5)

        //Start Button 
        this.startButton = this.add
            .text(400, 490, 'Start', {
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
                this.scene.stop('OpeningScene');
            },
            this
        );
    }
}
// ^^^^^ End of create()
