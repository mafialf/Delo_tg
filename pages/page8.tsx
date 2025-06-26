'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Page8: React.FC = () => {
  const [master, setMaster] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMaster = async () => {
      const response = await fetch('/api/masters/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegram_username: router.query.master })
      });

      if (!response.ok) {
        alert('Мастер не найден.');
        return;
      }

      const data = await response.json();
      setMaster(data);
    };

    fetchMaster();
  }, [router.query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-700 to-gray-500 text-white font-sans p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Информация о мастере
      </h1>

      {master && (
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between">
            <span>Имя:</span>
            <span>{master.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Город:</span>
            <span>{master.city}</span>
          </div>
          <div className="flex justify-between">
            <span>Место приёма:</span>
            <span>{master.location_type}</span>
          </div>
          <div className="flex justify-between">
            <span>Услуги:</span>
            <span>{master.services.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span>Стаж:</span>
            <span>{master.experience}</span>
          </div>
          <div className="flex justify-between">
            <span>Telegram:</span>
            <a
              href={`https://t.me${master.telegram_username}`} 
              className="text-blue-300 hover:text-blue-200 underline"
            >
              {master.telegram_username}
            </a>
          </div>
          <div className="flex justify-between mt-4">
            <span>Адрес:</span>
            <a
              href="/page4"
              className="text-blue-300 hover:text-blue-200 underline"
            >
              Посмотреть на карте
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => router.push(`/page11?master=${router.query.master}`)}
        className="mt-auto w-full max-w-md px-8 py-6 mt-10 text-xl font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none bg-gradient-to-r from-green-500 to-teal-600 text-white"
      >
        Записаться
      </button>
    </div>
  );
};

export default Page8;