/*
 * File: load_util.js
 * 
 */
"use strict";

// utility for moving the cursor
import Transform from "./transform.js";

// core resources for drawing cursor
import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";
import Renderable from "./renderable.js";

// each element represents a load
// each load is an array
let loadStack = [];
let createdObjects = 0;

/**
 * System util for load/run-time investigation. Allows the creation of "loads" where each load is a 
 * collection of rectangles (objects) with random size/spread. For each load, the user can control 
 *    the number of objects to be created
 *    the spread of these objects
 * This util will keep track of all created loads, and allow the deletion of the last created load.
 * @module LoadUtil
 */

/**
 * Returns number of loads that has been created.
 * @export LoadUtil
 * @returns {int} num - number of load that has been created
 */
function numLoads() { return loadStack.length; }

/**
 * Returns the sum of all objects in all of the loads
 * @export LoadUtil
 * @returns {int} num - total number of objects in all loads
 */
function numObjects() { return createdObjects; }

/**
 * Creates a new load with the given number of objects and spreads
 * @export LoadUtil
 * @param {vec2} at - Position to create the loads
 * @param {int} numPerLoad - Number of objects to be created: numPerLoad +- numPerLoad/2
 * @param {float} loadSpread - Position for the objects: at +- loadSpread/2
 */
function createLoadAt(at, objSize, numPerLoad, loadSpread) {
    // increment created objects
    createdObjects += numPerLoad;

    // the load is represented by an array
    let load = []

    // allowed range for size of renderables
    let sizeRange = 5

    // lower bound for x and y
    let xLower = at[0] - loadSpread/2;
    let yLower = at[1] - loadSpread/2;

    // each loop creates a new renderable object
    for ( let i=0; i < numPerLoad; i++) {
        let render = new Renderable();

        // generate a random number for x and y position
        let randX = xLower + (loadSpread * Math.random());
        let randY = yLower + (loadSpread * Math.random());
        render.getXform().setPosition(randX, randY);

        // generate random numbers for color
        let randcolor = [];
        for ( let i=0; i < 3; i++) {
            randcolor[i] = Math.random();
        }
        // the last number of color array is always 1
        randcolor.push(1);
        render.setColor(randcolor);

        // generate random numbers for size
        let randSizeX = objSize + (sizeRange * Math.random());
        let randSizeY = objSize + (sizeRange * Math.random());
        render.getXform().setSize(randSizeX, randSizeY);

        // generate random number for rotation
        let randRot = -1 + (360 * Math.random());
        render.getXform().setRotationInDegree(randRot);

        // add to the load array
        load.push(render);
    }

    // add new load to the array of loads
    loadStack.push(load);
}

/**
 * Removes the last created load.
 * @export LoadUtil
 */
function removeLastLoad() {
    // check to make sure load array has a load to delete
    if (loadStack.length != 0) {
        // pop the last load
        let load = loadStack.pop();

        // update the number of objects render
        createdObjects -= load.length;
        return;
    }
    console.log("No loads to delete");
}

/**
 * Draws all of the objects in all of the loads
 * @export LoadUtil
 * @param {Camera} camera - the camera to draw for
 */
function drawLoads(camera) {
    let gl = glSys.get();

    // we have to draw every load
    loadStack.forEach( (load) => {

        // within each load is an array of objects to draw
        load.forEach( (toDraw) => {
            toDraw.mShader.activate(toDraw.getColor(),
                                toDraw.getXform().getTRSMatrix(),
                                camera.getCameraMatrix());

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        });
    });

}

export {
    numLoads, numObjects,
    createLoadAt, removeLastLoad,
    drawLoads 
}
