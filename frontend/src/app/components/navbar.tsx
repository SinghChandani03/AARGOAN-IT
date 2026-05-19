"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {

   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   const navItems = [
      { name: "Dashboard", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: "Tasks", path: "/tasks" }
   ];

   return (
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
         <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-6">

               {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                     <Link
                        key={item.path}
                        href={item.path}
                        className={`text-sm font-medium transition ${
                           isActive
                              ? "text-black border-b-2 border-black pb-1"
                              : "text-gray-500 hover:text-black"
                        }`}
                     >
                        {item.name}
                     </Link>
                  );
               })}
            </div>
            <button
               onClick={() => setOpen(!open)}
               className="md:hidden flex flex-col gap-1"
            >
               <span className="w-6 h-0.5 bg-black"></span>
               <span className="w-6 h-0.5 bg-black"></span>
               <span className="w-6 h-0.5 bg-black"></span>
            </button>
         </div>

         {open && (
            <div className="md:hidden px-4 pb-4 border-t border-gray-200 bg-white">
               <div className="flex flex-col gap-3 pt-3">
                  {navItems.map((item) => {
                     const isActive = pathname === item.path;
                     return (
                        <Link
                           key={item.path}
                           href={item.path}
                           onClick={() => setOpen(false)}
                           className={`text-sm font-medium ${
                              isActive
                                 ? "text-black"
                                 : "text-gray-500"
                           }`}
                        >
                           {item.name}
                        </Link>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};

export default Navbar;