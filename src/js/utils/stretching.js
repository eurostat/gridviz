//@ts-check

/**
 * Some function [0,1]->[0,1] to stretch range of values.
 * TODO: include link to observable page.
 */


/**
  * Function [0,1]->[0,1] to stretch range of values.
  * Polynomial
  * 
  * @param {number} t The value to stretch, within [0,1]
  * @param {number} alpha 0,1,Inf
  * @returns {number} The stretched value, within [0,1]
  */
export const sPow = (t, alpha = 3) => Math.pow(t, alpha);

/**
 * Function [0,1]->[0,1] to stretch range of values.
 * Polynomial (reverse)
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha 0,1,Inf
 * @returns {number} The stretched value, within [0,1]
 */
export const sPow2 = (t, alpha = 3) => 1 - Math.pow(1 - t, 1 / alpha);



/**
 * Function [0,1]->[0,1] to stretch range of values.
 * Exponential
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha 0: no deformation. -Inf: show low values. Inf: show high values.
 * @returns {number} The stretched value, within [0,1]
 */
export const sExp = (t, alpha = 3) => alpha == 0 ? t : (Math.exp(t * alpha) - 1) / (Math.exp(alpha) - 1);

/**
 * Function [0,1]->[0,1] to stretch range of values.
 * Exponential (reverse)
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha -Inf,0,Inf
 * @returns {number} The stretched value, within [0,1]
 */
export const sExp2 = (t, alpha = 3) => alpha == 0 ? t : 1 - (1 / alpha) * Math.log(Math.exp(alpha) * (1 - t) + t);;
