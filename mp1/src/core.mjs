let gl = null;

function initWebGL(htmlCanvasID){
  // find the html canvas with the assigned label
  let canvas = document.getElementById(htmlCanvasID);

  // Try to grab the standard context. If it fails, fallback to experimental.
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  // If we don't have a GL context, give up now
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
    return;
  }
  gl.clearColor(0,.8,0,1);
}

function clearCanvas(array){
  gl.clearColor(array[0],array[1],array[2],array[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export {initWebGL, clearCanvas};
