import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Page1: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/page2');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        DeLo
      </h1>
      <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: "0%" }}></div>
      </div>
      <p className="mt-12 text-lg font-light italic text-gray-300">мяу-мяу</p>
    </div>
  );
};

export default IndexPage;