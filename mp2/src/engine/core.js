"user strict";
import * as vertexBuffer from "./vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

let mGL = null;
function getGL() {return mGL;}
function initWebGL(htmlCanvasID){
  // find the html canvas with the assigned label
  let canvas = document.getElementById(htmlCanvasID);

  // Try to grab the standard context. If it fails, fallback to experimental.
  mGL = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // If we don't have a GL context, give up now
  if (!mGL) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
    return;
  }
}

function clearCanvas(array){
  mGL.clearColor(array[0],array[1],array[2],array[3]);
  mGL.clear(mGL.COLOR_BUFFER_BIT);
}

let mShader = null;
function createShader() {
  mShader = new SimpleShader(
    "VertexShader", // these are the ID's of the shaders in index.html
    "FragmentShader"
  );
}

function drawSquare() {
  // activate shader
  mShader.activate();

  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function init(htmlCanvasID) {
  // start mGL instance
  initWebGL(htmlCanvasID);

  // configure mGL vertex buffer
  vertexBuffer.init();

  // create shader
  createShader();
}

export {getGL, init, clearCanvas, drawSquare};
