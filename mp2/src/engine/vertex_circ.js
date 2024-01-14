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
let mCircleVert= [
  0, 0, 0
];

function init() {
    let gl = core.getGL();

    // Step A: Create a buffer on the gl context for our vertex positions
    mGLVertexBuffer = gl.createBuffer();

  let mCircleNumVertex = 20;
  var delta = (2.0 * Math.PI)/ (mCircleNumVertex-1);
  for (let i = 1; i<=mCircleNumVertex; i++) {
    var angle = (i-1) * delta;
    let x = 0.5 * Math.cos(angle);
    let y = 0.5 * Math.sin(angle);
    //add the new vertex to the vertex array
    mCircleVert.push(x);
    mCircleVert.push(y);
    // z is always 0
    mCircleVert.push(0.0);
  }
    // Step B: Activate vertexBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);

    // Step C: Loads mVerticesOfSquare into the vertexBuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mCircleVert), gl.STATIC_DRAW);
}

 // export these symbols
export {init, get}
