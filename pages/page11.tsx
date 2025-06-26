import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page11: React.FC = () => {
  const [slots, setSlots] = useState([]);
  const router = useRouter();
  const telegramUsername = router.query.master as string;

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const response = await fetch('/api/appointments/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ master_telegram_username: telegramUsername })
      });

      if (!response.ok) {
        alert('Ошибка получения свободных слотов.');
        return;
      }

      const data = await response.json();
      setSlots(data);
    };

    fetchAvailableSlots();
  }, [telegramUsername]);

  const selectTime = async (id: string) => {
    const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;

    const response = await fetch('/api/appointments/select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        client_telegram_id: telegramId
      })
    });

    if (!response.ok) {
      alert('Ошибка выбора времени.');
      return;
    }

    window.Telegram.WebApp.close();
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

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Выбрать время
      </h1>

      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-60 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Дата / Время</th>
              <th className="p-3 text-left">Действие</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-400 italic">
                  Нет свободных слотов
                </td>
              </tr>
            ) : (
              slots.map((slot) => (
                <tr key={slot.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3">
                    <div>{new Date(slot.date).toLocaleDateString()}</div>
                    <div className="font-medium mt-1 text-yellow-500">
                      {slot.time}
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => selectTime(slot.id)}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Выбрать
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page11;