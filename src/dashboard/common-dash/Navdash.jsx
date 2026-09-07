import React from "react";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

export default function Navdash({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              bg-gray-100
              flex
              items-center
              justify-center
              text-gray-700
              hover:bg-gray-200
              transition
            "
          >
            <FaBars />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5 w-72">
            <FaSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="ابحث هنا..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button className="relative w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
            <FaBell />

            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-gray-800">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                مدير المتجر
              </p>
            </div>

            <FaUserCircle className="text-4xl text-[#532AAA]" />

          </div>

        </div>

      </div>
    </header>
  );
}