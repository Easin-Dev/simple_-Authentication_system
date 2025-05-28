"use client";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  ChevronUp,
  ChevronDown,
  LogOut,
  CircleUser,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navbarItems = [
    { id: 1, name: "Shop", link: "/shop" },
    { id: 2, name: "On Sale", link: "/one_sale" },
    { id: 3, name: "New Arrivals", link: "/new_arrivals" },
    { id: 4, name: "Brands", link: "/brands" },
  ];

  const handleLogout = () => {
    signOut();
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md w-full z-50 relative">
      <div className="flex justify-between items-center px-4 md:px-10 h-20">
        <h1 className="text-2xl md:text-4xl font-bold">SHOP.CO</h1>

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

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <Search size={24} />
          </button>

          <button className="btn btn-circle border-none">
            <ShoppingCart />
          </button>

          {session?.user ? (
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 btn rounded-full"
              >
                <img
                  src={session.user.image || "https://i.ibb.co.com/5XJFV6yV/no-author.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline-block font-medium text-sm">
                  {session?.user?.name || session?.fullName}
                </span>
                <span>{showDropdown ? <ChevronUp /> : <ChevronDown />}</span>
              </div>

              {showDropdown && (
                <div className="absolute right-0 top-14 flex flex-col gap-3 bg-white shadow-md rounded-lg w-40 p-2 transition-all duration-300 z-50">
                  <Link
                    href="user-dashboard/personal-information"
                    className="w-full flex gap-3 cursor-pointer items-center text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <CircleUser size={20} />
                    Profile
                  </Link>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="w-full flex gap-3 btn items-center text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/get-in"
              className="hidden md:block btn btn-error text-white text-base px-6 py-2 rounded-3xl"
            >
              Get in
            </Link>
          )}

          <button
            className="md:hidden text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
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

          {session?.user ? (
            <div className="flex flex-col mt-2">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={session.user.image || "https://i.ibb.co.com/5XJFV6yV/no-author.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-sm">{session?.user?.name || session?.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/get-in"
              className="btn btn-error text-white text-base px-6 py-2 rounded-3xl mt-2"
            >
              Get in
            </Link>
          )}
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
