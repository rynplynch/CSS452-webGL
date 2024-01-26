"use strict"

// how many updates in a sec?
const kUPS = 60;

// milliseconds per update
// Milliseconds between each frame?
const kMPF = 1000 / kUPS;

// measure lag
let mPrevTime;
let mLagTime;

// loop state
let mLoopRunning = false;
let mCurrentScene = null;
let mFrameID = -1;

// recursive function
// represents our game loop
function loopOnce() {
  if(mLoopRunning) {
    // set up for next call
    // calls this function every 60 times a second?
    mFrameID = requestAnimationFrame(loopOnce);

    mCurrentScene.draw();

    // compute lag from last call of loopOnce()
    let currentTime = performance.now();
    // delta of current time now vs current time from last call
    let elaspedTime = currentTime - mPrevTime;
    // save current time for next call of this loop
    mPrevTime = currentTime;
    // the lag is the time between loop calls
    mLagTime += elaspedTime;

    // if our lag time is greater than 1000 Milliseconds
    // our game is running behind. If that is true loop till caught up
    while((mLagTime >= kMPF) && mLoopRunning) {
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

export {start, stop}
