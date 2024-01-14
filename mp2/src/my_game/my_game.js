/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);

        // Create objects to be drawn
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        // clear canvas
        engine.clearCanvas([0, 0.8, 0, 1]);

        // draw object using white shader
        this.mWhiteSq.draw();

        // draw object using red shader
        this.mRedSq.draw();

        let recY = 0.6;     // y-location of rectangles
        let triY = 0.0;     // y-location of triangles
        let cirY = -0.6;    // y-location of circles
        
        let xPos = [-0.8,  -0.58,  -0.3,  0.1,  0.7];   // x-position of the shapes
        let size = [ [0.1, 0.3],                        // x/y size of the shapes
                     [0.3, 0.1],
                     [0.2, 0.2],
                     [0.3, 0.3],
                     [0.5, 0.5]
        ];
        
        for (let i = 0; i<5; i++) {
            let colorRef = xPos[i] + 0.8;
            let color = [colorRef/2, colorRef/3, colorRef/4, 1.0];
                              // color[4], size[2],   pos[x, y]
            // engine.drawRectangle(color,    size[i],   [xPos[i], recY]);
            // engine.drawTriangle (color,    size[i],   [xPos[i], triY]);
            // engine.drawCircle   (color,    size[i],   [xPos[i], cirY]);
        }
    }
}

export default MyGame;
