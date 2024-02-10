/*
 * File: my_game_initialize.js 
 * Notice how the import are chained:
 *     my_game_initialize   import from my_game_main
 *     my_game_update       import from my_game_initialize  (which includes my_game_main)
 *     my_game              import from my_game_update      (which includes my_game_main and my_game_update)
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import MyGame from "./my_game_main.js";
import {gSharedCameraName} from "./my_game_main.js";

import SceneFileParserJson from "./util/scene_file_parser_json.js";

MyGame.prototype.thisLevelParser = function() {
    return new SceneFileParserJson(engine.json.get(this.kJSONSceneFile));
}

MyGame.prototype.init = function () {
    let sceneParser = this.thisLevelParser();
    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mAllSq);
    this.mDefaultCameraBg = vec4.clone(this.mCamera.getBackgroundColor());

    console.log(this.kJSONSceneFile);

    if (engine.storage.has(gSharedCameraName)) {
        this.mSmallCamera = engine.storage.get(gSharedCameraName);
    } else {
        let c = this.mCamera.getWCCenter();
        this.mSmallCamera = new engine.Camera(
            [c[0], c[1]],   // position of the camera
            20,
            [0, 350, 100, 100]
        );
        this.mSmallCamera.setBackgroundColor(vec4.clone(this.mDefaultCameraBg));
    }
    this.mHeroRotateSpeed = 360 / (5 * 60);
    this.mSupportMoveSpeed = this.mCamera.getWCWidth() / (3 * 60);

    this.mSupport = this.mAllSq[this.mAllSq.length-1];
    this.mHero = this.mAllSq[this.mAllSq.length-2];
}

export default MyGame;
