'use client';

import React, { useState, useEffect } from 'react';

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);

  // Mock user ID - in a real app this would come from auth context or local storage
  useEffect(() => {
    // Simulate getting user ID from local storage or other source
    const mockUserId = 123456; // Example user ID
    setUserId(mockUserId);
    
    fetchAppointments(mockUserId);
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll use mock data
      const mockData = [
        {
          id: 1,
          date: "2024-05-20",
          time: "14:00",
          master_telegram_username: "master1",
          status: "подтверждено"
        },
        {
          id: 2,
          date: "2024-05-22",
          time: "10:30",
          master_telegram_username: "master2",
          status: "ожидание подтверждения"
        }
      ];
      
      setAppointments(mockData);
    } catch (error) {
      alert("Ошибка получения записей.");
      console.error(error);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Вы уверены, что хотите отменить запись?")) return;

    try {
      // In a real app, you would make an API call here
      alert("Запись отменена.");
      window.location.reload();
    } catch (error) {
      alert("Не удалось отменить запись.");
      console.error(error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Мои записи
      </h1>

      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-60 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3 text-left">Дата / Время</th>
              <th className="p-3 text-left">Мастер</th>
              <th className="p-3 text-left">Статус</th>
              <th className="p-3 text-left">Действие</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400 italic">
                  Нет записей
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-600 hover:bg-gray-700 transition-colors">
                  <td className="p-3">
                    <div>{new Date(appointment.date).toLocaleDateString()}</div>
                    <div className={`font-medium mt-1 ${appointment.status === 'выполнено' ? 'text-green-500' : appointment.status === 'отменено' ? 'text-red-500' : 'text-yellow-500'}`}>
                      {appointment.time}
                    </div>
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://t.me/ ${appointment.master_telegram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      {appointment.master_telegram_username}
                    </a>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 inline-block rounded text-sm ${
                        appointment.status === 'выполнено'
                          ? 'bg-green-500 bg-opacity-30 text-green-300'
                          : appointment.status === 'отменено'
                            ? 'bg-red-500 bg-opacity-30 text-red-300'
                            : 'bg-yellow-500 bg-opacity-30 text-yellow-300'
                      }`}
                    >
                      {appointment.status || 'ожидание подтверждения'}
                    </span>
                  </td>
                  <td className="p-3">
                    {appointment.status !== 'подтверждено' && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Отменить запись
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page5;
