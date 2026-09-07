import React from "react";
import { NavLink } from "react-router-dom";

import logo_upwork from '../../assets/images/works/Work_up_logo.png'

import {
  FaHome,
  FaBriefcase,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaRProject,
} from "react-icons/fa";

export default function Sidedash({ isOpen, onClose }) {
  const menuItems = [
    {
      title: "الرئيسية (مشاريع)",
      icon: <FaHome />,
      path: "/home_projjjject",
    },

    {
      title: "الأعمال (مشاريع)",
      icon: <FaBriefcase />,
      path: "/workkkkk_-proJect",
    },

    {
      title: "الخدمات",
      icon: <FaBriefcase />,
      path: "/serVvvviceS",
    },

    {
      title: "لماذا نحن",
      icon: <FaBriefcase />,
      path: "/WhyuuuSS",
    },
  ];

  return (
    <>

      {isOpen && (
        <div
          onClick={onClose}
          className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        ></div>
      )}


      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-[#111827]
          text-white
          z-50
          shadow-2xl

          transition-transform
          duration-300
          ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >


        <div
          className="
            h-24
            px-8
            flex
            items-center
            justify-between
            border-b
            border-white/10
          "
        >

          <div className="w-60 h-28 flex items-center justify-center overflow-hidden">
            <img
              src={logo_upwork}
              alt="Work-Up Logo"
              className="w-full h-full object-contain scale-125"
            />
          </div>



          <button
            onClick={onClose}
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-white
              hover:bg-white/10
              text-xl
              transition
            "
          >
            <FaTimes />
          </button>

        </div>



        <nav className="p-6 space-y-4">


          <p
            className="
              text-xs
              font-bold
              tracking-widest
              text-gray-500
              px-4
              mb-6
            "
          >
            MAIN MENU
          </p>



          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path === "/dashboard"}

              className={({ isActive }) =>
                `
                flex
                items-center
                gap-5
                px-5
                py-4
                rounded-2xl

                text-base
                font-medium

                transition-all
                duration-300
                group

                ${isActive
                  ? `
                      bg-gradient-to-r
                      from-[#532AAA]
                      to-[#00C0A9]

                      text-white

                      shadow-xl
                      shadow-purple-900/30

                      scale-[1.02]
                    `
                  : `
                      text-gray-400

                      hover:bg-white/5
                      hover:text-white

                      hover:translate-x-1
                    `
                }
                `
              }
            >


              <span
                className="
                  w-11
                  h-11
                  rounded-xl

                  flex
                  items-center
                  justify-center

                  bg-white/5

                  text-xl

                  transition-all
                  duration-300

                  group-hover:scale-110
                "
              >
                {item.icon}
              </span>



              <span>
                {item.title}
              </span>

            </NavLink>

          ))}

        </nav>



        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-6
          "
        >

          <div
            className="
              border-t
              border-white/10
              pt-6
              space-y-3
            "
          >


            <NavLink
              to="/dashboard/settings"
              onClick={onClose}

              className={({ isActive }) =>
                `
                flex
                items-center
                gap-5

                px-5
                py-4

                rounded-2xl

                text-base
                font-medium

                transition-all
                duration-300

                ${isActive
                  ? `
                      bg-white/10
                      text-white
                    `
                  : `
                      text-gray-400

                      hover:bg-white/5
                      hover:text-white

                      hover:translate-x-1
                    `
                }
                `
              }
            >

              <span
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/5

                  flex
                  items-center
                  justify-center

                  text-xl
                "
              >
                <FaCog />
              </span>

              <span>
                الإعدادات
              </span>

            </NavLink>



            <button
              className="
                w-full

                flex
                items-center
                gap-5

                px-5
                py-4

                rounded-2xl

                text-base
                font-medium

                text-red-400

                hover:bg-red-500/10
                hover:text-red-300

                hover:translate-x-1

                transition-all
                duration-300
              "
            >

              <span
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-red-500/5

                  flex
                  items-center
                  justify-center

                  text-xl
                "
              >
                <FaSignOutAlt />
              </span>

              <span>
                تسجيل الخروج
              </span>

            </button>

          </div>

        </div>

      </aside>
    </>
  );
} 