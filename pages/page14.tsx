import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page14: React.FC = () => {
  const [logs, setLogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminActions = async () => {
      try {
        const { data, error } = await fetch('/api/admin/logs', {
          method: 'GET',
        }).then(res => res.json());

        if (error) {
          alert('Ошибка получения логов.');
          return;
        }

        setLogs(data);
      } catch (err) {
        console.error(err);
        alert('Произошла ошибка при загрузке логов.');
      }
    };

    fetchAdminActions();
  }, []);

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
        Логи действий админа
      </h1>

      <div className="w-full max-w-3xl overflow-x-auto">
        <table className="w-full table-auto bg-gray-800 bg-opacity-60 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Действие</th>
              <th className="p-3 text-left">Telegram админа</th>
              <th className="p-3 text-left">Telegram мастера</th>
              <th className="p-3 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400 italic">
                  Нет записей в логах
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3">
                    <span className={`px-2 py-1 inline-block rounded text-sm ${
                      log.action === 'approve'
                        ? 'bg-green-500 bg-opacity-30 text-green-300'
                        : 'bg-red-500 bg-opacity-30 text-red-300'
                    }`}>
                      {log.action === 'approve' ? 'Одобрение' : 'Отклонение'}
                    </span>
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://t.me ${log.admin_telegram_id}`}
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      #{log.admin_telegram_id}
                    </a>
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://t.me ${log.master_telegram_username}`}
                      className="text-blue-300 hover:text-blue-200 underline"
                    >
                      {log.master_telegram_username}
                    </a>
                  </td>
                  <td className="p-3">
                    {new Date(log.created_at).toLocaleString()}
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

export default Page14;