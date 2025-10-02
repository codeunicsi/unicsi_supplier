import inventory from "../assets/images/InvtMang.png";
import { Arrow } from "../assets/svg";

import Button from "../ui/Button"
const CTASection = () => {
  return (
    <div
      style={{
        height: "547px",
        width: "100%",
        display: "flex",
        // border : "1px solid #000000",
      }}
    >
      <div
        className="w-full flex my-4 mx-[96px]"
      >
        {/* Left Section - Stats */}
        <div
          style={{
            width: "52%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-around",
            // border: "1px solid violet",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div
              className="px-10 py-10"
              style={{
                borderTop: "1px solid #DBDBDB",
                borderBottom: "1px solid #DBDBDB",
                borderRight: "1px solid #DBDBDB",
              }}
            >
              <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
                10+
              </h1>
              <p>Global Warehouses</p>
            </div>
            <div className="border px-10 py-10 border-[#DBDBDB]">
              <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
                1M+
              </h1>
              <p>Cooperated Factories</p>
            </div>
            <div className="px-10 py-10"
                style={{
                borderTop: "1px solid #DBDBDB",
                borderBottom: "1px solid #DBDBDB",
                borderRight: "1px solid #DBDBDB",
              }}
            >
              <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
                1500K+
              </h1>
              <p>Trusted Ecommerce Stores</p>
            </div>
            <div className="border px-10 py-10 border-[#DBDBDB]">
              <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
                120+
              </h1>
              <p>Partner Couriers Worldwide</p>
            </div>
          </div>

          {/* CTA Text */}
          <div style={{ marginTop: "60px", lineHeight: "43px" }}>
            <p className="text-[34px]">
              Already Running <span style={{ color: "orange" }}>A Store?</span>{" "} <br />
              <span style={{ color: "brown" }}>Connect Now</span> For
              Hyper-Growth!
            </p>
          </div>
        </div>

        {/* Right Section - Images */}
        <div
          style={{
            display: "flex",
            width: "48%",
            gap: "10px",
            // border: "1px solid red",
            position: "relative",
            // height: "75%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={inventory}
              alt="Warehouse worker"
              style={{ objectFit: "cover", width: "100%" }}
            />
            <Button
              className="bottom-4 text-[18.94px] py-4"
              style={{
                borderRadius: "50px",
                backgroundColor: "#943A09",
                marginTop: "47px",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              Connect my store
              <Arrow className="inline-block ml-2" />
            </Button>
          </div>
          <div>
            <img
              src={inventory}
              alt="Packaging"
              style={{ objectFit: "cover", position: "absolute", bottom: 0, right: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
