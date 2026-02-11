"use client"

import { List, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MapListToggleProps {
  view: "list" | "map"
  onViewChange: (view: "list" | "map") => void
  className?: string
}

export function MapListToggle({ view, onViewChange, className }: MapListToggleProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 bg-gray-100 rounded-lg p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn(
          "gap-2",
          view === "list" 
            ? "bg-white shadow-sm" 
            : "hover:bg-transparent"
        )}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("map")}
        className={cn(
          "gap-2",
          view === "map" 
            ? "bg-white shadow-sm" 
            : "hover:bg-transparent"
        )}
      >
        <MapIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Map</span>
      </Button>
    </div>
  )
}
