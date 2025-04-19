import React from "react";
import Marquee from "react-fast-marquee";
const Rectangle = () => {
  return (
    <div className="bg-black h-[122px] text-white">
      <Marquee>
        <div className="flex gap-60 items-center justify-center h-full mt-5">
          <h1 className="text-7xl font-bold pl-30">VERSACE</h1>
          <h1 className="text-7xl font-bold">ZARA</h1>
          <h1 className="text-7xl font-bold">GUCCI</h1>
          <h1 className="text-7xl font-bold">PARADA</h1>
          <h1 className="text-7xl font-bold">Calvin Klein</h1>
        </div>
      </Marquee>
    </div>
  );
};

export default Rectangle;
