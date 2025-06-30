'use client';

import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.YANDEX_MAPS_API_KEY}`;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      window['ymaps'].ready(() => {
        const map = new window['ymaps'].Map('map', {
          center: [55.753994, 37.622093],
          zoom: 10,
          controls: ['zoomControl'],
        });

        // Mock data for masters (since we don't have real API)
        const mockMasters = [
          {
            id: 1,
            name: "Иван Иванов",
            location_coords: [55.753994, 37.622093],
            telegram_username: "ivan_ivanov"
          },
          {
            id: 2,
            name: "Мария Петрова",
            location_coords: [55.75, 37.63],
            telegram_username: "masha_petrova"
          }
        ];

        mockMasters.forEach(master => {
          const placemark = new window['ymaps'].Placemark(master.location_coords, {
            balloonContentHeader: master.name,
            balloonContentBody: `<a href=" https://t.me/ ${master.telegram_username}" target="_blank" rel="noopener noreferrer">Посмотреть профиль</a>`,
          }, {
            iconLayout: 'default#imageWithContent', 
            iconImageHref: '/marker.png',
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -40]
          });

          map.geoObjects.add(placemark);
        });
      });
    };
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-700 to-gray-500 text-white font-sans relative">
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div id="map" className="w-full h-screen rounded-none overflow-hidden shadow-2xl border border-gray-600 relative"></div>

      <div className="absolute top-4 left-4 text-white text-xl font-bold opacity-30 transform rotate-[-15deg] z-20">
        DeLo
      </div>
    </div>
  );
}

export default Page4;
