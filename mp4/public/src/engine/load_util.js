/*
 * File: load_util.js
 * 
 */

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
function numLoads() { return -1; }

/**
 * Returns the sum of all objects in all of the loads
 * @export LoadUtil
 * @returns {int} num - total number of objects in all loads
 */
function numObjects() { return -1; }

/**
 * Creates a new load with the given number of objects and spreads
 * @export LoadUtil
 * @param {vec2} at - Position to create the loads
 * @param {int} numPerLoad - Number of objects to be created: numPerLoad +- numPerLoad/2
 * @param {float} loadSpread - Position for the objects: at +- loadSpread/2
 */
function createLoadAt(at, objSize, numPerLoad, loadSpread) { }

/**
 * Removes the last created load.
 * @export LoadUtil
 */
function removeLastLoad() { }

/**
 * Draws all of the objects in all of the loads
 * @export LoadUtil
 * @param {Camera} camera - the camera to draw for
 */
function drawLoads(camera) { }

export {
    numLoads, numObjects,
    createLoadAt, removeLastLoad,
    drawLoads 
}