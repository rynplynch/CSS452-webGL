"user strict";

let mCanvas = null;
let mGL = null;

function get() {return mGL;}

// create a new instance of the webGL interface
function init(htmlCanvasID){
  // find the html canvas with the assigned label
  let canvas = document.getElementById(htmlCanvasID);

  // check to see if html tag existed
  if (canvas == null)
    throw new Error("Engine init [" + htmlCanvasID + "] HTML element id not found");

  // Try to grab the standard context. If it fails, fallback to experimental.
  mGL = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // If we don't have a GL context, give up now
  if (!mGL) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
    document.write("<br><b>WebGL 2 is not supported!</b");
    return;
  }
}

export {init, get}
