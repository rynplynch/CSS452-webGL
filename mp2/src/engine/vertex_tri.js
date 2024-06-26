/*
 * File: vertex_buffer.js
 *
 * defines the module that supports the loading and using of the buffer that
 * contains vertex positions of a square onto the gl context
 *
 */
"use strict";

import * as core from "./core.js";

// reference to the vertex positions for the square in the gl context
let mGLVertexBuffer = null;
function get() { return mGLVertexBuffer; }

// First: define the vertices for a triangle
let mVerticesOfTriangle = [
  0, 0.5 , 0,
  -0.5, -0.5, 0,
  0.5, -0.5, 0
];


function init() {
    let gl = core.getGL();

    // Step A: Create a buffer on the gl context for our vertex positions
    mGLVertexBuffer = gl.createBuffer();

    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);

    // Step C: Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfTriangle), gl.STATIC_DRAW);
}

 // export these symbols
export {init, get}
