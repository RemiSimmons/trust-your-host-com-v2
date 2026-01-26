"use client"

import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { FilterColumn } from "./FilterColumn"
import { filterConfig } from "./experienceFilters"

const ExperienceFilterModal = DialogPrimitive.Root
const ExperienceFilterModalTrigger = DialogPrimitive.Trigger
const ExperienceFilterModalClose = DialogPrimitive.Close

function ExperienceFilterModalOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "duration-300",
        className
      )}
      {...props}
    />
  )
}

function ExperienceFilterModalContent({ 
  experience, 
  filters, 
  onFilterChange, 
  onClearAll, 
  onBrowseStays,
  className,
  ...props 
}) {
  const handleClearAll = () => {
    onClearAll?.()
  }

  const handleBrowseStays = () => {
    onBrowseStays?.()
  }

  return (
    <DialogPrimitive.Portal>
      <ExperienceFilterModalOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50",
          "w-[900px] h-[550px]",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "bg-white rounded-xl shadow-2xl",
          "flex flex-col",
          "focus:outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-300",
          // Mobile: full screen
          "max-md:w-full max-md:h-full max-md:max-w-none max-md:max-h-none",
          "max-md:top-0 max-md:left-0 max-md:translate-x-0 max-md:translate-y-0 max-md:rounded-none",
          "max-md:overflow-y-auto",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-4">
            {experience?.icon && (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                {typeof experience.icon === "function" ? (
                  <experience.icon className="h-6 w-6 text-primary" />
                ) : (
                  <div className="h-6 w-6 text-primary">{experience.icon}</div>
                )}
              </div>
            )}
            <div>
              <DialogPrimitive.Title className="font-serif text-2xl font-bold text-foreground">
                {experience?.title || "Filter Properties"}
              </DialogPrimitive.Title>
              {experience?.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {experience.description}
                </p>
              )}
            </div>
          </div>
          <DialogPrimitive.Close
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
              "opacity-70 hover:opacity-100"
            )}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </div>

        {/* Body - 2 Column Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            <FilterColumn
              column="left"
              filters={filters}
              onFilterChange={onFilterChange}
              filterConfig={filterConfig}
              experienceTitle={experience?.title}
            />
            <FilterColumn
              column="right"
              filters={filters}
              onFilterChange={onFilterChange}
              filterConfig={filterConfig}
              experienceTitle={experience?.title}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50/50 flex-shrink-0">
          <button
            type="button"
            onClick={handleClearAll}
            className={cn(
              "px-4 py-2 text-sm font-medium text-gray-700",
              "hover:text-gray-900 hover:underline",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
            )}
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={handleBrowseStays}
            className={cn(
              "px-6 py-2 text-sm font-medium text-white rounded-lg",
              "bg-primary hover:bg-primary/90",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50",
              "shadow-sm hover:shadow-md"
            )}
          >
            Browse Stays
          </button>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { 
  ExperienceFilterModal, 
  ExperienceFilterModalTrigger, 
  ExperienceFilterModalContent,
  ExperienceFilterModalClose 
}

