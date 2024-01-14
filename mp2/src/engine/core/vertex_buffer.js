"use strict";
import * as core from "./core.js";

// the location in memory where the WebGL buffer resides
let mGLVertexBuffer = null;

// return the pointer to the WebGL buffer
function get() { return mGLVertexBuffer; }

// each row describes the vertex of a square
// a each vertex has an x,y and z variable
// there are 4 rows because a square has 4 corners
let mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0
];

function init() {
  let mGL = core.getGL();

  // use the function createBuffer that is provided by webGL
  // this makes mGLVertexBuffer point to a webGL buffer
  mGLVertexBuffer = mGL.createBuffer();

  // activate newly created buffer
  mGL.bindBuffer(mGL.ARRAY_BUFFER, mGLVertexBuffer);

  // take the vertices of a square, as defined above
  // load the matrix into the buffer
  mGL.bufferData(mGL.ARRAY_BUFFER,
                new Float32Array(mVerticesOfSquare),
                 mGL.STATIC_DRAW
                );
}

export {init, get};
