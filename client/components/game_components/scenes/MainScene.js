import Phaser from 'phaser'

//My theory is that we can pull in the images and then run them through the preload

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        this.load.image('background', '/assets/backgrounds/nightwithmoon.png')
    }

    create() {
        this.add.image(500, 600, 'background');
    }

    update() {

    }
}