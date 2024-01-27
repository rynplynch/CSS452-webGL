/*
 * File: cursor.js
 *  
 * Defines a center red-square with white bounds indicating the effective range for the cursor. 
 * The class lets users define a domain for cursor movement. Note:
 *    DomainX/Y: defines where the cursor can move
 *    Range: in this case indicates the "effective range" for the cursor
 * Effective range is drawn as a white bounds around the cursor
 * 
 */
"use strict";

// utility for moving the cursor
import Transform from "./transform.js";

// core resources for drawing cursor
import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";

class Cursor {
    /**
     * @classdesc Class encapsulates a cursor with an active domain. Cursor movement
     * will be restricted to a defined domain.
     * @constructor
     * @param {vec2} at - initial position of the cursor
     * @param {float} DomainX - valid horizontal movement of the cursor 0 <--> DomainX
     * @param {float} DomainY - valid vertical movement of the cursor 0 <--> DomainY
     * @returns {Cursor} a new Cursor instance
     */
    constructor(at, DomainX, DomainY) {
        // the area the cursor can move in
        this.DomainX = DomainX;
        this.DomainY = DomainY;
        // the area the cursor can spread a load in
        this.cursorRange = 10;
        // color of cursor and bounds
        this.mColor = [1, 0, 0, 1];
        this.mBoundColor = [1, 1, 1, 1];
        // grab shader to enable drawing
        this.mCursorShader = shaderResources.getConstColorShader();
        // 2 shaders for the range
        this.mTopShader = shaderResources.getConstColorShader();
        this.mBottomShader = shaderResources.getConstColorShader();
        // 2 shaders for the domain
        this.mLeftShader = shaderResources.getConstColorShader();
        this.mRightShader = shaderResources.getConstColorShader();

        // create new transform to enable TRS
        this.mXform = new Transform();
        // set starting position
        this.mXform.setPosition(at[0], at[1]);

        // xForm for each of our shader bounds
        this.mTopForm = new Transform();
        this.mBottomForm = new Transform();
        this.mLeftForm = new Transform();
        this.mRightForm = new Transform();

        // set the bound shaders TRS
        this.setCursorRange(this.cursorRange);
    }

    /**
     * Sets the size of the cursor
     * @method
     * @param {float} size - the size of the cursor
     */
    setCursorSize(size) {
        this.mXform.setSize(size, size);

        // the size of the bound shaders scale to the size of the cursor
        let scale = 10
        this.mTopForm.setSize(this.cursorRange, size/scale);
        this.mBottomForm.setSize(this.cursorRange, size/scale);
        this.mLeftForm.setSize(size/scale, this.cursorRange);
        this.mRightForm.setSize(size/scale, this.cursorRange);
    }

    /**
     * Sets the active range  of the cursor
     * @method
     * @param {float} range - the active range of the cursor
     */
    setCursorRange(range) {
        // update range with user supplied range
        this.cursorRange = range;
        console.log("range: " + this.cursorRange + '\n');

        // if the range changes we need to update how we draw our bound shaders
        // clear the old transform
        this.mTopForm.setPosition(this.mXform.getXPos(), this.mXform.getYPos() + range/2);
        this.mBottomForm.setPosition(this.mXform.getXPos() , this.mXform.getYPos() - range/2);
        this.mLeftForm.setPosition(this.mXform.getXPos() - range/2, this.mXform.getYPos());
        this.mRightForm.setPosition(this.mXform.getXPos() + range/2, this.mXform.getYPos());
    }

    /**
     * Gets the current location of the cursor
     * @method
     * @returns {vec2} The [x,y] location of the cursor
     */
    cursorLocation() { return this.mXform.getPosition(); }

    /**
     * Updates the position of the cursor. This function guarantees that the cursor will be kept
     * inside the defined [DomainX, DomainY]
     * @method
     * @param {float} dx - horizontal movement delta
     * @param {float} dy - vertical movement delta
     */
    moveCursor(dx, dy) {
        // grab current position [0] = x, [1] = y
        let currPos = this.mXform.getPosition();

        // new position
        let newPos = [currPos[0] + dx, currPos[1] + dy];

        // check the new positions x and y bounds
        // if its between 0 and the x domain allow the update
        // added the cursor load range so we can't render load outside of viewport
        if ( newPos[0] > 0 + this.cursorRange/2 && newPos[0] < this.DomainX - this.cursorRange/2 ) {
            this.mXform.setXPos(newPos[0]);
        }
        if ( newPos[1] > 0 + this.cursorRange/2 && newPos[1] < this.DomainY - this.cursorRange/2) {
            this.mXform.setYPos(newPos[1]);
        }
    }

    /**
     * Draws the cursor and the current active region.
     * @method
     * @param {Camera} camera - the camera to draw for
     */
    drawCursor(camera) {

        let gl = glSys.get();

        // activate our cursor shader
        this.mCursorShader.activate(this.mColor,
                            this.mXform.getTRSMatrix(),
                            camera.getCameraMatrix());

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // Draw top bound shader
        this.mTopShader.activate(this.mBoundColor,
                                 this.mTopForm.getTRSMatrix(),
                                 camera.getCameraMatrix()
                                );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // draw bottom bound shader
        this.mBottomShader.activate(this.mBoundColor,
                                 this.mBottomForm.getTRSMatrix(),
                                 camera.getCameraMatrix()
                                );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // draw left bound
        this.mRightShader.activate(this.mBoundColor,
                                 this.mLeftForm.getTRSMatrix(),
                                 camera.getCameraMatrix()
                                );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // draw right bound
        this.mRightShader.activate(this.mBoundColor,
                                 this.mRightForm.getTRSMatrix(),
                                 camera.getCameraMatrix()
                                );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
};

export default Cursor;
