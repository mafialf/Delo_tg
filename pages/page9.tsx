'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Page9: React.FC = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [locationType, setLocationType] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const router = useRouter();

  useEffect(() => {
    const username = window.Telegram.WebApp.initDataUnsafe.user.username;

    const fetchMaster = async () => {
      const response = await fetch('/api/masters/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ telegram_username: username })
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data) {
        setName(data.name);
        setCity(data.city);
        setLocationType(data.location_type);
        setServices(data.services);
        setExperience(data.experience);
        setTelegramUsername(data.telegram_username);
        setAboutMe(data.about_me || '');
      }
    };

    fetchMaster();
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('/api/master/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        city,
        location_type: locationType,
        services,
        experience,
        about_me: aboutMe
      })
    });

    if (!response.ok) {
      alert('Ошибка сохранения данных.');
      return;
    }

    alert('Данные обновлены.');
    router.push('/page7');
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

      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Редактировать данные
      </h1>

      <form className="w-full max-w-2xl space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Город"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="home"
              checked={locationType === 'home'}
              onChange={() => setLocationType('home')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">На дому</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="salон"
              checked={locationType === 'salон'}
              onChange={() => setLocationType('salон')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Салон</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["manicure", "eyelashes", "epilation"].map((service) => (
            <label key={service} className="inline-flex items-center p-3 bg-gray-800 bg-opacity-60 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <input
                type="checkbox"
                value={service}
                checked={services.includes(service)}
                onChange={(e) =>
                  e.target.checked
                    ? setServices([...services, service])
                    : setServices(services.filter((s) => s !== service))
                }
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="text-base ml-2">{service}</span>
            </label>
          ))}
        </div>

        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Стаж работы"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={telegramUsername}
          onChange={(e) => setTelegramUsername(e.target.value)}
          placeholder="Telegram аккаунт"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="О себе"
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] active:translate-y-[0px] active:shadow-md focus:outline-none"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default Page9;