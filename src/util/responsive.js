/**
 * This function returns a formatted string for the CSS calc() function to find the viewport height
 * @param {Number} units 
 * @returns The CSS calc() function equivalent for the viewport height
 */
export const vh = units => `calc(var(--vh, 1vh) * ${ units })`

/**
 * This function returns a formatted string for the CSS calc() function to find the viewport width
 * @param {Number} units
 * @returns The CSS calc() function equivalent for the viewport width
 */
export const vw = units => `calc(var(--vw, 1vw) * ${ units })`