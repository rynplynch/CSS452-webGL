"use strict"
import * as input from "../input.js";

// how many updates in a sec?
const kUPS = 60;

// milliseconds per update
// Milliseconds between each frame?
const kMPF = 1000 / kUPS;

// measure lag
let mPrevTime;
let mLagTime;
let loopLag = 0;
let maxLag = 0;

// stats to show the user
let numCycles = 0;
let startTime = 0;
// time taken to complete loop
let elaspedTime;
// amount of updates called in a loop
let updateCalls = 0;
let maxUpdate = 0;

// loop state
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

// recursive function
// represents our game loop
function loopOnce() {
    if(mLoopRunning) {
        // clear accumulated lag
        loopLag = 0;
        // clear our update calls
        updateCalls = 0;
        // start of a cycle increment numCycles
        numCycles++;
        // set up for next call
        // calls this function every 60 times a second?
        mFrameID = requestAnimationFrame(loopOnce);

        mCurrentScene.draw();

        // compute lag from last call of loopOnce()
        let currentTime = performance.now();
        // delta of current time now vs current time from last call
        elaspedTime = currentTime - mPrevTime;
        // save current time for next call of this loop
        mPrevTime = currentTime;
        // the lag is the time between loop calls
        mLagTime += elaspedTime;

        // if our lag time is greater than 1000 Milliseconds
        // our game is running behind. If that is true loop till caught up
        while((mLagTime >= kMPF) && mLoopRunning) {
            loopLag += mLagTime - kMPF;
            updateCalls++;
            if(loopLag>maxLag) maxLag=loopLag;
            if(updateCalls>maxUpdate) maxUpdate=updateCalls;
            input.update();
            mCurrentScene.update();
            mLagTime -= kMPF;
        }
    }
}

// start the game loop
function start(scene) {
    if (mLoopRunning) {
        throw new Error("loop already running")
    }

    // what is a scene?
    mCurrentScene = scene;
    mCurrentScene.init();

    startTime = Date.now();

    // set previous time for first loop
    mPrevTime = performance.now();
    // first loop has 0 lag time
    mLagTime = 0.0;
    // we are starting the loop
    mLoopRunning = true;
    // first call of loopOnce
    // part of HTML5
    mFrameID = requestAnimationFrame(loopOnce);
}

// stop our game from looping
function stop() {
    mLoopRunning = false;
    // stop the calling of animation frames
    // part of HTML5
    cancelAnimationFrame(mFrameID);
}

/**
 * Total number of loop cycles ran since the beginning of the game
 * @export Loop
 * @returns {int} num - total number of loop cycles
 */
function totalCycles() { return numCycles; }

/**
 * Total milliseconds elapsed since the beginning of the game
 * @export Loop
 * @returns {int} num - total number of milliseconds
 */
function totalRunningTime() { return Date.now() - startTime; }

/**
 * Amount of time in milliseconds that the previous frame took
 * @export Loop
 * @returns {int} num -  number of milliseconds
 */
function previousFrameTime() { return elaspedTime; }

/**
 * Number of update()'s being called in the previous frame
 * @export Loop
 * @returns {int} num -  number of times Update() was called
 */
function previousUpdatePerDraw() { return updateCalls; }

/**
 * Since the game began, what was the maximum number of Update() that
 * was called during one loop iteration
 * @export Loop
 * @returns {int} num -  max number of times Update() was called
 */
function maxUpdatePerDraw() { return maxUpdate; }

/**
 * Current accumulated lag time (in milliseconds)
 * @export Loop
 * @returns {int} num -  current accumulated lag time
 */
function accumulatedLag() { return loopLag; }

/**
 * Since the game began, what was the maximum accumulated lag time
 * @export Loop
 * @returns {int} num -  max accumulated lag time (in milliseconds)
 */
function maxLagTime() { return maxLag; }

export {
    start,
    totalCycles,
    totalRunningTime,
    previousFrameTime,
    accumulatedLag,
    maxLagTime,
    previousUpdatePerDraw,
    maxUpdatePerDraw,
    stop
}
