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
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="date"
        value={start || end}
        onChange={(e) => handleChange(e.target.value, end)}
        className="px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
