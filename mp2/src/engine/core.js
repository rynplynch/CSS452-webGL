/*
 * File: core.js
 */
"use strict";

// import all symbols that are exported from vertex_buffer.js, as symbols under the module "vertexBuffer"
//
import * as vertexBuffer from "./vertex_buffer.js";
import * as tribuffer from "./vertex_tri.js";
import * as circBuffer from "./vertex_circ.js";
import SimpleShader from "./simple_shader.js";

// variables
//
// The graphical context to draw to
let mGL = null;
function getGL() { return mGL; }

// The shader
let mShader = null;
function createShader() {
    mShader = new SimpleShader(
        "src/glsl_shaders/simple_vs.glsl",        // Path to the VertexShader
        "src/glsl_shaders/simple_fs.glsl");       // Path to the FragmentShader
}

// initialize the WebGL
function initWebGL(htmlCanvasID) {
    let canvas = document.getElementById(htmlCanvasID);

    // Get the standard or experimental webgl and binds to the Canvas area
    // store the results to the instance variable mGL
    mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

    if (mGL === null) {
        document.write("<br><b>WebGL 2 is not supported!</b>");
        return;
    }
}

// initialize the WebGL, and the vertex buffer
function init(htmlCanvasID) {
    initWebGL(htmlCanvasID);    // setup mGL
    vertexBuffer.init();        // setup mGLVertexBuffer
  tribuffer.init();
  circBuffer.init();

    createShader();             // create the shader
}

// Clears the draw area and draws one square
function clearCanvas(color) {
    mGL.clearColor(color[0], color[1], color[2], color[3]);  // set the color to be cleared
    mGL.clear(mGL.COLOR_BUFFER_BIT);      // clear to the color previously set
}

// function to draw a square
// two steps to draw: activate the shader, and issue the gl draw command
// engine.drawSquare(color,    size[i],   [xPos[i], recY]);
function drawRectangle(color, size, pos) {
  mShader.activate(vertexBuffer.get(), color, size, pos);
    // Step A: Activate the shader
  //

    // Step B: Draw with the currently activated geometry and the activated shader
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function drawTriangle(color, size, pos) {
    // Step A: Activate the shader
  mShader.activate(tribuffer.get(), color, size, pos);

    // Step B: Draw with the currently activated geometry and the activated shader
    mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 3);
}
function drawCircle(color, size, pos) {
    // Step A: Activate the shader
  mShader.activate(circBuffer.get(), color, size, pos);

    // Step B: Draw with the currently activated geometry and the activated shader
  // TRIANGLE_FAN uses a different method to draw between vertex
  // the first vertex is the center.
    mGL.drawArrays(mGL.TRIANGLE_FAN, 0, 21);
}
// export these symbols
export { getGL, init, clearCanvas, drawRectangle, drawTriangle, drawCircle}
