"use client"

import { useMemo } from "react"
import ListingCard from "@/components/ListingCard"
import type { Property } from "@/types/property"

interface PropertyListProps {
  properties: Property[]
  selectedPropertyId?: string
  hoveredPropertyId?: string
  onPropertySelect?: (propertyId: string) => void
  onPropertyHover?: (propertyId: string | undefined) => void
  isLoading?: boolean
}

export default function PropertyList({
  properties,
  selectedPropertyId,
  hoveredPropertyId,
  onPropertySelect,
  onPropertyHover,
  isLoading = false,
}: PropertyListProps) {
  const sortedProperties = useMemo(() => {
    return [...properties].sort((a, b) => {
      // If a property is selected, show it first
      if (a.id === selectedPropertyId) return -1
      if (b.id === selectedPropertyId) return 1
      return 0
    })
  }, [properties, selectedPropertyId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading properties...</div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <p className="text-slate-600 text-lg mb-2">No properties found</p>
        <p className="text-slate-500 text-sm">Try adjusting your search filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
        <p className="text-sm text-slate-600">
          {properties.length} {properties.length === 1 ? "property" : "properties"} found
        </p>
      </div>
      <div className="px-4 pb-4 space-y-4">
        {sortedProperties.map((property) => (
          <ListingCard
            key={property.id}
            {...property}
            isHovered={hoveredPropertyId === property.id}
            isSelected={selectedPropertyId === property.id}
            onMouseEnter={() => onPropertyHover?.(property.id)}
            onMouseLeave={() => onPropertyHover?.(undefined)}
            onClick={() => onPropertySelect?.(property.id)}
          />
        ))}
      </div>
    </div>
  )
}

