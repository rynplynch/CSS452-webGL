"using strict";
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";

class SimpleShader {
  constructor(vertexShaderID, fragmentShaderID) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;
    this.mPixelColorRef = null;
    this.mModelMatrixRef = null;

    let mGL = glSys.get();

    // use or load an compile function to generate our shaders
    this.mVertexShader = loadAndCompileShader(vertexShaderID, mGL.VERTEX_SHADER);
    this.mFragmentShader = loadAndCompileShader(fragmentShaderID, mGL.FRAGMENT_SHADER);

    // create program
    this.mCompiledShader = mGL.createProgram();

    // attach shaders to program
    mGL.attachShader(this.mCompiledShader, this.mVertexShader);
    mGL.attachShader(this.mCompiledShader, this.mFragmentShader);

    // link program
    mGL.linkProgram(this.mCompiledShader);

    // check for errors
    if (!mGL.getProgramParameter(this.mCompiledShader, mGL.LINK_STATUS)) {
        throw new Error("Error linking shader to program");
        return null;
    }

    // set reference for the position of the vertex
    this.mVertexPositionRef = mGL.getAttribLocation(
      this.mCompiledShader,
      "aVertexPosition");

    // get the pointer for Uniform type
    // set equal to our own pointer so we can reference it
    // Color reference
    this.mPixelColorRef = mGL.getUniformLocation(
      this.mCompiledShader,
      "uPixelColor"
    );
    // Transform matrix reference
    this.mModelMatrixRef = mGL.getUniformLocation(
      this.mCompiledShader,
      "uModelXformMatrix"
    );
  }

  activate(pixelColor, trsMatrix) {
    let mGL = glSys.get();

    // specifiy the shader to use
    mGL.useProgram(this.mCompiledShader);

    // bind the vertex buffer to the Array Buffer attribute
    mGL.bindBuffer(mGL.ARRAY_BUFFER, vertexBuffer.get());
    mGL.vertexAttribPointer(this.mVertexPositionRef,
                            3, // each element has x,y,z
                            mGL.FLOAT, // specify data type
                            false, // does not contain normalized vectors
                            0, // bytes to skip between elements
                            0 // offset of first element
                            );

    mGL.enableVertexAttribArray(this.mVertexPositionRef);

    // reference the uniform data type
    // alter that reference with the passed in parameter
    // setting pixel color
    mGL.uniform4fv(this.mPixelColorRef, pixelColor);
    // setting transform matrix
    mGL.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
  }
}

function loadAndCompileShader(filePath, shaderType) {
  let xmlReq = new XMLHttpRequest();
  let shaderSource = null
  let compiledShader = null;
  let gl = glSys.get();

  // Step A: Get the shader source from the file path
  // NOTE: this will be change to be asynchronous in Chapter 4
  xmlReq.open('GET', filePath, false);
  try {
    xmlReq.send();
  } catch (error) {
    throw new Error("Failed to load shader: "
                   + filePath
                    + "[Hint: you cannot double click index.html to run this project"
                    + "you must run using live-server or any web-server.]");
    return null;
  }
  shaderSource = xmlReq.responseText;

  // if xmlReq returns null then an error occurred
  if(shaderSource === null) {
    throw new Error("WARNING: Loading of:" + filePath + " Failed!");
    return null;
  }
  // Step B: Create the shader based on the shader type: vertex or fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: check for errors and return results (null if error)
  // The log info is how shader compilation errors are typically displayed.
  // This is useful for debugging the shaders.
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
  }

  return compiledShader;
}

export default SimpleShader;
