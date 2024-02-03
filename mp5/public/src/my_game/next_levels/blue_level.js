/*
 * This is the logic of our game. 
 */


// Engine Core stuff
import engine from "../../engine/index.js";

// Local stuff
import MyGame from "../my_game_main.js";
import RedLevel from "./red_level.js";

import SceneFileParserXml from "../util/scene_file_parser_xml.js";

let gBlueLevelData = "gBlueLevelData";

class BlueLevel extends MyGame {
    constructor() {
        super();

        // scene file name
        this.kXMLSceneFile = "assets/blue_level.xml";
    }

    load() {
        engine.xml.load(this.kXMLSceneFile);
    }

    unload() {
        engine.xml.unload(this.kXMLSceneFile);
    }

    next() {
        engine.storage.set(gBlueLevelData, this);
        super.next();
    }

    thisLevelParser() {
        return new SceneFileParserXml(engine.xml.get(this.kXMLSceneFile));
    }

    nextLevelInstance() {
        return new RedLevel();  // load the next level
    }
}

export default BlueLevel;
export {gBlueLevelData};