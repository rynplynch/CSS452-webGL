"use strict";

import SimpleShader from "../simple_shader.js";

// vertex shader
let kSimpleVS = "src/glsl_shaders/simple_vs.glsl";
// fragment shader
let kSimpleFS = "src/glsl_shaders/simple_fs.glsl";

let mConstColorShader = null;

function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

function init() {
  createShaders();
}

function getConstColorShader() { return mConstColorShader; }

export {createShaders, getConstColorShader, init}
