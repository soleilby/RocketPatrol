class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocketPink', './assets/rocketPink.png');
        this.load.image('rocketGreen', './assets/rocketGreen.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64,
        frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0xf8f5ff).setOrigin(0,0);
        // define keys for P1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // define keys for P2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        // add rockets (p1, p2)
        if(game.settings.multiplay == 1){
            //I define it this way because rockets pick their controls based off of this setting
            game.settings.multiplay = 0;
            this.p1Rocket = new Rocket(this, game.config.width/4, 431, 'rocketGreen').setScale(0.5, 0.5).setOrigin(0, 0);
            game.settings.multiplay = 1;
            this.p2Rocket = new Rocket(this, (3*game.config.width)/4, 431, 'rocketPink').setScale(0.5, 0.5).setOrigin(0, 0);
        }else{
            this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        }
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // p1 and p2 score
        this.p1Score = 0;
        this.p2Score = 0;
        // score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ebe1ff',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bototm: 5,
            },
            fixedWidth: 100
        }
        if(game.settings.multiplay == 0){
            this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
        }else{ 
            // p1 and p2 colors
            this.scoreConfig.backgroundColor = '#C6FD66';
            this.scoreConfig.color = '#843605';
            this.scoreConfig.align = 'left';
            this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);
            this.scoreConfig.backgroundColor = '#FEA9D3';
            this.scoreConfig.color = '#843605';
            this.scoreConfig.align = 'right';
            this.scoreRight = this.add.text(471, 54, this.p2Score, this.scoreConfig);
            this.scoreConfig.backgroundColor = '#ebe1ff';
            this.scoreConfig.color = '#843605';
        }
        // game over flag
        this.gameOver = false;
        
        // 45/60-second play clock
        this.timeOffset = this.time.now;
        // timer
        this.scoreConfig.align = 'center';
        this.timeUI = this.add.text(270, 54, '0', this.scoreConfig);
        this.scoreConfig.align = 'right';
    }


    update(){
        this.starfield.tilePositionX -= 4;
        //check if the game's over
        if(this.time.now - this.timeOffset >= game.settings.gameTimer && this.gameOver == false){
            this.timeUI.text = '0.0000';
            this.scoreConfig.fixedWidth = 0;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', 
            this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu',
            this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        // update in-game timer
        if(!this.gameOver){
            this.timeUI.text = (game.settings.gameTimer - (this.time.now - this.timeOffset)) / 1000;
        }
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            game.settings.spaceshipSpeed -= 1.5;
            this.scene.restart(this.p1Score);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        if(!this.gameOver){
            this.p1Rocket.update();
            if(game.settings.multiplay == 1){ this.p2Rocket.update(); }
            this.ship01.update();           //update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }
        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score;
            this.gameEnd += 1000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score;
            this.gameEnd += 1000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score;
            this.gameEnd += 1000;
        }
        // check for collisions for p2
        if(game.settings.multiplay == 1){
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
                this.p2Score += this.ship03.points;
                this.scoreRight.text = this.p2Score;
                this.gameEnd += 1000;
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
                this.p2Score += this.ship02.points;
                this.scoreRight.text = this.p2Score;
                this.gameEnd += 1000;
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
                this.p2Score += this.ship03.points;
                this.scoreRight.text = this.p2Score;
                this.gameEnd += 1000;
            }
        }
    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x  + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;             // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animations completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.sound.play('sfx_explosion');
    }
}