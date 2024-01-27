/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

// Accessing engine internal is not ideal, 
//      this must be resolved! (later)
import * as loop from "../engine/core/loop.js";

// Engine stuff
import engine from "../engine/index.js";

class MyGame {
    constructor() {
        // variables for the cursor
        this.mCursor = null;

        // The camera to view the scene
        this.mCamera = null;

        // System load specifics
        this.mObjectSize = 2;
        this.mNumPerLoad = 20;
        this.mLoadSpread = 15;

        // UI Update time
        this.mPreStatUpdateTime = performance.now();
        this.kUIUpdatePeriod = 750; // update period
    }

    init() {
        // set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5),   // position of the camera
            100,                        // width of camera
            [0, 0, 640, 480]         // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray

        // Initialize the cursor
        this.mCursor = new engine.Cursor([50, 37.5], // Initial position of cursor
                                         100  // wc width 
                                       , 75); // wc height

        this.mCursor.setCursorSize(this.mObjectSize);
        this.mCursor.setCursorRange(this.mLoadSpread);
    }


    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();

        // Step  C: Draw all objects
        // engine.LoadUtil.drawLoads(this.mCamera);
        this.mCursor.drawCursor(this.mCamera);
    }

    update() {
        this._printLoadStat();
        this._printLoopStat();

        // Let user update load stats
        this.mNumPerLoad = this._updateSize(this.mNumPerLoad, engine.input.keys.P, engine.input.keys.O);
        this.mObjectSize = this._updateSize(this.mObjectSize, engine.input.keys.K, engine.input.keys.J);
        this.mLoadSpread = this._updateSize(this.mLoadSpread, engine.input.keys.M, engine.input.keys.N);

        // update cursor position and size
        this._updateCursor();

        // Create or delete loads
        if (engine.input.isKeyClicked(engine.input.keys.Space))
            engine.LoadUtil.createLoadAt(this.mCursor.cursorLocation(), 
                    this.mObjectSize, this.mNumPerLoad, this.mLoadSpread);

        if (engine.input.isKeyClicked(engine.input.keys.D)) {
            engine.LoadUtil.removeLastLoad();
        }   
    }

    // Inc/Dec n based on inc/dec keys, returns the updated value
    _updateSize(n, inc, dec) {
        if (engine.input.isKeyClicked(inc))
            n++;
        if (engine.input.isKeyClicked(dec))
            n--;
        return n;
    }

    // Moves the cursor the the arrow keys
    _updateCursor() {
        let delta = 1;

        // move the cursor
        if (engine.input.isKeyPressed(engine.input.keys.Right)) 
            this.mCursor.moveCursor(delta, 0);
        
        if (engine.input.isKeyPressed(engine.input.keys.Left))
            this.mCursor.moveCursor(-delta, 0);

        if (engine.input.isKeyPressed(engine.input.keys.Up)) 
            this.mCursor.moveCursor(0, delta);

        if (engine.input.isKeyPressed(engine.input.keys.Down)) 
            this.mCursor.moveCursor(0, -delta);
        
        this.mCursor.setCursorSize(this.mObjectSize);
        this.mCursor.setCursorRange(this.mLoadSpread);
    }

    _printLoopStat() {
        let currentTime = performance.now();
        if ((currentTime - this.mPreStatUpdateTime) < this.kUIUpdatePeriod)
            return;
        this.mPreStatUpdateTime = currentTime;

        let stat = "<b>Total:</b><br>" +
                    "&nbsp&nbsp <b>Total Cycles: </b>" + loop.totalCycles() + "<br>" +
                    "&nbsp&nbsp <b>Total Elapsed Time: </b>" + (loop.totalRunningTime()/1000).toFixed(2) + " seconds<br>" +
                "<b>Frame Time (Previous) :</b> " + loop.previousFrameTime().toFixed(2) + " milliseconds <br>" +
                "<b>Lag:</b> accumulated(" + loop.accumulatedLag().toFixed(2) + ") max(" +
                                loop.maxLagTime().toFixed(2) + ") milliseconds<br>" +
                "<b>Update per Draw:</b> previous(" + loop.previousUpdatePerDraw() + ") max(" + loop.maxUpdatePerDraw() + ")";

        document.getElementById("FrameStat").innerHTML = stat;
    }

    _printLoadStat() {
        let stat = "<b>Load</b>: PerLoad(" + this.mNumPerLoad + " O/P) Size(" + 
                    this.mObjectSize + " J/K) Spread(" + 
                    this.mLoadSpread + " N/M)<br>" +
            "&nbsp&nbsp Load count: " + engine.LoadUtil.numLoads() + "(object:" + engine.LoadUtil.numObjects() + ")";
        document.getElementById("LoadStat").innerHTML = stat;
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();

    // new begins the game 
    loop.start(myGame);
}
