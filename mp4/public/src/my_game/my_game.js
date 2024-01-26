/*
 * File: MyGame.js
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import * as loop from "../engine/core/loop.js";
import engine from "../engine/index.js";

class MyGame {
        constructor() {
                // renderables
                this.mWhiteSq = null;
                this.mRedSq = null

                // camera for the scene
                this.mCamera = null;
        }

        init() {
                // setup the camera
                this.mCamera = new engine.Camera(
                        vec2.fromValues(20, 60),
                        20,
                        [20, 40, 600, 300]
                );

                // change the background color of the viewport
                this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

                // create the renderables
                // set their colors
                this.mWhiteSq = new engine.Renderable();
                this.mWhiteSq.setColor([1, 1, 1, 1]);
                this.mRedSq = new engine.Renderable();
                this.mRedSq.setColor([1, 0, 0, 1]);

                // change the position of these renderables
                this.mWhiteSq.getXform().setPosition(20, 60);
                this.mWhiteSq.getXform().setRotationInRad(0.2);
                this.mWhiteSq.getXform().setSize(5, 5);

                this.mRedSq.getXform().setPosition(20, 60);
                this.mRedSq.getXform().setSize(2, 2);
        }

        draw() {
                // color of the canvas
                engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

                // activate the camera
                this.mCamera.setViewAndCameraMatrix();

                // activate our renerables
                this.mWhiteSq.draw(this.mCamera);
                this.mRedSq.draw(this.mCamera);
        }

        // What changes in every loop of our game?
        update() {
                // this describes the position of our white/red square
                let whiteXform = this.mWhiteSq.getXform();
                let redXform = this.mRedSq.getXform();
                // how much does the square move every loop?
                let deltaX = 0.05;

                // rotate the white square
                // if the x position is greater than the bounds of the world
                if (whiteXform.getXPos() > 30) {
                        // set the position back to the left side of the viewport
                        whiteXform.setPosition(10, 60);
                }

                // move the x position of the square
                whiteXform.incXPosBy(deltaX);
                // rotate the white square
                whiteXform.incRotationByDegree(1);

                // check the width of the red square
                // should it reach this size
                if (redXform.getWidth() > 5) {
                        // reset the size
                        redXform.setSize(2, 2);
                }

                // scale the red square
                redXform.incSizeBy(deltaX);
        }
}

window.onload = function() {
        // give the engine the tag of the html canvas
        engine.init("GLCanvas");

        // create the game object
        let myGame = new MyGame();

        // first call of the game loop
        loop.start(myGame);
}
