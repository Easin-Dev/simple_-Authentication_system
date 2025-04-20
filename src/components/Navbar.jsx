"use client";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navbarItems = [
    { id: 1, name: "Shop", link: "/shop" },
    { id: 2, name: "On Sale", link: "/one_sale" },
    { id: 3, name: "New Arrivals", link: "/new_arrivals" },
    { id: 4, name: "Brands", link: "/brands" },
  ];

  return (
    <nav className="bg-white shadow-md w-full z-50 relative">
      <div className="flex justify-between items-center px-4 md:px-10 h-20">
        {/* Logo */}
        <h1 className="text-2xl md:text-4xl font-bold">SHOP.CO</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between w-2/3">
          <div className="flex gap-6">
            {navbarItems.map((item) => (
              <Link
                className="hover:underline text-base font-medium"
                key={item.id}
                href={item.link}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search products..."
            className="bg-[#F0F0F0] h-10 w-80 rounded-full px-4 text-sm transition-all duration-300"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search icon (mobile only) */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <Search size={24} />
          </button>

          {/* Cart Icon */}
          <button className="btn btn-circle bg-transparent border-none">
            <ShoppingCart />
          </button>

          {/* Get In Button (only desktop) */}
          <Link
            href="/get-in"
            className="hidden md:block btn btn-error text-white text-base px-6 py-2 rounded-3xl"
          >
            Get in
          </Link>

          {/* Menu Icon (mobile only) */}
          <button
            className="md:hidden text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 py-4 px-6" : "max-h-0 px-6"
        }`}
      >
        <div className="flex flex-col gap-4">
          {navbarItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="text-base font-medium border-b py-2"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/get-in"
            className="btn btn-error text-white text-base px-6 py-2 rounded-3xl mt-2"
          >
            Get in
          </Link>
        </div>
      </div>

      {/* Mobile Search Slide Down */}
      <div
        className={`md:hidden px-4 transition-all duration-300 overflow-hidden ${
          showSearch ? "max-h-24 py-4" : "max-h-0"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#F0F0F0] h-10 w-full rounded-full px-4 text-sm"
        />
      </div>
    </nav>
  );
};

export default Navbar;
