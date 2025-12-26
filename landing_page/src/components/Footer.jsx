import Linkedin from "../assets/images/linkedinIcon.png"
import Instagram from "../assets/images/instaIcon.png"
import Facebook from "../assets/images/facebookIcon.png"
const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-900 rounded-full relative">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold text-[#ffffff]">UNICSI</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Dropshipping Expertise Since 2002: Trusted by Millions for Quality Products and Seamless Integration.
            </p>
          </div>

          {/* UNICSI Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#ffffff]">UNICSI</h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Payment Methods
                </a>
              </li>
            </ul>
          </div>

          {/* Fulfillment Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#ffffff]">Fulfillment</h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Tracking Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Shipping Cost and Delivery Time
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Fulfillment Fees
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Quality Inspection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Custom Packaging
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Product Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-[#ffffff]">Subscribe</h3>
            <div className="w-full">
              <div className="relative w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="w-full px-3 md:px-4 py-2 md:py-3 pr-24 md:pr-28 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                />
                <button className="absolute top-1/2 right-1 md:right-2 -translate-y-1/2 px-4 md:px-5 py-1.5 md:py-2 bg-[#8B2E00] text-white rounded-full hover:bg-[#a33a0a] transition-all duration-200 text-sm md:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-1 md:mb-2 text-[#F4F4F4] text-sm md:text-base">Copyright by</h4>
              <p className="text-[#FBFBFB] text-sm md:text-base">© 2025 UNICSI. All Rights Reserved</p>
            </div>

            {/* Contact */}
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-1 md:mb-2 text-[#FBFBFB] text-sm md:text-base">Contact Us</h4>
              <p className="text-[#FBFBFB] text-sm md:text-base">+0 12 457 4578</p>
            </div>

            {/* Address */}
            <div className="text-center lg:text-left">
              <h4 className="font-semibold mb-1 md:mb-2 text-[#FBFBFB] text-sm md:text-base">Address</h4>
              <p className="text-[#FBFBFB] text-sm md:text-base">119 Tanglewood Lane Gulfport, MS 39503</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 bg-[#FBFBFB] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <img src={Facebook || "/placeholder.svg"} alt="Facebook" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 bg-[#FBFBFB] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <img src={Instagram || "/placeholder.svg"} alt="Instagram" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 bg-[#FBFBFB] rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <img src={Linkedin || "/placeholder.svg"} alt="LinkedIn" className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
