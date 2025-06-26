import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page12: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const telegramUsername = window.Telegram.WebApp.initDataUnsafe.user.username;
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch('/api/appointments/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ master_telegram_username: telegramUsername })
      });

      if (!response.ok) {
        alert('Ошибка получения записей.');
        return;
      }

      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const handleConfirm = async (id: string) => {
    const response = await fetch('/api/appointments/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      alert('Ошибка подтверждения.');
      return;
    }

    alert('Запись подтверждена.');
    window.location.reload();
  };

  const handleReject = async (id: string) => {
    const response = await fetch('/api/appointments/reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      alert('Ошибка удаления.');
      return;
    }

    alert('Запись удалена.');
    window.location.reload();
  };

  const handleComplete = async (id: string) => {
    const response = await fetch('/api/appointments/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      alert('Ошибка завершения.');
      return;
    }

    alert('Процедура выполнена.');
    window.location.reload();
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
        Мои клиенты
      </h1>

      <div className="w-full max-w-2xl overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-60 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Дата / Время</th>
              <th className="p-3 text-left">Клиент</th>
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
                <tr key={appointment.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3">
                    <div>{new Date(appointment.date).toLocaleDateString()}</div>
                    <div className={`font-medium mt-1 ${appointment.status === 'выполнено' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {appointment.time}
                    </div>
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://t.me${appointment.client_telegram_id}`} 
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      #{appointment.client_telegram_id}
                    </a>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 inline-block rounded text-sm ${
                        appointment.status === 'выполнено'
                          ? 'bg-green-500 bg-opacity-30 text-green-300'
                          : 'bg-yellow-500 bg-opacity-30 text-yellow-300'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-4">
                      {appointment.status === 'ожидание подтверждения' && (
                        <button
                          onClick={() => handleConfirm(appointment.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md focus:outline-none"
                        >
                          Подтвердить
                        </button>
                      )}

                      {(appointment.status === 'ожидание подтверждения' || appointment.status === 'подтверждено') && (
                        <button
                          onClick={() => handleComplete(appointment.id)}
                          className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md focus:outline-none"
                        >
                          Выполнить
                        </button>
                      )}

                      {appointment.status === 'ожидание подтверждения' && (
                        <button
                          onClick={() => handleReject(appointment.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-md focus:outline-none"
                        >
                          Отклонить
                        </button>
                      )}
                    </div>
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

export default Page12;