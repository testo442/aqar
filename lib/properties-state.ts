/**
 * Properties page state persistence using sessionStorage
 * Saves and restores filter/search state when navigating to/from property details
 */

export interface PropertiesState {
  searchType: "buy" | "rent"
  searchQuery: string
  maxPrice: number | null
  selectedPropertyTypes: string[]
  selectedGovernorateIds: string[]
  selectedAreaIds: string[]
  bedsMin: number | null
  bathsMin: number | null
  timestamp: number
}

const STORAGE_KEY = "aqarna:propertiesState"
const MAX_AGE_MS = 30 * 60 * 1000 // 30 minutes

export function savePropertiesState(state: Omit<PropertiesState, "timestamp">): void {
  if (typeof window === "undefined") return
  
  const stateWithTimestamp: PropertiesState = {
    ...state,
    timestamp: Date.now(),
  }
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithTimestamp))
  } catch (error) {
    // Ignore storage errors (quota exceeded, etc.)
    console.warn("Failed to save properties state:", error)
  }
}

export function loadPropertiesState(): PropertiesState | null {
  if (typeof window === "undefined") return null
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    
    const state: PropertiesState = JSON.parse(stored)
    
    // Check if state is too old
    const age = Date.now() - state.timestamp
    if (age > MAX_AGE_MS) {
      sessionStorage.removeItem(STORAGE_KEY)
      return null
    }
    
    return state
  } catch (error) {
    // Ignore parse errors
    console.warn("Failed to load properties state:", error)
    return null
  }
}

export function clearPropertiesState(): void {
  if (typeof window === "undefined") return
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    // Ignore errors
  }
}

