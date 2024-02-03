/*
 * File: my_game_main.js 
 * This is the class, initialization, and draw function definitions
 * Notice how the import are chained:
 *     my_game_initialize   import from my_game_main
 *     my_game_update       import from my_game_initialize  (which includes my_game_main)
 *     my_game              import from my_game_update      (which includes my_game_main and my_game_update)
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Engine stuff
import engine from "../engine/index.js";

let gSharedCameraName = "gSmallCamera";

class MyGame extends engine.Scene {
    constructor(level) {
        super();
        this.kJSONSceneFile = "assets/scene.json";

        this.mDefaultCameraBg = [0.5, 0.9, 0.9, 1];

        // The camera to view the scene
        this.mCamera = null;
        this.mSmallCamera = null;

        this.mHeroRotateSpeed = 0; // rotation rate of the mHero (to be init)
        this.mSupportMoveSpeed = 0; // movement speed of mSupport

        // the hero and the support objects
        this.mHero = null;  // the next to the last square in the data file
        this.mSupport = null; // the very VERY last square in the data file
        this.mAllSq = [];  // All the squares in the data file
    }

    load() {
        // loads the audios
        engine.json.load(this.kJSONSceneFile);
    }

    unload() {
        engine.json.unload(this.kJSONSceneFile);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        // Step  B: Activate the drawing Camera
        this._drawCamera(this.mCamera);
        this._drawCamera(this.mSmallCamera);
    }

    _drawCamera(cam) {
        cam.setViewAndCameraMatrix();
        let i;
        for (i = 0; i<this.mAllSq.length; i++) {
            this.mAllSq[i].draw(cam);
        }
    }
}

export default MyGame;
export { gSharedCameraName }