// pages/page10.tsx

'use client';

import React, { useState } from 'react';

export default function App() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    if (!date || !time) return;
    setSlots([...slots, { date, time }]);
  };

  const submitSlots = async () => {
    try {
      console.log('Submitting slots:', slots);
      alert('Расписание выложено.');
      window.location.href = "#/page11";
    } catch (error) {
      console.error('Ошибка добавления слотов:', error);
      alert('Ошибка добавления слотов.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans p-6">
      {/* Код вашего компонента */}
    </div>
  );
}

export default Page10;
