import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page5: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();
  const telegramId = parseInt(window.Telegram.WebApp.initDataUnsafe.user.id as string, 10);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await fetch('/api/appointments/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_telegram_id: telegramId }),
      }).then(res => res.json());

      if (error) {
        alert("Ошибка получения записей.");
        return;
      }

      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите отменить запись?")) return;

    const response = await fetch('/api/appointments/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      alert("Не удалось отменить запись.");
      return;
    }

    alert("Запись отменена.");
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
                      href={`https://t.me${appointment.master_telegram_username}`} 
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
};

export default Page5;