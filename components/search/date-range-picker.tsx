"use client"
import { useState, useRef, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { cn } from "@/lib/utils"

export function DateRangePicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDateClick = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setCheckIn(date)
      setCheckOut(null)
    } else if (isAfter(date, checkIn)) {
      // Set check-out
      setCheckOut(date)
      setIsOpen(false)
    } else {
      // If clicked date is before check-in, restart
      setCheckIn(date)
      setCheckOut(null)
    }
  }

  const isInRange = (date: Date) => {
    if (!checkIn) return false
    if (checkOut) {
      return isAfter(date, checkIn) && isBefore(date, checkOut)
    }
    if (hoverDate && isAfter(hoverDate, checkIn)) {
      return isAfter(date, checkIn) && isBefore(date, hoverDate)
    }
    return false
  }

  const isSelected = (date: Date) => {
    if (checkIn && isSameDay(date, checkIn)) return true
    if (checkOut && isSameDay(date, checkOut)) return true
    return false
  }

  const displayText =
    checkIn && checkOut
      ? `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d")}`
      : checkIn
        ? format(checkIn, "MMM d, yyyy")
        : "Select dates"

  return (
    <div className="space-y-2 relative col-span-1 md:col-span-2" ref={dropdownRef}>
      <label className="block text-sm font-medium text-white drop-shadow-md">Dates</label>

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm transition-all text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-white/70" />
          <span className={checkIn ? "text-white" : "text-white/70"}>{displayText}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-[600px] max-w-[90vw] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0">
          {/* Header with month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex gap-8">
              <span className="font-semibold text-gray-900 w-32 text-center">{format(currentMonth, "MMMM yyyy")}</span>
              <span className="font-semibold text-gray-900 w-32 text-center hidden md:block">
                {format(addMonths(currentMonth, 1), "MMMM yyyy")}
              </span>
            </div>

            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Two calendars side by side */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* First month */}
            <CalendarMonth
              month={currentMonth}
              checkIn={checkIn}
              checkOut={checkOut}
              hoverDate={hoverDate}
              onDateClick={handleDateClick}
              onDateHover={setHoverDate}
              isInRange={isInRange}
              isSelected={isSelected}
            />

            {/* Second month */}
            <div className="hidden md:block">
              <CalendarMonth
                month={addMonths(currentMonth, 1)}
                checkIn={checkIn}
                checkOut={checkOut}
                hoverDate={hoverDate}
                onDateClick={handleDateClick}
                onDateHover={setHoverDate}
                isInRange={isInRange}
                isSelected={isSelected}
              />
            </div>
          </div>

          {/* Footer with clear/apply buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setCheckIn(null)
                setCheckOut(null)
              }}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Clear dates
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Calendar Month Component
function CalendarMonth({
  month,
  checkIn,
  checkOut,
  hoverDate,
  onDateClick,
  onDateHover,
  isInRange,
  isSelected,
}: {
  month: Date
  checkIn: Date | null
  checkOut: Date | null
  hoverDate: Date | null
  onDateClick: (date: Date) => void
  onDateHover: (date: Date | null) => void
  isInRange: (date: Date) => boolean
  isSelected: (date: Date) => boolean
}) {
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div>
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, month)
          const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date())
          const selected = isSelected(day)
          const inRange = isInRange(day)

          return (
            <button
              key={day.toString()}
              onClick={() => !isPast && onDateClick(day)}
              onMouseEnter={() => onDateHover(day)}
              disabled={isPast}
              className={cn(
                "w-10 h-10 text-sm rounded-lg transition-colors relative flex items-center justify-center",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isPast && "text-gray-900 hover:bg-gray-100",
                isPast && "text-gray-300 cursor-not-allowed",
                selected && "bg-accent text-white hover:bg-accent",
                inRange && !selected && "bg-accent/10",
                selected && checkIn && checkOut && isSameDay(day, checkIn) && "rounded-r-none",
                selected && checkIn && checkOut && isSameDay(day, checkOut) && "rounded-l-none",
              )}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}
