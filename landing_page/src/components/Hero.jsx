"use client"

import { useState } from "react"
import { SearchIcon, CameraIcon, Heart, Star, MenuIcon, XIcon } from "@/lib/icons"

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const heroImage = "/modern-dropshipping-hero-background.jpg"
  const productImage = "/luxury-leather-messenger-bag.jpg"

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Section */}
      <div
        className="relative w-full mx-auto rounded-2xl border border-black overflow-hidden my-4 sm:my-6 md:my-8 lg:my-10"
        style={{
          minHeight: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>

        {/* Navigation */}
        <nav className="relative z-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex justify-between items-center">
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-white text-sm md:text-base">
              <a href="#" className="hover:text-blue-300 transition-colors font-medium">
                All Categories
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors font-medium">
                Solutions
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors font-medium">
                Why UNICSI
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors font-medium">
                Pricing
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-blue-300 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="text-white hover:text-blue-300 transition-colors font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
              Login
            </button>
            <button
              className="text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap"
              style={{ backgroundColor: "#943A09" }}
            >
              Sign up
            </button>
          </div>
        </nav>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-md z-[100] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col p-6 gap-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-blue-300 transition-colors"
                aria-label="Close menu"
              >
                <XIcon size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4 text-white">
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-medium text-base py-2 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Categories
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-medium text-base py-2 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solutions
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-medium text-base py-2 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why UNICSI
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-medium text-base py-2 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-[90] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Main Hero Content */}
        <div className="relative z-40 px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-20 lg:pt-28 text-center flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 md:mb-6 leading-tight tracking-wide">
              Fulfill Your Dropshipping
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 md:mb-8 leading-tight tracking-wide font-medium">
              WITH UNICSI
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 md:mb-12 font-medium max-w-3xl mx-auto px-2 leading-relaxed">
              From Global Suppliers to Seamless Automation – Your Gateway to Hassle-Free Success Starts Here!
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative z-40 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-12 flex justify-center">
          <div className="w-full max-w-2xl md:max-w-5xl bg-white/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shadow-2xl border border-white/30">
            <SearchIcon className="ml-2 sm:ml-3 mr-2 sm:mr-4 flex-shrink-0" size={18} />
            <input
              type="text"
              placeholder="Find the product you're looking for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-white text-sm sm:text-base md:text-lg w-full focus:outline-none"
            />
            <div className="flex items-center gap-2 sm:gap-3 mr-2 sm:mr-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <CameraIcon className="text-gray-500" size={20} />
              </button>
              <button className="bg-orange-700 hover:bg-orange-800 text-white px-4 sm:px-6 md:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="relative w-full mt-8 sm:mt-12 md:mt-20 lg:mt-32 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Popular Products</h2>
          <a
            href="#"
            className="text-orange-400 hover:text-orange-300 transition-colors text-sm sm:text-base md:text-lg font-medium underline"
          >
            view more
          </a>
        </div>

        {/* Product Cards Carousel */}
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 pb-4 min-w-min">
            {[1, 2, 3, 4, 5, 6, 7].map((product) => (
              <div
                key={product}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-3 sm:p-4 flex-shrink-0 w-60 sm:w-72 md:w-80"
              >
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={productImage || "/placeholder.svg"}
                    alt={`Product ${product}`}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md"
                  />
                  <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                    <Heart size={20} className="text-red-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 line-clamp-2">
                    Simple Oil Wax Leather Messenger Shoulder Bags
                  </p>

                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <p className="text-sm sm:text-base text-gray-600 font-medium">4.5</p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="line-through text-sm sm:text-base text-gray-500 font-light">$19.99</span>
                    <span className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800">$39.99</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
