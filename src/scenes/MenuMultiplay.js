class MenuMultiplay extends Phaser.Scene {
    constructor() {
        super("MenuMultiplayScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
        }   

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL TWO-PLAYER', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        menuConfig.backgroundColor = '#FF4466';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY, 'P1: Use ↔ arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#C6FD66';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY + textSpacer, 'P2: Use <N M> keys to move and (A) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '28px';
        menuConfig.backgroundColor = '#FEA9D3';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY + (2 * textSpacer), 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#F3B141';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY + (3 * textSpacer), 'Press ↓ for Single Player', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        // this.scene.start("playScene");
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // easy mode settings
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multiplay: 1
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // hard mode settings
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multiplay: 1
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            // go to two-player mode
            game.settings = {multiplay: 0}
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
    }
}