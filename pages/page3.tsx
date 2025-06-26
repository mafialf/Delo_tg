import React from 'react';
import { useRouter } from 'next/router';

const Page3: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleMapClick = () => {
    router.push('/page4');
  };

  const handleAppointmentsClick = () => {
    router.push('/page5');
  };

  const handleSubscribe = () => {
    const channelUrl = process.env.TELEGRAM_CHANNEL_URL;
    if (channelUrl) {
      window.Telegram.WebApp.openLink(channelUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-700 to-gray-500 text-white font-sans p-4">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
        DeLo
      </h1>

      <button
        onClick={handleMapClick}
        className="relative px-8 py-4 mb-6 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      >
        Искать мастера на карте
      </button>
      <button
        onClick={handleAppointmentsClick}
        className="relative px-8 py-4 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 bg-gradient-to-r from-green-400 to-teal-500 text-white"
      >
        Мои записи
      </button>
      <button
        onClick={handleSubscribe}
        className="relative px-8 py-4 w-full max-w-md text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      >
        Подписаться
      </button>
    </div>
  );
};

export default Page3;