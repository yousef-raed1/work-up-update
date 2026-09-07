import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowUp,
  FaCode,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import work_up_logo from "../assets/images/works/Work_up_logo.png";

export default function Footer() {
  const socialLinks = [
    {
      icon: FaFacebookF,
      link: "https://facebook.com",
    },
    {
      icon: FaInstagram,
      link: "https://instagram.com",
    },
    {
      icon: FaTwitter,
      link: "https://twitter.com",
    },
    {
      icon: FaLinkedinIn,
      link: "https://linkedin.com",
    },
  ];

  const quickLinks = [
    {
      name: "الرئيسية",
      path: "/",
    },
    {
      name: "الخدمات",
      path: "/services",
    },
    {
      name: "الأعمال",
      path: "/projects",
    },
    {
      name: "تواصل معنا",
      path: "/contact",
    },
  ];

  const services = [
    "إدارة السوشيال ميديا",
    "تصميم المواقع",
    "التسويق الإلكتروني",
    "تصميم الهوية البصرية",
    "الإعلانات الممولة",
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050A14] text-gray-300">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-[180px]" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-right xl:grid-cols-4 xl:gap-8">
          <div className="xl:col-span-1">
            <img
              src={work_up_logo}
              alt="Work Up"
              className="mx-auto h-14 w-auto object-contain sm:h-16 md:mx-0 lg:h-20"
            />

            <p className="mx-auto mt-4 max-w-sm leading-7 text-gray-400 md:mx-0">
              Work-Up هي وكالة متخصصة في التسويق الإلكتروني وتصميم المواقع
              وبناء الهوية البصرية، ونساعد الشركات على زيادة المبيعات
              وتحقيق نمو حقيقي من خلال حلول رقمية احترافية.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:bg-green-500 hover:text-black"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              روابط سريعة
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name} className="list-none">
                  <NavLink
                    to={item.path}
                    className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:text-green-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              خدماتنا
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center justify-center gap-2 text-sm md:justify-start"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <span className="transition-colors duration-300 hover:text-green-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold text-white">
              تواصل معنا
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 md:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-lg text-green-400">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    العنوان
                  </p>

                  <h4 className="text-sm font-semibold text-white">
                    الزقازيق شارع المحافظ
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 md:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-lg text-green-400">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    الهاتف
                  </p>

                  <h4
                    dir="ltr"
                    className="text-sm font-semibold text-white"
                  >
                    +20 10 05 61 56 86
                  </h4>
                </div>
              </div>

              <a
                href="https://wa.me/201005615686"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-5 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(34,197,94,.35)]"
              >
                <FaWhatsapp className="text-xl" />
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>

        <div className="my-9 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

<div className="flex flex-col items-center justify-between gap-3 md:flex-row">
  <div className="flex items-center gap-2 text-center md:text-right">
    <h4 className="text-sm font-bold text-white">
      Work-Up
    </h4>

    <span className="text-white/20">|</span>

    <p className="text-xs text-gray-500">
      © {new Date().getFullYear()} Work-Up - جميع الحقوق محفوظة.
    </p>
  </div>



  <button
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-black shadow-md"
  >
    <FaArrowUp className="text-sm" />
  </button>
</div>

<div className="mt-3 border-t border-white/5 pt-3">
  <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-3">
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <FaCode className="text-green-500" />

<span className="flex items-center gap-1 text-xs text-gray-500">

  <span>
    تصميم
  </span>

  <span className="font-bold text-white">
    (Apex)
  </span>

  <span>
    وبرمجة
  </span>
</span>    </div>

    <span className="hidden text-white/10 sm:block">|</span>

    <p className="text-[11px] text-gray-600">
      تم تصميم وتطوير البرمجيات الخاصة بالموقع بواسطة يوسف رائد
    </p>

    <span className="hidden text-white/10 sm:block">|</span>

    <a
      href="mailto:youseffrontend@gmail.com"
      className="text-[11px] transition hover:text-green-400"
    >
      youseffrontend@gmail.com
    </a>

    <span className="hidden text-white/10 sm:block">|</span>

    <a
      href="https://wa.me/201208630335"
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      className="text-[11px] transition hover:text-green-400"
    >
      01208630335
    </a>
  </div>
</div>
      </div>
    </footer>
  );
}