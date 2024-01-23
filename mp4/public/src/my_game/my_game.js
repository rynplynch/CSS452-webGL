/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame {
        constructor(htmlCanvasID) {
                console.log();
                // Step A: Initialize the game engine
                engine.init(htmlCanvasID);

                // Step B: Create the Renderable objects:
                this.mWhiteSq = new engine.Renderable(true);
                this.mWhiteSq.setColor([1, 1, 1, 1]);
                this.mRedSq = new engine.Renderable(true);
        }
}

export default MyGame;
