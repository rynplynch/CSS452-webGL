// this is the vertex shader
// Expects one vertex position
// naming convention, attributes always begin with "a"
attribute vec3 aVertexPosition;

void main(void) {
    // Convert the vec3 into vec4 for scan conversion and
    // assign to gl_Position to pass vertex to the fragment shader
    gl_Position = vec4(aVertexPosition, 1.0);
}
