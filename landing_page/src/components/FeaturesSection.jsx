import Services from "../assets/images/services.png"
import Button from "../ui/Button"
import { Arrow, Cart } from "../assets/svg"

const FeaturesSection = () => {
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
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0 min-h-[auto] lg:min-h-[500px]">
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">
          <Cart className="absolute top-[166px] left-[120px] hidden lg:block" />
          <Cart className="absolute top-[18px] left-[276px] hidden lg:block" />
          <Cart className="absolute top-[170.37px] left-[420px] hidden lg:block" />
          <Cart className="absolute top-[430px] left-[280px] right-[306px] bottom-[28px] hidden lg:block" />
          <Cart className="absolute top-[308px] left-[548px] right-[18px] bottom-[15px] hidden lg:block" />
          <Cart className="absolute top-[300px] left-[21px] hidden lg:block" />
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
                backgroundColor: "#943A09",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
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
