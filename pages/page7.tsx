'use client';

import React from 'react';

export default function App() {
  const handleBack = () => {
    window.history.back();
  };

  const navigateToPage12 = () => {
    window.location.href = "#/page12";
  };

  const navigateToPage10 = () => {
    window.location.href = "#/page10";
  };

  const navigateToPage9 = () => {
    window.location.href = "#/page9";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-700 to-gray-500 text-white font-sans p-6">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
        Личный кабинет мастера
      </h1>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={navigateToPage12}
          className="w-full px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          Записи
        </button>
        <button
          onClick={navigateToPage10}
          className="w-full px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none bg-gradient-to-r from-green-500 to-teal-600 text-white"
        >
          Выложить расписание
        </button>
        <button
          onClick={navigateToPage9}
          className="w-full px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
        >
          Редактировать данные
        </button>
      </div>
    </div>
  );
}

export default Page7;
