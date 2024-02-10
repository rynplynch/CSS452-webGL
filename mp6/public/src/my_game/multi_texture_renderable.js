/*
 * File: multi_texture_renderable.js
 *
 * Supports the drawing of an effect texture on TextureRenderable
 * 
 */

/**
 * Enum for how to blend between effect and main texture
  * @enum
 */
const eTexEffectFlag = Object.freeze({
    eNone: 0,
    eTransparent: 1,
    eOverride: 2,
    eBlend: 3
});

class MultiTextureRenderable extends TextureRenderable {
    // myTexture: covers the entire Renderable
    // effectTex: effect texture
    /**
     * @classdesc Class that encapsulates an effect texture over a TextureRenderable.
     * @constructor
     * @param {string} myTexture - the filename of the texture for the TextureRenderable
     * @param {string} effectTex - the filename of the texture for the effect
     * @returns {MultiTextureRenderable} a new MultiTextureRenderable instance
     */
    constructor(myTexture, effectTex) { }
    
    /**
     *  The following are _new_ functions specific to MultiTextureRenderable.
     *  You must decide if your class needs to override any other 
     *  functions in the Renderable hierarchy.
     */

    /**
     * Sets the mode for the effect texture
     * @method
     * @param {eTexEffectFlag} mode - eNone, eTransparent, eOverride, or eBlend
     */
    setEffectMode(mode) { }

    /**
     * Gets the mode for the effect texture
     * @method
     * @returns {eTexEffectFlag}: eNone, eTransparent, eOverride, or eBlend
     */
    getEffectMode() { }


     /**
     * Sets the blend factor of effect texture when in eBlend mode.
     * @method
     * @param {float} f - the blend factor
     */
    setEffectBlendFactor(f) { }

    /**
     * Gets the blend factor of effect texture when in eBlend mode
     * @method
     * @returns {float}: current blend factor
     */
    getEffectBlendFactor() { }

    /**
     * Gets the Transform for controlling the placement of the effect texture
     * @method
     * @returns {Transform}: transform the controls the effect texture placement
     */
    getEffectPlacement() { }

}