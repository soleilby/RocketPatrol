class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // menu display
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

        this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ↔ arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#f0f8ff';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#c9e9ff';
        menuConfig.color = "#843605";
        this.add.text(centerX, centerY + (2 * textSpacer), 'Press ↑ for Multiplayer', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        // this.scene.start("playScene");
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // easy mode settings
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multiplay: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // hard mode settings
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multiplay: 0
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            // go to multiplayer mode
            game.settings = {multiplay: 1}
            this.sound.play('sfx_select');
            this.scene.start("MenuMultiplayScene");
        }
    }
}