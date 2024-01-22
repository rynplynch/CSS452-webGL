// this is the vertex shader
// Expects one vertex position
// naming convention, attributes always begin with "a"

// vector that describes the position of each vertex
// (x, y ,z)
attribute vec3 aVertexPosition;

// 4x4 matrix that allows for transform out of Model Space
// this makes our model vertex into Normalized Device Coordinates
uniform mat4 uModelXformMatrix;

// 4x4 matrix used in the camera transform
uniform mat4 uCameraXformMatrix;

void main(void) {
    // gl_Position:
    // the clip-space output position of the current vertex.
    gl_Position = uCameraXformMatrix *
        uModelXformMatrix *
        vec4(aVertexPosition, 1.0);
}
