import profileImg from "../assets/images/profile.jpg"
const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">What Do Other Dropshippers Say?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex gap-2 md:gap-3 mb-4">
              <img
                src={profileImg || "/placeholder.svg"}
                alt="Customer 1"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0"
              />
              <div className="flex flex-col">
                <h4 className="font-semibold text-base md:text-lg">Veena</h4>
                <p className="text-gray-500 text-sm md:text-base">Dropshipper</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4">
              “Finding winning products was always difficult until I joined Unicsi. Their product selection and Seller support genuinely stand out.”
            </p>
            <div className="text-xs md:text-sm text-gray-500">Veena, Dropshipper</div>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex gap-2 md:gap-3 mb-4">
              <img
                src={profileImg || "/placeholder.svg"}
                alt="Customer 1"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0"
              />
              <div className="flex flex-col">
                <h4 className="font-semibold text-base md:text-lg">Ram</h4>
                <p className="text-gray-500 text-sm md:text-base">Dropshipper</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base mb-3 md:mb-4">
              “Unicsi made dropshipping simple for me. Unique products, fast dispatch, and clear communication. Perfect for Indian Dropshipper who want to scale without headaches.”
            </p>
            <div className="text-xs md:text-sm text-gray-500">Ram, Dropshipper</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
