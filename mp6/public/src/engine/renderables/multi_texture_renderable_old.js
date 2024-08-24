/*
 * File: texture_renderable.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 *
 */
"use strict";

import SpriteRenderable from "./sprite_renderable.js";
import * as glSys from "../core/gl.js";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";
import Transform from "../transform.js";

const eTexEffectFlag = Object.freeze({
    eBlend: 0,
    eNone: 1,
    eTransparent: 2,
    eOverride: 3,
});

const eEffectTexCoordArrayIndex = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

// extend SpriteRenderable, background texture uses sprite variables
class MultiTextureRenderable extends SpriteRenderable {
  constructor(textureOne, textureTwo) {
    // calls to the texture class
    super(textureOne);
    // gets our special shader that can handle two textures
    super._setShader(shaderResources.getMultiTexShader());
    // background coordinate
    this.mEffectLeft = 0.0;   // bounds of texture coordinate (0 is left, 1 is right)
    this.mEffectRight = 1.0;  //
    this.mEffectTop = 1.0;    //   1 is top and 0 is bottom of image
    this.mEffectBottom = 0.0; //
    super.setColor([1, 1, 1, 0]); // Alpha of 0: switch off tinting of texture

    // default to override draw mode
    this.mDrawMode = 0;

    // texture that we manipulate
    this.mEffectTex = textureTwo;

    // color of the effect texture
    this.mEffectColor = [1, 1, 1, 0];

    // transform for the effect texture
    this.mEffectXForm = new Transform();
  }

    draw(camera) {
      let gl = glSys.get();
      // we must set the coordinates for our effect texture and background texture
      this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
      this.mShader.setEffectTextureCoordinate(this.getEffectUVCoordinateArray());

      texture.activate(this.mEffectTex);
      // texture.activate(this.mTexture);
      this.mShader.activate(this.mColor, this.mXform.getTRSMatrix(), this.mEffectColor, this.mEffectXForm.getTRSMatrix(), camera.getCameraMatrix());  // always activate the shader first!
      // this.mShader.activate(
      //   // everything related to the background texture
      //   this.mColor, this.mXform.getTRSMatrix(),
      //   // everything related to the effect texture
      //   this.mEffectColor, this.mEffectXForm.getTRSMatrix(),
      //   // the camera matrix
      //   camera.getCameraMatrix());  // always activate the shader first!
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    }

  getEffectUVCoordinateArray() {
    return [
      this.mEffectRight,  this.mEffectTop,          // x,y of top-right
      this.mEffectLeft,   this.mEffectTop,
      this.mEffectRight,  this.mEffectBottom,
      this.mEffectLeft,   this.mEffectBottom
    ];
  }
  getEffectPlacement() {
    return this.mEffectXForm;
  }

  getEffectMode() { return this.mBlendFlag; }
  getEffectBlendFactor() { return this.mEffectColor[2]; }

  //setters
  // for main texture
  setTexture(newTexture) {
    this.mTexture = newTexture;
  }
  // for effect texture
  setEffectTex(newTexture) {
    this.mEffectTex = newTexture;
  }
  // set alpha of effect texture
  setEffectBlendFactor(alpha) {
    this.mEffectColor = [
      this.mEffectColor[0],
      this.mEffectColor[1],
      this.mEffectColor[2],
      alpha]
  }
  // specify element region by texture coordinate (between 0 to 1)
  setEffectTextureCoordinate(left, right, bottom, top) {
    this.mEffectLeft = left;
    this.mEffectRight = right;
    this.mEffectBottom = bottom;
    this.mEffectTop = top;
  }
  // set the effect draw flag
  setEffectMode(int){
    this.mDrawMode = int;
  }
}

export {eTexEffectFlag}
export default MultiTextureRenderable;
