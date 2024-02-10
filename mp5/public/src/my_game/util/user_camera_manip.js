"use strict";

import engine from "../../engine/index.js";

let kViewportDelta = 10;
let kWCDelta = 1;

// WASD: to move the WCCenter of the camera
// XZ: to increase/decrease WC Width
export function cameraManip(camera) {
    if (engine.input.isKeyPressed(engine.input.keys.W))
        camera.moveWCCenter(0, kWCDelta);
    if (engine.input.isKeyPressed(engine.input.keys.S))
        camera.moveWCCenter(0, -kWCDelta);
    if (engine.input.isKeyPressed(engine.input.keys.D))
        camera.moveWCCenter(kWCDelta, 0);
    if (engine.input.isKeyPressed(engine.input.keys.A))
        camera.moveWCCenter(-kWCDelta, 0);
    
    // user WC Zoom control
    if (engine.input.isKeyPressed(engine.input.keys.Z))
        camera.incWCWidth(-kWCDelta);
    if (engine.input.isKeyPressed(engine.input.keys.X))
        camera.incWCWidth(kWCDelta);
}

// JLIK: to move the viewport of the camera
// ArrowKeys: to increase/decrease Viewport Width/Height
export function cameraViewportManip(camera) {
    // User viewport control
    if (engine.input.isKeyReleased(engine.input.keys.J)) 
        camera.moveViewport(-kViewportDelta, 0);
    if (engine.input.isKeyClicked(engine.input.keys.L))
        camera.moveViewport(kViewportDelta, 0);
    if (engine.input.isKeyPressed(engine.input.keys.I))
        camera.moveViewport(0, kViewportDelta);
    if (engine.input.isKeyPressed(engine.input.keys.K))
        camera.moveViewport(0, -kViewportDelta);

    if (engine.input.isKeyPressed(engine.input.keys.Left))
        camera.incViewportWidth(-kViewportDelta);
    if (engine.input.isKeyPressed(engine.input.keys.Right))
        camera.incViewportWidth(kViewportDelta);
    if (engine.input.isKeyPressed(engine.input.keys.Down))
        camera.incViewportHeight(-kViewportDelta);
    if (engine.input.isKeyPressed(engine.input.keys.Up))
        camera.incViewportHeight(kViewportDelta);
}
