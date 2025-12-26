import { Pencil, NibPen, Sound, Paint, HumanIcon, Diamond } from "@/lib/icons"

const services = [
  {
    id: 1,
    title: "Custom Packaging",
    description: "UNICSI help source from cooperated factories in China and assign to you for selling.",
    icon: Pencil,
    variant: "secondary",
  },
  {
    id: 2,
    title: "Custom Packaging",
    description:
      "Custom Packaging for Dropshipping is turn one-time buyers into loyal customers with packaging that speaks volumes.",
    icon: NibPen,
    variant: "secondary",
  },
  {
    id: 3,
    title: "3PL Fulfillment",
    description:
      "Enjoy hassle-free order processing and lightning-fast global shipping for your own products stocked in UNICSI's warehouse.",
    icon: Sound,
    variant: "secondary",
  },
  {
    id: 4,
    title: "ODM Power",
    description: "Collaborate with UNICSI's top manufacturers to develop your exclusive, high-quality products",
    icon: Paint,
    variant: "secondary",
  },
  {
    id: 5,
    title: "Print on Demand",
    description: "Bring your creative visions to life with custom-printed merchandise.",
    icon: HumanIcon,
    variant: "secondary",
  },
  {
    id: 6,
    title: "Bulk Purchase",
    description: "Save on bulk orders with wholesale pricing, flexible terms, and fast global delivery.",
    icon: Diamond,
    variant: "secondary",
  },
]

const Services = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header - responsive text sizes and spacing */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2">
            UNICSI Supports You in Every Step
            <br className="hidden sm:block" />
            <span className="block sm:inline"> of Growth</span>
          </h2>
        </div>

        {/* Services Grid - responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className={`
                  group rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-300 hover:scale-105 
                  ${service.variant === "primary"
                    ? "bg-[#943A09] text-white"
                    : "bg-gray-100 text-black hover:bg-[#943A09] hover:text-white"
                  }
                `}
              >
                {/* Icon - responsive icon sizing */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors duration-300
                      ${service.variant === "primary"
                        ? "bg-white text-[#943A09]"
                        : "bg-[#FFE492] text-black group-hover:bg-white group-hover:text-[#943A09]"
                      }
                    `}
                  >
                    <IconComponent size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Content - responsive text sizes */}
                <div>
                  <h3
                    className={`
                      text-lg sm:text-xl font-bold mb-3 sm:mb-4 transition-colors duration-300
                      ${service.variant === "primary" ? "text-white" : "text-[#0C0C0C] group-hover:text-white"}
                    `}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`
                      text-sm sm:text-base leading-relaxed transition-colors duration-300
                      ${service.variant === "primary" ? "text-white/90" : "text-[#0C0C0CE5] group-hover:text-white"}
                    `}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
