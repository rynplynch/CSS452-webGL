precision mediump float;

// hold color of the pixel
uniform vec4 uPixelColor;

void main(void) {
    // for every pixel called set to the user defined color
    gl_FragColor = uPixelColor;
}
