/*
 * JSON scene file parsing utils
 */

// Engine utility stuff
import engine from "../../engine/index.js";
import SceneFileParser from "./scene_file_parser.js";

class SceneFileParserJson extends SceneFileParser {
    
    constructor(json) {  // content of the JSON file
        super();
        this.json = json;
    }

    parseCamera() {
        // get the camera property from the pre-loaded json config
        let cameraProperty = this.json.Camera;

        // create a new camera object to be returned
        let mCamera = new engine.Camera(
            vec2.fromValues(
                cameraProperty.Center[0],
                cameraProperty.Center[1]
            ),   
            cameraProperty.Width,
            cameraProperty.Viewport
        );

        mCamera.setBackgroundColor(cameraProperty.BgColor)

        return mCamera;
    }

    // sqSet is just a plain list
    parseSquares(sqSet) {
        // grab sqaures from json object
        let squares = this.json.Square

        // loop over all the squares
        for (let i=0; i<squares.length ; i++) {
            // for each square create a new renderable
            let sq = new engine.Renderable();

            // configure each square with json property
            // set position
            sq.getXform().setPosition(squares[i].Pos[0], squares[i].Pos[1]);

            // set scale
            sq.getXform().setSize(squares[i].Width, squares[i].Height)

            // set rotation
            sq.getXform().setRotationInDegree(squares[i].Rotation)

            // set color
            sq.setColor(squares[i].Color)

            sqSet.push(sq);
        }
    }
}
export default SceneFileParserJson;
