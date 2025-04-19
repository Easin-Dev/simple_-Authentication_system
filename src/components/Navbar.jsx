import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navbarItems = [
    { id: 1, name: "Shop", link: "/shop" },
    { id: 2, name: "On Sale", link: "/one_sale" },
    { id: 3, name: "New Arrivals", link: "/new_arrivals" },
    { id: 4, name: "Brands  ", link: "/brands" },
  ];

  return (
    <div className="flex justify-between items-center bg-white h-20 px-10 shadow-md">
      <div>
        <h1 className="text-4xl font-bold">SHOP.CO</h1>
      </div>


      <div className="flex items-center justify-between w-1/2">
        <div>
          {navbarItems.map((item) => (
            <Link className="pr-4 hover:underline" key={item?.id} href={item?.link}>
              {item?.name}
            </Link>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#F0F0F0] h-10 w-96 mt-3 rounded-r-full rounded-l-full p-4"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button className="btn btn-circle">
          <ShoppingCart />
        </button>
        <Link href={"/get-in"} className="btn btn-error text-white text-xl rounded-3xl">
          Get in
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
