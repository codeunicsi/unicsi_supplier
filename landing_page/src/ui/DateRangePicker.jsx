// components/ui/DateRangePicker.jsx
import { useState } from "react"

export default function DateRangePicker({ onChange, className = "" }) {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const handleChange = (newStart, newEnd) => {
    setStart(newStart)
    setEnd(newEnd)
    if (onChange) onChange({ start: newStart, end: newEnd })
  }

  return (
    <div
      className={`flex min-w-0 w-full max-w-full flex-wrap items-stretch gap-2 sm:flex-nowrap sm:items-center ${className}`}
    >
      <input
        type="date"
        value={start || end}
        onChange={(e) => handleChange(e.target.value, end)}
        className="min-h-[42px] min-w-0 w-full max-w-full flex-1 rounded-md border px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-w-[11rem] sm:flex-none sm:px-3"
      />
      {/* <span className="text-gray-500">to</span>
      <input
        type="date"
        value={end}
        onChange={(e) => handleChange(start, e.target.value)}
        className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      /> */}
    </div>
  )
}
