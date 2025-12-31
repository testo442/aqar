/**
 * Property type definitions for BUY vs RENT
 */

export const BUY_PROPERTY_TYPES = ["villa", "apartment", "land", "tower"] as const
export const RENT_PROPERTY_TYPES = ["villa", "apartment", "villa_floor"] as const

export type BuyPropertyType = typeof BUY_PROPERTY_TYPES[number]
export type RentPropertyType = typeof RENT_PROPERTY_TYPES[number]
export type PropertyType = BuyPropertyType | RentPropertyType

/**
 * Get property types based on transaction type
 */
export function getPropertyTypes(type: "buy" | "rent"): readonly string[] {
  return type === "buy" ? BUY_PROPERTY_TYPES : RENT_PROPERTY_TYPES
}

/**
 * Check if a property type is valid for the given transaction type
 */
export function isValidPropertyType(type: string, transactionType: "buy" | "rent"): boolean {
  const validTypes = getPropertyTypes(transactionType)
  return validTypes.includes(type.toLowerCase())
}

