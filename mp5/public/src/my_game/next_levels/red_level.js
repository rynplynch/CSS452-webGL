/*
 * This is the logic of our game. 
 */


// Engine Core stuff
import engine from "../../engine/index.js";

// Local stuff
import MyGame from "../my_game_main.js";
import { gBlueLevelData } from "./blue_level.js";

// Please implements the proper behavior as specified
class RedLevel extends MyGame {
    constructor() {
        super();
        this.kXMLSceneFile = "assets/blue_level.xml";
    }

    nextLevelInstance() {
        return new MyGame();  // load the next level
    }

    init() {
        let storedData = engine.storage.get(gBlueLevelData);
        //
        // initialize the scene with the retrieve data
        //
        this.mCamera = storedData.mCamera;
        this.mSmallCamera = storedData.mSmallCamera;
        this.mHeroRotateSpeed = storedData.mHeroRotateSpeed;
        this.mSupportMoveSpeed = storedData.mSupportMoveSpeed;
        this.mAllSq = storedData.mAllSq;
        this.mHero = storedData.mHero;
        this.mSupport = storedData.mSupport;
        this.mSizeChangeRate = storedData.mSizeChangeRate;
        this.kUpdatePeriod = storedData.kUpdatePeriod;

        engine.storage.remove(gBlueLevelData);  // remove the data

        // sets up the proper background color to differentiate which level
        this.mCamera.setBackgroundColor([0.6, 0.4, 0.4, 1]);
        this.mSmallCamera.setBackgroundColor([0.8, 0.7, 0.7, 1]);
    }

    update() {
        super.update();  // to support default MyGame behavior
    }
}

export default RedLevel;
