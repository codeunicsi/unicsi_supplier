import hero from "../assets/images/hero.svg";
import React, { useState } from "react";
import { Search, Heart, Camera } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
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

      {/* product section */}
      <div
        className="max-w-[960px] mx-auto mb-16 mt-[0px] relative"
        style={{ border: "2px solid blue" }}
      >
        <div>
          <h1
            className="text-2xl font-bold text-white z-40"
            style={{ border: "2px solid red" }}
          >
            Popular Products
          </h1>
        </div>

        <div className="flex justify-between" style={{ border: "2px solid green" }}>
            <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a
            class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              class="peer absolute top-0 right-0 h-full w-full object-cover"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
              alt="product image"
            />
            <img
              class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="product image"
            />
            <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div>
            <svg
              class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
              />
            </svg>
            <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              39% OFF
            </span>
          </a>
          <div class="mt-4 px-5 pb-5">
            <a href="#">
              <h5 class="text-xl tracking-tight text-slate-900">
                Nike Air MX Super 2500 - Red
              </h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-3xl font-bold text-slate-900">$449</span>
                <span class="text-sm text-slate-900 line-through">$699</span>
              </p>
            </div>
            <a
              href="#"
              class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a>
          </div>
        </div>

              <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a
            class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              class="peer absolute top-0 right-0 h-full w-full object-cover"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
              alt="product image"
            />
            <img
              class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="product image"
            />
            <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div>
            <svg
              class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
              />
            </svg>
            <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              39% OFF
            </span>
          </a>
          <div class="mt-4 px-5 pb-5">
            <a href="#">
              <h5 class="text-xl tracking-tight text-slate-900">
                Nike Air MX Super 2500 - Red
              </h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-3xl font-bold text-slate-900">$449</span>
                <span class="text-sm text-slate-900 line-through">$699</span>
              </p>
            </div>
            <a
              href="#"
              class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a>
          </div>
        </div>

              <div class="group my-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <a
            class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              class="peer absolute top-0 right-0 h-full w-full object-cover"
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"
              alt="product image"
            />
            <img
              class="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="product image"
            />
            <div class="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
              <div class="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
            </div>
            <svg
              class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
              />
            </svg>
            <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              39% OFF
            </span>
          </a>
          <div class="mt-4 px-5 pb-5">
            <a href="#">
              <h5 class="text-xl tracking-tight text-slate-900">
                Nike Air MX Super 2500 - Red
              </h5>
            </a>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-3xl font-bold text-slate-900">$449</span>
                <span class="text-sm text-slate-900 line-through">$699</span>
              </p>
            </div>
            <a
              href="#"
              class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </a>
          </div>
        </div>
        </div>

      
      </div>
    </div>
  );
};

export default Hero;
