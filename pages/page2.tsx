import React from 'react';
import { useRouter } from 'next/router';

const Page2: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/page3');
  };

  const handleMasterRegister = () => {
    router.push('/page6');
  };

  const handleMasterProfile = () => {
    router.push('/page7');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        DeLo
      </h1>
      <button
        onClick={handleLogin}
        className="relative px-12 py-6 text-xl font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      >
        Войти
      </button>
      <div className="mt-auto w-full flex justify-between items-center mt-12 text-sm text-gray-300">
        <button
          onClick={handleMasterRegister}
          className="hover:text-gray-100 transition-colors cursor-pointer"
        >
          Регистрация мастера
        </button>
        <button
          onClick={handleMasterProfile}
          className="hover:text-gray-100 transition-colors cursor-pointer"
        >
          ЛК мастера
        </button>
      </div>
    </div>
  );
};

export default Page2;