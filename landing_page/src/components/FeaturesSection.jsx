import Services from "../assets/images/services.png";
import bgFeaturesServices from "../assets/images/bg-featuresService.jpg";
import Button from "../ui/Button";
import { Arrow, Cart } from "../assets/svg";

const FeaturesSection = () => {
  return (
    <div
      //     className="absolute inset-0 bg-cover bg-center filter blur-[6px] opacity-50"
      style={{
        height: "667px",
        width: "100%",
        padding: "104px",
        backgroundColor: "#000000",
        // backgroundImage: `url(${bgFeaturesServices})`,
      }}
    >
      {/* Main Content Start from here */}
      <div
        style={{ height: "100%" }}
        className="flex"
      >
        <div
          className=""
          style={{
            width: "50%",
            position: "relative",
          }}
        >
          <Cart className="absolute top-[166px] left-[120px]" />
          <Cart className="absolute top-[18px] left-[276px]" />
          <Cart className="absolute top-[170.37px] left-[420px]" />
          <Cart className="absolute top-[430px] left-[280px] right-[306px] bottom-[28px]" />
          <Cart className="absolute top-[308px] left-[548px] right-[18px] bottom-[15px]" />
          <Cart className="absolute top-[300px] left-[21px]"/>
          <img src={Services} />
        </div>
        <div
          style={{width: "50%", paddingLeft: "60px"}}
          className="flex flex-col justify-between"
        >
          <div>
            <h1 className="text-[48px] text-[#ffffff] font-bold leading-[56px]">
              Best Ecommerce <br /> Integrations for <br />
              Dropshipping
            </h1>
            <p className="text-[16px] text-[#ffffff] font-normal leading-[30px] mt-6">
              Seamlessly add products to your store and sync orders <br />
              with top platforms like Shopify, Amazon, eBay, Wix, and <br />
              more. UNICSI’s integrations save you time and help grow
              <br /> your business.
            </p>
          </div>
          <div>
            <Button
              className="bottom-4 text-[18.94px] py-4"
              style={{
                borderRadius: "50px",
                backgroundColor: "#943A09",
                // marginTop: "47px",
                width: "50%",
                // maxWidth: "100%",
              }}
            >
              Connect my store
              <Arrow className="inline-block ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

// <section className="relative w-full min-h-[500px] bg-black flex items-center overflow-hidden">
//   <div
//     className="absolute inset-0 bg-cover bg-center filter blur-[6px] opacity-50"
//     aria-hidden="true"
//     style={{
//       backgroundImage: `url(${bgFeaturesServices})`,
//     }}
//   ></div>
//   <div className="absolute inset-0 bg-black opacity-60" aria-hidden="true"></div>
//   <div className="relative max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-16 gap-12">
//     <div className="flex-1 flex items-center justify-center min-h-[340px]">
//       <img
//         alt="Ecommerce Integrations"
//         className="w-full max-w-[400px] object-contain"
//         src={FeaturesService}
//       />
//     </div>
//     <div className="flex-1 flex flex-col items-start justify-center text-white max-w-xl space-y-6">
//       <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
//         Best Ecommerce Integrations for Dropshipping
//       </h1>
//       <p className="text-lg font-normal text-gray-200">
//         Seamlessly add products to your store and sync orders with top
//         platforms like Shopify, Amazon, eBay, Wix, and more. UNICSI’s
//         integrations save you time and help grow your business.
//       </p>
//       <button className="bg-amber-700 mt-4 font-semibold text-white text-lg px-8 py-3 rounded-full shadow hover:bg-amber-800 transition flex items-center gap-2">
//         Connect my store
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 ml-2"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M17 8l4 4m0 0l-4 4m4-4H3"
//           ></path>
//         </svg>
//       </button>
//     </div>
//   </div>
// </section>
