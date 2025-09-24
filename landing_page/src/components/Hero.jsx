import hero from "../assets/images/hero.svg";
import React, { useState } from "react";
import { Search, Heart, Camera } from "lucide-react";
import BagImg from "../assets/images/bagImg.svg"

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
                className="hover:text-blue-300 transition-colors font-Montserrat"
              >
                All Categories
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-Montserrat"
              >
                Solutions
              </a>
              <a
                href="#"
                className="hover:text-blue-300 font-medium border-b-2 border-blue-400 pb-1 font-Montserrat"
              >
                Why UNICSI
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors font-Montserrat"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-300 transition-colors font-Montserrat">
              Login
            </button>
            <button
              className="text-white px-6 py-2 rounded-full font-medium transition-colors font-Montserrat"
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
            <h1 className="text-8xl md:text-[2.813rem] font-bold text-white mb-6 leading-tight tracking-wide font-Montserrat">
              Fulfill Your Dropshipping
            </h1>
            <h1 className="text-6xl md:md:text-[2.813rem] font-bold text-white mb-8 leading-tight tracking-wide font-Montserrat">
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
            <Search className="ml-6 mr-4 text-gray-500" size={22} />
            <input
              type="text"
              placeholder="Find the product you're looking for"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-white text-lg w-full focus:outline-none"
            />
            <div className="flex items-center mr-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
                <Camera className="text-gray-500" size={22} />
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-full font-semibold text-lg transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-[692px] left-[50px]  w-[1727px] h-[564px] z-10"
      >
        {/* Popular product */}
        <div className="flex justify-between items-center pr-[400px]">
          <h2 className="text-4xl font-bold text-white ml-[50px] mt-[30px]">
            Popular Products
          </h2>
          <a
            href="#"
            className="text-white underline hover:text-orange-400 transition-colors text-lg"
            style={{ marginTop: "30px" }}
          >
            view more
          </a>

        
        </div>

        {/* Product Cards */}
        <div
          className="flex space-x-6  mt-8 px-8  pb-4 overflow-x-scroll hide-scrollbar"
          style={{ maxWidth: "1600px" }} // adjust as needed for your layout
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
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
                  <Heart className="text-red-500" size={20} />
                </button>
              </div>

              <div>
                <p className=" mt-4 description">Simple Oil Wax Leather Messenger Shoulder Bags</p>
                <span className="Rating">⭐⭐⭐⭐⭐</span>
                <div className="PriceSection mt-4 flex items-center space-x-4">
                  <span className="Price line-through">$19.99</span>
                  <span className="OldPrice font-bold">$39.99</span>
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
