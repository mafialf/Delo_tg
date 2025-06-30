'use client';

import React, { useState, useEffect } from 'react';

function Page11() {
  const [slots, setSlots] = useState([]);
  const [masterUsername, setMasterUsername] = useState('ivan_ivanov'); // Example username

  // Mock data fetching - in a real app you'd fetch this from an API
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        // In a real app, you would make an API call here
        const mockData = [
          {
            id: 1,
            date: "2025-05-15",
            time: "14:00"
          },
          {
            id: 2,
            date: "2025-05-16",
            time: "10:30"
          }
        ];
        
        setSlots(mockData);
      } catch (error) {
        alert('Ошибка получения свободных слотов.');
        console.error(error);
      }
    };

    fetchAvailableSlots();
  }, []);

  const selectTime = async (id) => {
    // In a real app, you would send the selection to your backend
    // Here we just simulate success
    try {
      alert("Вы успешно записались на выбранное время!");
      window.location.href = "#/page5"; // Redirect to bookings page
    } catch (error) {
      alert("Ошибка выбора времени.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6">
      <button
        onClick={() => window.history.back()}
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
