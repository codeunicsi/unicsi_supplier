import call from "../assets/images/call.png"
const LetsTalk = () => {
  return (
    <section className="bg-gray-100 px-3 py-8 md:py-12">
      <div className="container mx-auto relative rounded-xl overflow-hidden">
        {/* Background Image */}
        <img src={call || "/placeholder.svg"} alt="Call Icon" className="w-full h-48 md:h-56 lg:h-64 object-cover" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 md:mb-6 max-w-3xl">
            Join millions of dropshippers who are making <br className="hidden md:block" /> money easily.
          </h2>
          <button className="bg-[#0097B2] hover:bg-[#0097B2] text-white font-semibold px-8 md:px-10 lg:px-12 py-2 md:py-3 rounded-full flex items-center gap-2 text-sm md:text-base">
            Get Started →
          </button>
        </div>
      </div>
    </section>
  )
}

export default LetsTalk
