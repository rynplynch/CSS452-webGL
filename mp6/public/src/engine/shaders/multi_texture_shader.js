/*
 * File: sprite_shader.js
 *
 * wrapps over GLSL texture shader, supporting the defintion of one sprite element
 * from a texture file
 *
 */
"use strict";

import * as glSys from "../core/gl.js";
import * as vertexBuffer from "../core/vertex_buffer.js";
import SimpleShader from "./simple_shader.js";

class MultiTextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        // Call super class constructor
        super(vertexShaderPath, fragmentShaderPath);  // call SimpleShader constructor

        // reference to aTextureCoordinate within the shader
        this.mTextureCoordinateRef = null;
        this.mSamplerRef = null;
        this.mEffectTexCoordinateRef = null;
        this.mEffectTexCoordBuffer = null;
        this.mEffectSamplerRef = null;

        // get the reference of aTextureCoordinate within the shader
        let gl = glSys.get();
        this.mTextureCoordinateRef = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");
        this.mEffectTexCoordinateRef = gl.getAttribLocation(this.mCompiledShader, "aTextureCoordinate");


        this.mSamplerRef =  gl.getUniformLocation(this.mCompiledShader, "uSampler");
        this.mEffectSamplerRef = gl.getUniformLocation(this.mCompiledShader, "uEffectSampler");

        let initTexCoord = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];
        this.mEffectTexCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mEffectTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord), gl.DYNAMIC_DRAW);

    }


    activate(pixelColor, trsMatrix, cameraMatrix) {
        super.activate(pixelColor, trsMatrix, cameraMatrix);

        let gl = glSys.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTexCoordBuffer());
        gl.vertexAttribPointer(this.mTextureCoordinateRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mTextureCoordinateRef);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.mEffectTexCoordBuffer);
        gl.vertexAttribPointer(this.mEffectTexCoordinateRef, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mEffectTexCoordinateRef);

        gl.uniform1i(this.mSamplerRef, 0);
        gl.uniform1i(this.mEffectSamplerRef, 1);
        console.log(this.mEffectSamplerRef);

    }
    _getTexCoordBuffer() {
        // return this.mTexCoordBuffer;
        return vertexBuffer.getTexCoord();
    }
    _getEffectTexCoordBuffer() {
        return vertexBuffer.getEffectTexCoord();
    }
    setTextureCoordinate(texCoord) {
        let gl = glSys.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
    }
    setEffectTextureCoordinate(effectCord){
        let gl = glSys.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mEffectTexCoordBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(effectCord));
    };

    cleanUp() {
        let gl = glSys.get();
        gl.deleteBuffer(this.mTexCoordBuffer);
        // now call super class' clean up ...
        super.cleanUp();
    }
}

export default MultiTextureShader;
