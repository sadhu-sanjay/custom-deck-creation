const feetValueInPixel = 36 // 36 pixels = 1 feet
export const feet = (value = 1) => value * feetValueInPixel
export const halfFeet = feet(1/2)
export const inch = feet(1/12) 
export const fourInches = feet(1/12) 


/**
 * Layers Used Through Out the App
 */
export const DECKLAYER = 'deck-layer'