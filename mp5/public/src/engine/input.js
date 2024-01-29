"use strict";

// Key code constants
const keys = {
    // arrows
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    // space bar
    Space: 32,

    // numbers
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    Four: 52,
    Five : 53,
    Six : 54,
    Seven : 55,
    Eight : 56,
    Nine : 57,

    // Alphabets
    A : 65,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    M : 77,
    N : 78,
    O : 79,
    P : 80,
    Q : 81,
    R : 82,
    S : 83,
    W : 87,

    LastKeyCode: 222
}

// each of these arrays hold boolean values
// previous state of key
let mKeyPreviousState = [];
// keys that are pressed
let mIsKeyPressed = [];
// click events
// when an event is set, it remains till pulled?
let mIsKeyClicked = [];

// event handler
// track if a key is pressed down
function onKeyDown(event) {
    mIsKeyPressed[event.keyCode] = true;
}

// track if a key is released
function onKeyUp(event) {
    mIsKeyPressed[event.keyCode] = false;
}

function init() {
    let i;
    // keys is a property provided by js
    for (i = 0; i < keys.LastKeyCode; i++) {
        mIsKeyPressed[i] = false;
        mKeyPreviousState[i] = false;
        mIsKeyClicked[i] = false
    }
    // register our event handler functions with the browser
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
}

function update() {
    let i;
    for (i =0; i < keys.LastKeyCode; i++) {
        mIsKeyClicked[i] = (!mKeyPreviousState[i]) && mIsKeyPressed[i];
        mKeyPreviousState[i] = mIsKeyPressed[i];
    }
}

// public function exported from api
function isKeyPressed(keyCode) {
    return mIsKeyPressed[keyCode];
}

function isKeyClicked(keyCode) {
    return mIsKeyClicked[keyCode];
}

export {
    keys,
    init,
    update,
    isKeyClicked,
    isKeyPressed
}
