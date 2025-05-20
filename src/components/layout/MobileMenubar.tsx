"use client";
import { useState } from "react";

export interface MenuItem {
  title: string;
  url?: string;
  child?: MenuItem;
  className?: string;
}

export default function MobileMenubar({
  menuItems = [],
}: {
  menuItems?: Array<MenuItem>;
}) {
  const [isToggle, setToggle] = useState(false);

  return (
    <div className="md:hidden flex relative">
      <button onClick={() => setToggle(!isToggle)}>
        <img src="/menu.svg" className="ico ico-bars-3 w-5 h-5" alt="Menu" />
      </button>
      <div
        className={`fixed left-0 top-0 bg-slate-800/20 h-screen w-[19rem] z-10 transform ${
          isToggle ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="sticky w-full md:w-1/2 h-screen text-black bg-white shadow-md p-5">
          <div className="flex flex-row justify-between pb-5 items-center">
            <h3 className="text-[#222222] text-[16px] font-bold">MENU</h3>
            <button
            className="text-3xl absolute top-4 right-4 text-black"
            onClick={() => setToggle(false)}
          >
            &times;
          </button>
          </div>
          <hr />
          <ul className="flex flex-col gap-4 w-full">
            {menuItems.map((x, key) => (
              <li key={key}>
                {x.url ? (
                  <>
                    <a
                      className="flex w-full py-3"
                      onClick={() => setToggle(false)}
                      href={x.url}
                    >
                      <h3 className="text-sm md:text-[14px] text-[#222222]">
                        {x.title}
                      </h3>
                    </a>
                    <hr />
                  </>
                ) : (
                  <button onClick={() => setToggle(false)}>
                    <h3>{x.title}</h3>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
