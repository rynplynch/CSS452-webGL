/*
 * File: loop_functions.js
 *  
 * you can implement and included the following functions in your loop.js module
 * 
 */

/**
 * Total number of loop cycles ran since the beginning of the game
 * @export Loop
 * @returns {int} num - total number of loop cycles
 */
function totalCycles() { return -1; } 

/**
 * Total milliseconds elapsed since the beginning of the game
 * @export Loop
 * @returns {int} num - total number of milliseconds
 */
function totalRunningTime() { return -1; }

/**
 * Amount of time in milliseconds that the previous frame took
 * @export Loop
 * @returns {int} num -  number of milliseconds
 */
function previousFrameTime() { return -1; }

/**
 * Number of update()'s being called in the previous frame
 * @export Loop
 * @returns {int} num -  number of times Update() was called
 */
function previousUpdatePerDraw() { return -1; }

/**
 * Since the game began, what was the maximum number of Update() that 
 * was called during one loop iteration
 * @export Loop
 * @returns {int} num -  max number of times Update() was called
 */
function maxUpdatePerDraw() { return -1; }

/**
 * Current accumulated lag time (in milliseconds)
 * @export Loop
 * @returns {int} num -  current accumulated lag time
 */
function accumulatedLag() { return -1; }

/**
 * Since the game began, what was the maximum accumulated lag time
 * @export Loop
 * @returns {int} num -  max accumulated lag time (in milliseconds)
 */
function maxLagTime() { return -1; }