/*
 *  scene file parsing base class
 */

const kAbstractClassError = new Error("Abstract Class")
const kAbstractMethodError = new Error("Abstract Method")

class SceneFileParser {   
    constructor () {
        if (this.constructor === SceneFileParser) {
            throw kAbstractClassError;
        }
    }

    // parse the content of a camera
    parseCamera() {
        throw kAbstractMethodError;
        return null;
    }

    // sqSet: is an array of Renderables
    // parse file content, create Renderable and push to the array
    parseSquares(sqSet) {
        throw kAbstractMethodError;
        return null;
    }
}

export default SceneFileParser;
