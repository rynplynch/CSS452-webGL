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
                // For this very simple game, let's move the white square and pulse the red

                let whiteXform = this.mWhiteSq.getXform();
                let deltaX = 0.05;

                // Step A: test for white square movement
                if (engine.input.isKeyPressed(engine.input.keys.Right)) {
                        if (whiteXform.getXPos() > 30) { // this is the right-bound of the window
                                whiteXform.setPosition(10, 60);
                        }
                        whiteXform.incXPosBy(deltaX);
                }

                // Step  B: test for white square rotation
                if (engine.input.isKeyClicked(engine.input.keys.Up)) {
                        whiteXform.incRotationByDegree(10);
                }

                let redXform = this.mRedSq.getXform();
                // Step  C: test for pulsing the red square
                if (engine.input.isKeyPressed(engine.input.keys.Down)) {
                        if (redXform.getWidth() > 5) {
                                redXform.setSize(2, 2);
                        }
                        redXform.incSizeBy(0.05);
                }
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
