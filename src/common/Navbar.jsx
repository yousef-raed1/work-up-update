import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import "animate.css";

import Work_up_logo from "../assets/images/works/Work_up_logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>

      <nav className="absolute top-0 left-0 z-50 w-full px-4 py-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-5 py-4">

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-white hover:text-orange-400 transition duration-300"
          >
            <FaBars size={38} />
          </button>


          <div className="hidden lg:flex items-center gap-6 text-xl text-white">

            <a
              href="https://www.facebook.com/share/17zEctHLPV/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-blue-600" />
            </a>

            <a
              href="https://www.tiktok.com/@wupmedia?_r=1&_t=ZS-97wg0MDfL88"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="cursor-pointer transition duration-300 hover:-translate-y-1" />
            </a>

            <a
              href="https://www.instagram.com/wup.eg?igsh=MTBxc3lwcjhkYnBoYg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-pink-500" />
            </a>

          </div>


          <ul className="hidden lg:flex items-center gap-10 text-lg font-medium text-white">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "transition hover:text-orange-400"
                }
              >
                الرئيسية
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                className="transition hover:text-orange-400"
              >
                الخدمات
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/works"
                className="transition hover:text-orange-400"
              >
                الأعمال
              </NavLink>
            </li>

            <li>
              <a
                href="https://wa.me/2011111627007"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-orange-400"
              >
                التواصل
              </a>
            </li>

          </ul>


          <NavLink to="/" className="flex items-center scale-200 -translate-x-5">
            <img
              src={Work_up_logo}
              alt="Work Up Logo"
              className="h-12 md:h-14 w-auto object-contain transition duration-300 hover:scale-110"
            />
          </NavLink>

        </div>
      </nav>


      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>

        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-[#111] border-l border-white/10 shadow-2xl transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-6">

            <h2 className="text-2xl font-bold text-white">
              القائمة
            </h2>

            <button
              onClick={closeMenu}
              className="text-4xl text-white hover:text-orange-500 transition"
            >
              <FaTimes />
            </button>

          </div>

          <ul className="mt-8 flex flex-col">

            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block border-b border-white/10 px-8 py-5 text-lg transition ${isActive
                    ? "bg-orange-500 text-white"
                    : "text-white hover:bg-white/10 hover:text-orange-400"
                  }`
                }
              >
                الرئيسية
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                onClick={closeMenu}
                className="block border-b border-white/10 px-8 py-5 text-lg text-white transition hover:bg-white/10 hover:text-orange-400"
              >
                الخدمات
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/works"
                onClick={closeMenu}
                className="block border-b border-white/10 px-8 py-5 text-lg text-white transition hover:bg-white/10 hover:text-orange-400"
              >
                الأعمال
              </NavLink>
            </li>

            <li>
              <a
                href="https://wa.me/2011111627007"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block border-b border-white/10 px-8 py-5 text-lg text-white transition hover:bg-white/10 hover:text-orange-400"
              >
                التواصل
              </a>
            </li>

          </ul>

          <div className="mt-auto px-8 pt-10">

            <h3 className="mb-5 text-lg text-gray-400">
              تابعنا
            </h3>

            <div className="flex gap-5 text-3xl text-white">
              <a
                href="https://www.facebook.com/share/17zEctHLPV/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-blue-600" />
              </a>

              <a
                href="https://www.tiktok.com/@wupmedia?_r=1&_t=ZS-97wg0MDfL88"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="cursor-pointer transition duration-300 hover:-translate-y-1" />
              </a>

              <a
                href="https://www.linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-sky-500" />
              </a>

              <a
                href="https://www.instagram.com/wup.eg?igsh=MTBxc3lwcjhkYnBoYg=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="cursor-pointer transition duration-300 hover:-translate-y-1 hover:text-pink-500" />
              </a>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}