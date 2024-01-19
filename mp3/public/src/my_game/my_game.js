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

                let trsMatrix = mat4.create();

                mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25,  0.0));
                mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
                mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));
                // draw object with the white shader
                this.mWhiteSq.draw(trsMatrix);

                // clear the transform matrix
                mat4.identity(trsMatrix);

                mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
                mat4.rotateZ(trsMatrix, trsMatrix, -0.785);
                mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));

                // draw object with the red shader
                this.mRedSq.draw(trsMatrix);
        }
}

export default MyGame;
