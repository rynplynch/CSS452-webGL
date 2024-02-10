/*
 * File: texture_renderable.js
 *
 * Supports the drawing an entire file texture mapped onto an entire Renderable
 *
 */
"use strict";

import Renderable from "./renderable.js";
import * as texture from "../resources/texture.js";
import * as shaderResources from "../core/shader_resources.js";
import Transform from "../transform.js";

const eTexEffectFlag = Object.freeze({
    eBlend: true
});

class MultiTextureRenderable extends Renderable {
  constructor(textureOne, textureTwo) {
    // calls to the renderable class
    super();
    super.setColor([1, 1, 1, 0]); // Alpha of 0: switch off tinting of texture
    super._setShader(shaderResources.getMultiTexShader());

    // if true then draw the effect texture
    this.mBlendFlag = false;
    // grab another shader for the second texture
    // texture for the background
    this.mTexture = textureOne;
    // texture that we manipulate
    this.mEffectTex = textureTwo;
    // color of the effect texture
    this.mEffectColor = [1, 1, 1, 0];
    // transform for the effect texture
    this.mEffectXForm = new Transform();
  }

  draw(camera) {
    // activate the texture
    texture.activate(this.mTexture);

    super.draw(camera);
  }

  getEffectPlacement() { return this.mEffectXForm ; }
  getTexture() { return this.mTexture; }
  getEffectMode() { return this.mBlendFlag; }

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
  // set the effect draw flag
  setEffectMode(flag){
    this.mBlendFlag = flag;
  }
}

export {eTexEffectFlag}
export default MultiTextureRenderable;
