/*
 * JSON scene file parsing utils
 */

// Engine utility stuff
import engine from "../../engine/index.js";
import SceneFileParser from "./scene_file_parser.js";

class SceneFileParserJson extends SceneFileParser {
    
    constructor(json) {  // content of the JSON file
        super();
    }

    parseCamera() {
        return null;
    }

    parseSquares(sqSet) {  
    }
}

export default SceneFileParserJson;