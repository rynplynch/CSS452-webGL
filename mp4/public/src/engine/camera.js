const glSys = require("./core/gl");

class Camera {
  constructor(wcCenter, wcWidth, viewportArray) {
    // center of the World Coordinate system
    // (x, y)
    this.mWCCenter = wcCenter;
    // width of the WC
    this.mWCWidth = wcWidth;
    // view port props in an array
    // [x, y, width, height]
    this.mViewport = viewportArray;
    // background color
    this.mBGColor = [ 0.8, 0.8, 0.8, 1 ];
    // matrix to be used in transform
    this.mCameraMatrix = mat4.create();
  }

  // freeze takes in an object and returns an object
  // the returned object can not be altered in any way
  const eViewport = Object.freeze({
    eOrgX: 0,
    eOrgY: 1,
    eWidth: 2,
    eHeight: 3
  });

  getWCHeight() {
    // given width
    // calculate aspect ratio
    // viewHeight / viewWidth
    let ratio = this.mViewport[this.eViewport.eHeight] /
        this.mViewport[this.eViewport.eWidth];

    return this.getWCHeight() * ratio;
  }

  // getter and setters for variables
  getWCCenter() { return this.mWCCenter; }
  setWCCenter(xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
  }

  getWCHeight() { return this.mWCCenter; }
  setWCWidth(width) { this.mWCWidth = width; }

  getViewport() { return this.mViewport; }
  setViewport(viewportArray) { this.mViewport = viewportArray; }

  setBackGroundColor(newColor) { this.mBGColor = newColor; }
  getBackGroundColor() { return this.mBGColor; }

  setViewAndCameraMatrix() {
    // grab the mGL web instance
    let gl = glSys.get();

    // configuring the viewport using that instance
    gl.viewport(this.mViewport[0],// x of bottom-left of area to be drawn
                this.mViewport[1],// y of bottom-left of area to be drawn
                this.mViewport[2],// width of the area to be drawn
                this.mViewport[3]); // height of the area to be drawn
    // Step A2: set up the corresponding scissor area to limit
    gl.scissor(
      // passing in coordinates for bottom
      // left corner of the viewport
      // recall that mViewport is an array that holds:
      // x, y, width, height
      // these define our viewport
      this.mViewport[0],
      this.mViewport[1],
      this.mViewport[2],
      this.mViewport[3]);

    // the same as above, passing in all values of the array
    gl.clearColor(this.mBGColor[0], this.mBGColor[1],
                  this.mBGColor[2, this.mBGColor[3]]);

    // enable then disable scissor; this is resource demanding?
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // now to set the camera matrix
    let center = this.getWCCenter();

    // scale our matrix
    // makes our camera matrix larger
    // by the scale of the aspect ratio
    mat4.scale(this.mCameraMatrix,
               // creates a 4x4 matrix
               mat4.create(),
               // this will perform the transform on the 4x4 matrix?
               vec3.fromValues ( 2.0 / this.getWCHeight,
                                 2.0 / this.getWCHeight));

    // translate camera center to the origin
    // altering the coordinates of the camera
    mat4.translate(this.mCameraMatrix, this.mCameraMatrix,
                   vec3.fromValues(-center[0], -center[1], 0));

    getCameraMatric() { return this.mCameraMatrix; }
  }
}

export default Camera;
