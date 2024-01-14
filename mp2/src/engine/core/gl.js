"user strict";

let mCanvas = null;
let mGL = null;

function getGL() {return mGL;}

// create a new instance of the webGL interface
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
