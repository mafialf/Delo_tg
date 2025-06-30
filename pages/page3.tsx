'use client';

import React from 'react';

export default function App() {
  const handleSearchMaster = () => {
    window.location.href = "#/page4";
  };

  const handleMyBookings = () => {
    window.location.href = "#/page5";
  };

  const handleSubscribe = () => {
    window.open("https://t.me/your_channel_username ", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-700 to-gray-500 text-white font-sans p-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
        DeLo
      </h1>
      <button
        onClick={handleSearchMaster}
        className="relative px-8 py-4 mb-6 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
      >
        Искать мастера на карте
      </button>
      <button
        onClick={handleMyBookings}
        className="relative px-8 py-4 mb-6 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 bg-gradient-to-r from-green-400 to-teal-500 text-white"
      >
        Мои записи
      </button>
      <a
        href="https://t.me/your_channel_username "
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full max-w-md"
      >
        <button
          className="relative px-8 py-4 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
        >
          Подписаться
        </button>
      </a>
    </div>
  );
}

export default Page3;
