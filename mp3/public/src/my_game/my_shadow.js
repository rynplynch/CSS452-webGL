/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

const kObjSize = 0.2;
const kOffsetSize = 0.3;
const kOffsetBase = 0.05;
const kShadowColor = 0.3;
const kRotateDelta = -80;

class MyShadowTest {
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        engine.init(htmlCanvasID);
        engine.clearCanvas([0.9, 0.8, 0.8, 1.0]);

        this._oneTestRow(0.75, true);
        this._oneTestRow(0.25, false);
        this._oneTestRow(-0.25, true);
        this._oneTestRow(-0.75, false);
        
    }

    _oneTestRow(y, hasShadow) {
        let x = -0.75;
        for (let i=0; i<4; i++) {
            this._oneRenderable(hasShadow, [x, y], i*kRotateDelta, [this._randomSize(), this._randomSize()]);
            hasShadow = !hasShadow;
            x += 0.5;
        }
    }

    _oneRenderable(hasShadow, at, rInDegree, size) {
        let r = new engine.Renderable(hasShadow);
        r.setColor(this._randomVec4(1.0));
        r.setShadowOffset([this._randomOffset(), this._randomOffset()]);
        r.setShadowColor(this._randomShadow());
        r.getXform().setPosition(at[0], at[1]);
        r.getXform().setRotationInDegree(rInDegree); // In Radians
        r.getXform().setSize(size[0], size[1]);
        r.draw();
    }

    _randomVec4() {
        return [Math.random(), Math.random(), Math.random(), 1.0];
    }

    _randomShadow() {
        let c = kShadowColor * Math.random();
        return [c, c, c, 1.0];
    }

    _randomSize() {
        return kObjSize + kObjSize * Math.random(); // between kObjSize to 2xkObjSize
    }

    _randomOffset() {
        return kOffsetBase + kOffsetSize * Math.random(); // between 0.05 and 0.3
    }
}

export default MyShadowTest;