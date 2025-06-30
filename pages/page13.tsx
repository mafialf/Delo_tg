'use client';

import React, { useRef, useEffect } from 'react';

// Типы данных
interface LocationData {
  location_coords?: [number, number]; // Массив из двух чисел: [широта, долгота]
}

export default function Page13() {
  const mapRef = useRef<HTMLDivElement>(null);
  const telegramUsername = 'ivan_ivanov'; // Пример Telegram username

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = async () => {
      if (!window['ymaps']) return;

      await window['ymaps'].ready();

      if (!mapRef.current) return;

      const map = new window['ymaps'].Map(mapRef.current, {
        center: [55.753994, 37.622093],
        zoom: 10,
        controls: ['zoomControl'],
      });

      let placemark: window['ymaps'].Placemark | null = null;

      const mockLocationData: LocationData = {
        location_coords: [55.753994, 37.622093],
      };

      if (mockLocationData.location_coords) {
        map.setCenter(mockLocationData.location_coords);
        placemark = new window['ymaps'].Placemark(mockLocationData.location_coords, {
          balloonContent: "Ваша локация",
        });
        map.geoObjects.add(placemark);
        return;
      }

      map.events.add('click', async (e: any) => {
        const coords = e.get('coords');

        if (placemark) {
          map.geoObjects.remove(placemark);
        }

        placemark = new window['ymaps'].Placemark(coords, {
          balloonContent: "Ваша локация",
        });

        map.geoObjects.add(placemark);
        map.setCenter(coords);

        console.log('Saving location:', coords);
        alert("Локация сохранена!");
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
        className="absolute top-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div ref={mapRef} className="w-full h-screen rounded-none overflow-hidden shadow-2xl border border-gray-600 relative"></div>

      <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black bg-opacity-60 px-4 py-2 rounded-lg shadow-md z-10">
        Нажмите на карту, чтобы указать точку
      </div>
    </div>
  );
}
