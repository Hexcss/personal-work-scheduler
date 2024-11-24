'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { MdAccountCircle } from 'react-icons/md';

export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    signOut();
  };

  const emailParts = session?.user?.email?.split('@') || ['', ''];

  return (
    <header className="w-full px-6 py-2 bg-blue-700 text-white shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Work Scheduler</h1>

      {session && (
        <div className="relative">
          {/* User Icon */}
          <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2 focus:outline-none hover:bg-blue-800 p-2 rounded-full"
          >
            <MdAccountCircle size={32} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-gray-800 rounded-md shadow-lg z-10">
              <div className="px-4 py-3 border-b">
                <p className="font-medium text-gray-900 truncate">
                  {emailParts[0]}
                </p>
                <p className="text-sm text-gray-500">{emailParts[1]}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-700 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
