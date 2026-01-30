import Services from "../assets/images/services.png"
import Button from "../ui/Button"
import { Arrow, Cart } from "../assets/svg"
import { useNavigate } from "react-router-dom"

const FeaturesSection = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        minHeight: "auto",
        width: "100%",
        backgroundColor: "#000000",
      }}
      className="px-4 sm:px-6 md:px-8 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Main Content Start from here */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0 min-h-[auto] lg:min-h-[500px]" >
        <div className="w-full lg:w-1/2 relative">
          <Cart className="absolute top-[34%] left-[18.9%] md:top-[35%] md:left-[20%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]"  />
          <Cart className="absolute top-[3%] left-[43%] md:top-[3%] md:left-[46%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]" />
          <Cart className="absolute top-[34%] left-[66%] md:top-[34%] md:left-[70%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]" />
          <Cart className="absolute top-[86%] left-[43.5%] md:top-[86.5%] md:left-[46.5%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]" />
          <Cart className="absolute top-[62%] left-[85%] md:top-[62%] md:left-[90%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]" />
          <Cart className="absolute top-[62%] left-[2.5%] md:top-[62%] md:left-[2.5%] w-[26px] h-[26px] md:w-[46px] md:h-[46px]" />

          <img src={Services || "/placeholder.svg"} className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between lg:pl-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug sm:leading-tight md:leading-tight lg:leading-tight">
              Best Ecommerce <br /> Integrations for <br />
              Dropshipping
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 font-normal leading-relaxed sm:leading-relaxed md:leading-relaxed mt-4 sm:mt-6">
              Seamlessly add products to your store and sync orders <br className="hidden sm:block" />
              with top platforms like Shopify, Amazon, eBay, Wix, and <br className="hidden sm:block" />
              more. UNICSI's integrations save you time and help grow
              <br className="hidden sm:block" /> your business.
            </p>
          </div>
          <div className="mt-6 sm:mt-8 md:mt-10">
            <Button
              className="text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-5 w-full sm:w-auto"
              style={{
                borderRadius: "50px",
                backgroundColor: "#0097B2",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
              onClick={() => navigate("/signup")}
            >
              Connect my store
              <Arrow className="inline-block ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
