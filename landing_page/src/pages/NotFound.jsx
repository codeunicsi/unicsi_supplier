// components/NotFound.tsx
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {/* Big 404 Text */}
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
        
        {/* Subtitle */}
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page Not Found
        </p>

        {/* Description */}
        <p className="mt-2 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
        >
          <ArrowLeft size={20} />
          Go Back
        </button>
      </div>
    </div>
  )
}
