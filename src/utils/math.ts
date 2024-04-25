/**
 * @file math.ts
 * @brief Math utility functions
 */

/**
 * Get the square root of a number with the sign of the number preserved
 *
 * @param x number
 * @returns the square root of the number with the sign of the number preserved
 */
export const sqrtAnyNum = (x: number) => {
  if (x < 0) {
    return -Math.sqrt(Math.abs(x));
  }
  return Math.sqrt(x);
};
