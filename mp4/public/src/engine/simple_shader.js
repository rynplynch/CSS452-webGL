"using strict";
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";

class SimpleShader {

    // constructor of SimpleShader object
    constructor(vertexShaderPath, fragmentShaderPath) {
        // instance variables
        // Convention: all instance variables: mVariables
        this.mCompiledShader = null;  // reference to the compiled shader in webgl context
        this.mVertexPositionRef = null; // reference to VertexPosition within the shader
        this.mPixelColorRef = null;     // reference to the pixelColor uniform in the fragment shader
        this.mModelMatrixRef = null; // reference to model transform matrix in vertex shader

        let gl = glSys.get();
        //
        // Step A: load and compile vertex and fragment shaders
        this.mVertexShader = loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

        // Step B: Create and link the shaders into a program.
        this.mCompiledShader = gl.createProgram();
        gl.attachShader(this.mCompiledShader, this.mVertexShader);
        gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        gl.linkProgram(this.mCompiledShader);

        // Step C: check for error
        if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
            throw new Error("Shader linking failed with [" + vertexShaderPath + " " + fragmentShaderPath +"].");
            return null;
        }

        // Step D: Gets a reference to the aVertexPosition attribute within the shaders.
        this.mVertexPositionRef = gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");

        // Step E: Gets a reference to the uniform variables in the fragment shader
        this.mPixelColorRef = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
        this.mModelMatrixRef = gl.getUniformLocation(this.mCompiledShader, "uModelXformMatrix");

    }

    // Activate the shader for rendering
    activate(pixelColor, trsMatrix) {
        let gl = glSys.get();
        gl.useProgram(this.mCompiledShader);

        // bind vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef,
            3,              // each element is a 3-float (x,y.z)
            gl.FLOAT,       // data type is FLOAT
            false,          // if the content is normalized vectors
            0,              // number of bytes to skip in between elements
            0);             // offsets to the first element
        gl.enableVertexAttribArray(this.mVertexPositionRef);

        // load uniforms
        gl.uniform4fv(this.mPixelColorRef, pixelColor);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
    }
}

class ShadowShader extends SimpleShader {
    constructor(vPath, fPath) {
        super(vPath, fPath);

        let gl = glSys.get();
        // to support shadow
        this.mOffsetXRef = gl.getUniformLocation(this.mCompiledShader, "uOffsetX");
        this.mOffsetYRef = gl.getUniformLocation(this.mCompiledShader, "uOffsetY");
    }

    // to be called _after_ activate()
    setShadowOffset(offset) {
        let gl = glSys.get();
        // shadow
        gl.uniform1f(this.mOffsetXRef, offset[0]);
        gl.uniform1f(this.mOffsetYRef, offset[1]);
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

export {SimpleShader, ShadowShader};
