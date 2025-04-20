"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import Rectangle from "./Rectangle";

const Banner = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 md:px-20 py-12">
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            FIND CLOTHES <br className="hidden md:block" />
            THAT MATCHES <br className="hidden md:block" />
            YOUR STYLE
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="bg-black text-white text-lg md:text-xl px-8 py-4 rounded-full">
              Shop Now
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center md:text-left mt-8">
            <div>
              <h2 className="text-xl md:text-5xl font-bold">
                <CountUp end={200} duration={2} />+
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                International Brands
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-5xl font-bold">
                <CountUp end={2000} duration={2} />+
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                High-Quality Products
              </p>
            </div>
            <div>
              <h2 className="text-xl md:text-5xl font-bold">
                <CountUp end={30000} duration={2} />+
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            width={500}
            height={600}
            className="object-cover rounded-lg"
            alt="Model"
            src="https://i.ibb.co.com/39cmq72S/mohammed-idris-djoudi-r-E1-G0r-Ad-Axk-unsplash.jpg"
          />
        </div>
      </div>

      <Rectangle />
    </div>
  );
};

export default Banner;
