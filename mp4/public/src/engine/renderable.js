"use strict";

import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";
import Transform from "./transform.js";

class Renderable {
  constructor(hasShadow) {
    this.hasShadow = hasShadow;
    this.mShadowShader = shaderResources.getConstShadowShader();
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = [1, 1, 1, 1];
    this.mShadowColor = [0.0, 0.0, 0.0, 1];
    this.mShadowOffset = [.05, .05];
    this.mXform = new Transform();
  }
  // function used to render object
  draw(camera) {
    let gl = glSys.get();


    if(this.hasShadow){
      // activate our shadow shader
      this.mShadowShader.activate(this.mShadowColor,
                                  this.mXform.getTRSMatrix(),
                                  camera.getCameraMatrix);

      // set shadow offset
      this.mShadowShader.setShadowOffset(this.mShadowOffset);

      // draw the shadow
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    }

    // activate our shader
    this.mShader.activate(this.mColor,
                          this.mXform.getTRSMatrix(),
                          camera.getCamera);
    // tell webGL to draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  setColor(color) { this.mColor = color; }
  setShadowColor(color) { this.mShadowColor = color; }
  setShadowOffset(shadowOffset) { this.mShadowOffset = shadowOffset };
  getColor() { return this.mColor; }
  getXform() { return this.mXform; }
}


export default Renderable;
