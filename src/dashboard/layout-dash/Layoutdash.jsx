import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navdash from "../common-dash/Navdash";
import Footerdash from "../common-dash/Footerdash";
import Sidedash from "../common-dash/Sidedash";

export default function Layoutdash() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidedash
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {/* Navbar */}
      <Navdash
        onMenuClick={() => setIsOpen(true)}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 pt-20 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <div className="ml-0 lg:ml-72">
        <Footerdash />
      </div>

    </div>
  );
}