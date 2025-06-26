'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Page10: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<{ date: string; time: string }[]>([]);
  const router = useRouter();

  const addSlot = () => {
    if (!date || !time) return;
    setSlots([...slots, { date, time }]);
  };

  const submitSlots = async () => {
    const username = window.Telegram.WebApp.initDataUnsafe.user.username;

    for (const slot of slots) {
      const response = await fetch('/api/appointments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          master_telegram_username: username,
          date: slot.date,
          time: slot.time
        })
      });

      if (!response.ok) {
        alert('Ошибка добавления слотов.');
        return;
      }
    }

    alert('Расписание выложено.');
    router.push('/page11');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Выложить расписание
      </h1>

      <div className="w-full max-w-md mb-6">
        <label htmlFor="date" className="block text-sm font-medium mb-1">Выберите дату</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full max-w-md mb-6">
        <label htmlFor="time" className="block text-sm font-medium mb-1">Выберите время</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={addSlot}
        disabled={!date || !time}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Добавить запись
      </button>

      <div className="mt-8 w-full max-w-2xl overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-60 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Дата / Время</th>
              <th className="p-3 text-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-400 italic">
                  Нет записей
                </td>
              </tr>
            ) : (
              slots.map((slot, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3">
                    <div>{new Date(slot.date).toLocaleDateString()}</div>
                    <div className="font-medium mt-1 text-yellow-500">
                      {slot.time}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-yellow-500">Нет</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={submitSlots}
        className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none"
      >
        Сохранить расписание
      </button>
    </div>
  );
};

export default Page10;