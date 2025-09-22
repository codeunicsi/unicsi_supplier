import FeaturesService from "../assets/images/FeaturesService.svg";
import bgFeaturesServices from "../assets/images/bg-featuresService.jpg";

const FeaturesSection = () => {
  return (
    <div
      className="py-12 px-16 bg-[#000000E5]"
      style={{
        border: "1px solid green",
        height: "667px",
        display: "flex",
        backgroundImage: `url(${bgFeaturesServices})`,
        // backgroundSize: "cover",
        backgroundSize: "-10000%", // zoom in
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div style={{ border: "1px solid red", width: "50%" }}>
        <img
          src={FeaturesService}
          alt="Features"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          border: "1px solid blue",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <h1 className="text-[#FFFFFF]">Best Ecommerce Integrations for Dropshipping</h1>
        <p className="text-[#FBFBFB]">
          Seamlessly add products to your store and sync orders with top
          platforms like Shopify, Amazon, eBay, Wix, and more. UNICSI’s
          integrations save you time and help grow your business.
        </p>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
      </div>
    </div>
  );
};

export default FeaturesSection;

