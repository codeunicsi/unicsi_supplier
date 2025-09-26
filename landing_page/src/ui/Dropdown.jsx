// components/ui/Dropdown.jsx
export default function Dropdown({ options, value, onChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}
