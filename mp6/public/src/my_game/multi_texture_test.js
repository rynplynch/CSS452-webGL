"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MultiTextureTest {
    constructor(atx, aty, w, h, mainTex, tex1 = null) {
        this.kDelta = 0.005;
        this.mRenderComponent = new engine.MultiTextureRenderable(mainTex, tex1);

        this.mXf = [];  // to support UI
        this.mXf.push(this.mRenderComponent.getXform());  // index-0
        this.mXf.push(this.mRenderComponent.getEffectPlacement()); // index 1
        this.mIndex = 0;

        // object position and size
        this.mXf[0].setPosition(atx, aty);
        this.mXf[0].setSize(w, h);

        // setting the effect texture placement
        this.mXf[1].setPosition(0.0, 0.0); // offset by 0.1, 0.2
        this.mXf[1].setSize(1, 1); // twice the size will result in "zooming out" effect

        this.mRenderComponent.setEffectBlendFactor(0.4);  // blend factors
        this.mRenderComponent.setEffectMode(engine.eTexEffectFlag.eBlend);
        this.mMode = "Blend";
    }

    update() {        
        if (engine.input.isKeyPressed(engine.input.keys.Up)) {
            if (engine.input.isKeyPressed(engine.input.keys.Shift))
                this.mXf[this.mIndex].incHeightBy(this.kDelta);  // changing height
            else this.mXf[this.mIndex].incYPosBy(this.kDelta);           // changing y position
        }
        if (engine.input.isKeyPressed(engine.input.keys.Down)) {
            if (engine.input.isKeyPressed(engine.input.keys.Shift))
            this.mXf[this.mIndex].incHeightBy(-this.kDelta);  // changing height
            else this.mXf[this.mIndex].incYPosBy(-this.kDelta);           // changing y position
        }
        if (engine.input.isKeyPressed(engine.input.keys.Right)) {
            if (engine.input.isKeyPressed(engine.input.keys.Shift))
                this.mXf[this.mIndex].incWidthBy(this.kDelta);
            else if (engine.input.isKeyPressed(engine.input.keys.Ctrl))
                this.mXf[this.mIndex].incRotationByRad(-this.kDelta);
            else this.mXf[this.mIndex].incXPosBy(this.kDelta);
        }
        if (engine.input.isKeyPressed(engine.input.keys.Left)) {
            if (engine.input.isKeyPressed(engine.input.keys.Shift))
                this.mXf[this.mIndex].incWidthBy(-this.kDelta);
            else if (engine.input.isKeyPressed(engine.input.keys.Ctrl))
                this.mXf[this.mIndex].incRotationByRad(this.kDelta);
            else this.mXf[this.mIndex].incXPosBy(-this.kDelta);
        }
        
        
        if (engine.input.isKeyClicked(engine.input.keys.Three)) {
            this.mRenderComponent.setEffectMode(engine.eTexEffectFlag.eNone);
            this.mMode = "None";
        }
        if (engine.input.isKeyClicked(engine.input.keys.Four)) {
            this.mRenderComponent.setEffectMode(engine.eTexEffectFlag.eTransparent);
            this.mMode = "Transparent";
        }
        if (engine.input.isKeyClicked(engine.input.keys.Five)) {
            this.mRenderComponent.setEffectMode(engine.eTexEffectFlag.eOverride);
            this.mMode = "Override";
        }
        if (engine.input.isKeyClicked(engine.input.keys.Six)) {
            this.mRenderComponent.setEffectMode(engine.eTexEffectFlag.eBlend);
            this.mMode = "Blend";
        }
        
        // blend factor
        if (engine.input.isKeyPressed(engine.input.keys.N))
            this.mRenderComponent.setEffectBlendFactor(this.mRenderComponent.getEffectBlendFactor()-this.kDelta);
        if (engine.input.isKeyPressed(engine.input.keys.M)) 
            this.mRenderComponent.setEffectBlendFactor(this.mRenderComponent.getEffectBlendFactor()+this.kDelta);
                    
        if (engine.input.isKeyClicked(engine.input.keys.Zero))
            this.mIndex = 0;
        if (engine.input.isKeyClicked(engine.input.keys.One))
            this.mIndex = 1;
        
        return "Index=" + this.mIndex + " P(" 
            + this.mXf[this.mIndex].getXPos().toPrecision(2).toString() + "," 
            + this.mXf[this.mIndex].getYPos().toPrecision(2).toString() + ") WxH(" 
            + this.mXf[this.mIndex].getWidth().toPrecision(2).toString() + "," 
            + this.mXf[this.mIndex].getHeight().toPrecision(2).toString() + ") R=" 
            + this.mXf[this.mIndex].getRotationInDegree().toPrecision(2).toString() + " Mode:" 
            + this.mMode + " " + "Factor: "
            + this.mRenderComponent.getEffectBlendFactor().toPrecision(2);
    }
    
    draw(aCamera) {
        this.mRenderComponent.draw(aCamera);
    }
}

export default MultiTextureTest;
