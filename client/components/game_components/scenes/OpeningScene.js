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

        // Add title
        this.add
            .text(400, 83, 'FormMotion', {
                fill: '#2a275c',
                fontSize: '34px',
                fontStyle: 'bold'
        })
        .setOrigin(0.5);

        // Add description of game
        this.add
            .text(400,
                200,
                'Hop around your world, from one platform to another, be sure to collect your prizes to earn points!',
                {
                    fill: 'CED4D6',
                    fontSize: '20px',
                    fontStyle: 'bold',
                    align: 'center',
                    wordWrap: {width: 480, height: 445, useAdvancedWrap: true},
                }
            )
            .setOrigin(0.5);

        // Add instructions
        this.add
            .text(400, 340, '<= => to move | ^ to jump', {
                fill: 'CED4D6',
                fontSize: '20px',
                fontStyle: 'bold',
                align: 'center',
        })
        .setOrigin(0.5)

        //Start Button 
        this.startButton = this.add
            .text(400, 490, 'Start', {
                fill: '2A275C',
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
