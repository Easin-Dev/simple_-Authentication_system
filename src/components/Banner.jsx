"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const Banner = () => {
  return (
    <div className="grid grid-cols-2 gap-10 items-center justify-center h-[80vh] px-10">
      <div className="col-span-1  h-full flex flex-col justify-center items-start gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-7xl font-extrabold">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div>
          <button
            type="reset"
            className="btn bg-black rounded-3xl text-xl p-6 text-white"
          >
            Shop Now
          </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <div>
            <h1 className="text-7xl font-medium">
              <CountUp end={200} duration={20} />+
            </h1>
            <p>International Brands</p>
          </div>
          <div>
            <h1 className="text-7xl font-medium">
              <CountUp end={2000} duration={10} />+
            </h1>
            <p>High-Quality Products</p>
          </div>
          <div>
            <h1 className="text-7xl font-medium">
              <CountUp end={30000} duration={5} />+
            </h1>
            <p>Happy Client</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center  h-full relative">
      {/* <Image className="absolute top-110 left-15" src="https://i.ibb.co.com/KYswpJQ/download-1.png" width={60} height={100} /> */}
        <Image
          width={700}
          height={500}
          src={"https://i.ibb.co.com/39cmq72S/mohammed-idris-djoudi-r-E1-G0r-Ad-Axk-unsplash.jpg"}
        />
        {/* <Image className="absolute top-40 right-20" src="https://i.ibb.co.com/KYswpJQ/download-1.png" width={100} height={100} /> */}
      </div>
    </div>
  );
};

export default Banner;
