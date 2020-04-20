// game configuration object
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, MenuMultiplay, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    multiplay: 0
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyA, keyN, keyM, keyUP, keyDOWN;

