import FeaturesService from "../assets/images/FeaturesService.svg";
import bgFeaturesServices from "../assets/images/bg-featuresService.jpg";

const FeaturesSection = () => {
  return (
    <section className="relative w-full min-h-[500px] bg-black flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[6px] opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bgFeaturesServices})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60" aria-hidden="true"></div>
      <div className="relative max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-16 gap-12">
        <div className="flex-1 flex items-center justify-center min-h-[340px]">
          <img
            alt="Ecommerce Integrations"
            className="w-full max-w-[400px] object-contain"
            src={FeaturesService}
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center text-white max-w-xl space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            Best Ecommerce Integrations for Dropshipping
          </h1>
          <p className="text-lg font-normal text-gray-200">
            Seamlessly add products to your store and sync orders with top
            platforms like Shopify, Amazon, eBay, Wix, and more. UNICSI’s
            integrations save you time and help grow your business.
          </p>
          <button className="bg-amber-700 mt-4 font-semibold text-white text-lg px-8 py-3 rounded-full shadow hover:bg-amber-800 transition flex items-center gap-2">
            Connect my store
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

