import React from "react";

export default function Footerdash() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-5">

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} APEX. جميع الحقوق محفوظة.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="hover:text-[#532AAA] cursor-pointer">
            سياسة الخصوصية
          </span>

          <span className="hover:text-[#532AAA] cursor-pointer">
            الشروط والأحكام
          </span>
        </div>

      </div>

    </footer>
  );
}