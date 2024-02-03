/*
 * File: my_game_update.js 
 * This is the logic of our game. 
 * Notice how the import chaining is done.
 * * Notice how the import are chained:
 *     my_game_initialize   import from my_game_main
 *     my_game_update       import from my_game_initialize  (which includes my_game_main)
 *     my_game              import from my_game_update      (which includes my_game_main and my_game_update)
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import MyGame from "./my_game_initialize.js";

import { cameraManip, cameraViewportManip } from "./util/user_camera_manip.js";

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
// 
// Notice, how we can append new instance methods to the class
// By this point, MyGame class must be already defined (in my_game_main imported)
MyGame.prototype.update = function () {
    // moving the support object at proper speed
    let sf = this.mSupport.getXform();
    sf.incXPosBy(this.mSupportMoveSpeed);
    if (sf.getXPos() > 30) {
        sf.setXPos(10);
    }
    
    // rotate the hero object at proper speed
    let xf = this.mHero.getXform();
    xf.incRotationByDegree(this.mHeroRotateSpeed);
    
    if (engine.input.isKeyPressed(engine.input.keys.Shift)) {
        cameraManip(this.mSmallCamera);
        cameraViewportManip(this.mSmallCamera);
    } else {
        cameraManip(this.mCamera);
        cameraViewportManip(this.mCamera);
    }
    
    // new scene
    if (engine.input.isKeyClicked(engine.input.keys.N)) {
        this.next();
    }

    if (engine.input.isKeyClicked(engine.input.keys.Q)) {
        this.stop();
    }
}

export default MyGame;