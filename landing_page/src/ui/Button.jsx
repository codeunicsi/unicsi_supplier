// components/ui/Button.jsx
export default function Button({ children, variant = "primary", onClick, className = "", style="" }) {
  const base = "px-4 py-2 rounded-md text-sm font-medium transition"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ border :"2px solid red", ...style }}
    >
      {children}
    </button>
  )
}
