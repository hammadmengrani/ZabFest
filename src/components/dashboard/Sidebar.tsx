'use client';

import React, { useEffect, useState } from 'react';

interface SidebarItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all 
      ${active ? 'bg-blue-900' : 'hover:bg-blue-900'}`}
  >
    <span className="text-sm">{label}</span>
  </div>
);

interface SidebarSection {
  title: string;
  items: string[];
}

interface SidebarProps {
  sections: SidebarSection[];
  activeItem: string;
  setActiveItem: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeItem, setActiveItem }) => {
  const [storeInfo, setStoreInfo] = useState<{ ownerName: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('storeInfo');
    if (stored) {
      try {
        setStoreInfo(JSON.parse(stored));
      } catch (err) {
        console.error('Invalid storeInfo in localStorage');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('storeInfo');
    window.location.href = '/admin';
  };

  return (
    <div className="bg-blue-950 text-white w-64 h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">DASHBOARD</h1>

        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <p className="text-gray-300 uppercase text-xs mb-2">{section.title}</p>
            {section.items.map((item, i) => (
              <SidebarItem
                key={i}
                label={item}
                active={activeItem === item}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </div>
        ))}
      </div>

      {storeInfo && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="text-sm mb-2">{storeInfo.ownerName}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
