"use strict";

import {SimpleShader as SimpleShader,
        ShadowShader as ShadowShader
       } from "../simple_shader.js";

// vertex shader
let kSimpleVS = "src/glsl_shaders/simple_vs.glsl";
// fragment shader
let kSimpleFS = "src/glsl_shaders/simple_fs.glsl";
// shadow shader
let kShadowVS = "src/glsl_shaders/shadow_vs.glsl";

let mConstColorShader = null;
let mConstShadowShader = null;

function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
  mConstShadowShader = new ShadowShader(kShadowVS, kSimpleFS);
}

function init() {
  createShaders();
}

function getConstColorShader() { return mConstColorShader; }
function getConstShadowShader() { return mConstShadowShader; }

export {createShaders, getConstShadowShader, getConstColorShader, init}
