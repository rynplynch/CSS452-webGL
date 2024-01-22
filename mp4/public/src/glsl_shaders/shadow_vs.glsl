//
// This is the vertex shader 
attribute vec3 aVertexPosition;  // Vertex shader expects one vertex position

// to transform the vertex position
uniform mat4 uModelXformMatrix;

uniform float uOffsetX;
uniform float uOffsetY;

void main(void) {
    vec3 p = aVertexPosition + vec3(uOffsetX, uOffsetY, 0);
    gl_Position = uModelXformMatrix * vec4(p, 1.0); 
}
