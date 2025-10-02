import React, { useState } from "react";
import hero from "../assets/images/hero.png";
import BagImg from "../assets/images/bgImg.png";
import { SearchIcon, CameraIcon, Heart, Star} from "../assets/svg/index";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="relative"
        style={{
          width: "1379.99px",
          height: "930px",
          borderRadius: "24px",
          border: "1px solid #000000",
          margin: "30px auto", // centers the hero section horizontally
          // overflow: "hidden",
          marginBottom: "400px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          style={{ borderRadius: "24px" }}
        ></div>

        {/* Navigation */}
        <nav className="relative z-50 px-[32px] py-[24px] flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex space-x-6 text-white">
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-Montserrat font-[600] text-[14px]"
              >
                All Categories
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-Montserrat font-[600] text-[14px]"
              >
                Solutions
              </a>
              <a
                href="#"
                className="hover:text-blue-300  pb-1 font-Montserrat font-[600] text-[14px]"
              >
                Why UNICSI
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-Montserrat font-[600] text-[14px]"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-300 transition-colors font-Montserrat text-[14px] font-[600] semibold">
              Login
            </button>
            <button
              className="text-white px-6 py-2 rounded-full font-medium transition-colors font-Montserrat SemiBold text-[14px]"
              style={{
                backgroundColor: "#943A09",
                hoverBackgroundColor: "#7A2E07",
              }}
            >
              Sign up
            </button>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="relative z-40 px-8 pt-[189px] text-center">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-[45px] md:text-[2.813rem] font-bold text-white mb-6 leading-tight tracking-wide font-Montserrat">
              Fulfill Your Dropshipping
            </h1>
            <h1 className="text-[64px] md:md:text-[2.813rem] text-white mb-8 leading-tight tracking-wide font-Montserrat font-medium line-height-[100%]">
              WITH UNICSI
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white mb-12 font-medium max-w-6xl mx-auto">
              From Global Suppliers to Seamless Automation – Your Gateway to
              Hassle-Free Success Starts Here!
            </p>
          </div>
        </div>

        <div className="max-w-[1060px] mx-auto mb-16 mt-[0px]">
          <div className="bg-white/50 backdrop-blur-md rounded-[17.71px] p-5 flex items-center shadow-2xl border-white/30">
            <SearchIcon className="ml-3 mr-4" size={17.527957916259766} />
            <input
              type="text"
              placeholder="Find the product you're looking for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-white text-lg w-full focus:outline-none"
            />
            <div className="flex items-center mr-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
                <CameraIcon className="text-gray-500" size="24px" />
              </button>
              <button
                className="bg-[#943A09] hover:bg-orange-700 text-white px-10 py-3 rounded-full font-bold text-[17.71px] transition-colors"
                style={{ width: "214px" }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[692px] left-[50px]  w-[1727px] h-[564px] z-10">
        {/* Popular product */}
        <div className="flex justify-between items-center px-8 mt-[30px]">
          <h2 className="text-4xl font-bold text-white">Popular Products</h2>
          <a
            href="#"
            className="text-white underline hover:text-orange-400 transition-colors text-lg"
          >
            view more
          </a>
        </div>

        {/* Product Cards */}
        <div
          className="flex space-x-6 mt-8 px-8 pb-4 overflow-x-scroll hide-scrollbar"
          style={{ maxWidth: "1600px" }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((product) => (
            <div
              key={product}
              className="bg-white rounded-lg shadow-md p-4 min-w-[378.6039733886719px] hover:shadow-xl transition-shadow"
              style={{ height: "487.68060302734375px" }}
            >
              <div className="relative">
                <img
                  src={BagImg}
                  alt={`Product ${product}`}
                  className="w-[350.35491943359375px] h-[262.76617431640625px] object-cover rounded-md"
                />
                {/* <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray- 100 transition-colors"> */}
                <div className="absolute top-2 right-2 p-2">
                  <Heart className="w-6 h-6" size="" />
                </div>

                {/* </button> */}
              </div>

              <div>
                <p className="mt-4 description text-[26.57px] font-regular">
                  Simple Oil Wax Leather Messenger Shoulder Bags
                </p>
                <div>
                  <div className="flex items-center mt-1 gap-2 text-gray-600">
                    <Star className="w-[21.975034713745117px] h-[20.98503875732422px] inline-block" />
                    <p className="font-normal w-[21.975034713745117px] h-[20.98503875732422px]">4.5</p>
                  </div>
                </div>
                <div className="PriceSection flex items-center space-x-4">
                  <span className="Price line-through text-[#000000] font-light text-[17.71px]">$19.99</span>
                  <span className="OldPrice font-bold text-[#000000] text-[26.57px]">$39.99</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
