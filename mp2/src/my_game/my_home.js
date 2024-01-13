/*
 * File: MyHome.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import * as engine from "../engine/core.js";

class MyHome {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        // Step B: Clear the canvas
        engine.clearCanvas([0.7, 0.9, 0.7, 1]);        
       
        // house body
                                 // Color[4]        x,y size[2]    x,y center pos[2]
        engine.drawRectangle([1.0, 0.7, 0.7, 1.0],  [1.2, 0.8],      [0.0, -0.3]);

        // house roof
        engine.drawTriangle([0.4, 0.4, 0.4, 1.0],   [1.2, 0.6],      [0.0, 0.4]);

        // Left Window
        engine.drawCircle  ([0.6, 0.6, 0.9, 1.0],   [0.3, 0.3],      [-0.35, -0.3]);

        // Right Window
        engine.drawCircle  ([0.6, 0.6, 0.9, 1.0],   [0.3, 0.3],      [0.35, -0.3]);

        // House door
        engine.drawRectangle([0.5, 0.5, 0.2, 1.0],  [0.2, 0.4],      [0.0, -0.5]);
    }
}

export default MyHome;