/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 * Notice how the import are chained:
 *     my_game_initialize   import from my_game_main
 *     my_game_update       import from my_game_initialize  (which includes my_game_main)
 *     my_game              import from my_game_update      (which includes my_game_main and my_game_update)
 */
 
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import MyGame from "./my_game_update.js";
import { gSharedCameraName } from "./my_game_main.js";
import BlueLevel from "./next_levels/blue_level.js";

MyGame.prototype.nextLevelInstance = function() {
    return new BlueLevel;
}

// 
MyGame.prototype.next = function() {      
    engine.Scene.prototype.next.call(this);  // this is calling Scene.next()

    // storage into resource_map
    engine.storage.set(gSharedCameraName, this.mSmallCamera);

    // next scene to run
    let nextLevel = this.nextLevelInstance();  // next level to be loaded
    nextLevel.start();
}

export default MyGame;
export { gSharedCameraName }

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}
