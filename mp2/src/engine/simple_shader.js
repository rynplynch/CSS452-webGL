"using strict";
import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
  constructor(vertexShaderID, fragmentShaderID) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;

    let mGL = core.getGL();

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
    }

  activate() {
    let mGL = core.getGL();

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
    }
}

function loadAndCompileShader(id, shaderType) {
  let xmlReq, shaderSource = null, compiledShader = null;
  let gl = core.getGL();

  // Step A: Get the shader source from index.html
  let shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

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
