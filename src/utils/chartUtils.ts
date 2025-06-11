
/**
 * Utility functions for safe chart data processing
 * Ensures numerical calculations never produce NaN or invalid values
 */

/**
 * Safely divides two numbers, returning a fallback value if division would be invalid
 */
export const safeDivide = (numerator: number, denominator: number, fallback: number = 0): number => {
  if (!denominator || !isFinite(denominator) || denominator === 0) {
    return fallback;
  }
  const result = numerator / denominator;
  return isFinite(result) ? result : fallback;
};

/**
 * Ensures a number is finite and within reasonable bounds
 */
export const safeNumber = (value: number, fallback: number = 0, min?: number, max?: number): number => {
  if (!isFinite(value) || isNaN(value)) {
    return fallback;
  }
  
  let result = value;
  if (min !== undefined && result < min) result = min;
  if (max !== undefined && result > max) result = max;
  
  return result;
};

/**
 * Safely calculates average content length from positions
 */
export const calculateAvgContentLength = (positions: any[]): number => {
  if (!positions || positions.length === 0) return 0;
  
  const totalLength = positions.reduce((sum, pos) => {
    const summaryLength = pos?.summary?.length || 0;
    const quoteLength = pos?.quote?.length || 0;
    return sum + summaryLength + quoteLength;
  }, 0);
  
  return safeDivide(totalLength, positions.length);
};

/**
 * Validates and normalizes chart data to prevent rendering errors
 */
export const validateChartData = (data: any[]): any[] => {
  if (!Array.isArray(data)) return [];
  
  return data.filter(item => {
    // Ensure each data item has valid properties
    if (!item || typeof item !== 'object') return false;
    
    // Check that numerical values are valid
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'number' && (!isFinite(value) || isNaN(value))) {
        console.warn(`Invalid numerical value for ${key}:`, value);
        return false;
      }
    }
    
    return true;
  });
};
