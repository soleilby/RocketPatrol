/*  Sunny Jang
    Nathan Altice
    CMPM120
    Rocket Patrol Mods:

    Starting Tier:
        - Allow the player to control the Rocket after it's fired (10)
        
    Novice Tier:
        - Display the time remaining (in seconds) on the screen (15)

    Intermediate Tier:
        - Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)

    S-Rank Tier:
        - Implement a simultaneous two-player mode (50) */

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

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyA, keyN, keyM, keyUP, keyDOWN;

