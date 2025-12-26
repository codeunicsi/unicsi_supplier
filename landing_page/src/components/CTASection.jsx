import inventory from "../assets/images/InvtMang.png"
import { Arrow } from "../assets/svg"

import Button from "../ui/Button"
const CTASection = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
      className="min-h-screen md:min-h-[547px] py-8 md:py-4"
    >
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-0 px-4 sm:px-6 md:px-12 lg:mx-24 my-4">
        {/* Left Section - Stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          className="w-full md:w-1/2"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
            className="md:grid-cols-2"
          >
            <div
              className="px-4 sm:px-6 md:px-10 py-6 md:py-10 text-sm sm:text-base"
              style={{
                borderTop: "1px solid #DBDBDB",
                borderBottom: "1px solid #DBDBDB",
                borderRight: "1px solid #DBDBDB",
              }}
            >
              <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">10+</h1>
              <p>Global Warehouses</p>
            </div>
            <div className="border px-4 sm:px-6 md:px-10 py-6 md:py-10 text-sm sm:text-base border-[#DBDBDB]">
              <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">1M+</h1>
              <p>Cooperated Factories</p>
            </div>
            <div
              className="px-4 sm:px-6 md:px-10 py-6 md:py-10 text-sm sm:text-base"
              style={{
                borderTop: "1px solid #DBDBDB",
                borderBottom: "1px solid #DBDBDB",
                borderRight: "1px solid #DBDBDB",
              }}
            >
              <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">1500K+</h1>
              <p>Trusted Ecommerce Stores</p>
            </div>
            <div className="border px-4 sm:px-6 md:px-10 py-6 md:py-10 text-sm sm:text-base border-[#DBDBDB]">
              <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">120+</h1>
              <p>Partner Couriers Worldwide</p>
            </div>
          </div>

          {/* CTA Text */}
          <div style={{ lineHeight: "1.4" }} className="mt-8 md:mt-[60px]">
            <p className="text-xl sm:text-2xl md:text-[34px]">
              Already Running <span style={{ color: "orange" }}>A Store?</span> <br />
              <span style={{ color: "brown" }}>Connect Now</span> For Hyper-Growth!
            </p>
          </div>
        </div>

        {/* Right Section - Images */}
        <div
          style={{
            gap: "10px",
            position: "relative",
          }}
          className="w-full md:w-1/2 flex flex-col md:flex-row items-stretch"
        >
          <div className="flex flex-col items-center w-full md:flex-1">
            <img
              src={inventory || "/placeholder.svg"}
              alt="Warehouse worker"
              style={{ objectFit: "cover" }}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96"
            />
            <Button
              className="bottom-4 text-base sm:text-lg md:text-[18.94px] py-3 md:py-4 mt-6 md:mt-[47px] w-full"
              style={{
                borderRadius: "50px",
                backgroundColor: "#943A09",
              }}
            >
              Connect my store
              <Arrow className="inline-block ml-2" />
            </Button>
          </div>
          <div className="hidden md:flex md:flex-1">
            <img
              src={inventory || "/placeholder.svg"}
              alt="Packaging"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection
