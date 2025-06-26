import React, { useRef, useEffect } from 'react';

const Page13: React.FC = () => {
  const mapRef = useRef(null);
  const telegramUsername = window.Telegram.WebApp.initDataUnsafe.user.username;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = async () => {
      await window['ymaps'].ready();

      const map = new window['ymaps'].Map(mapRef.current, {
        center: [55.753994, 37.622093],
        zoom: 10,
        controls: ['zoomControl']
      });

      let placemark;

      // Проверяем, есть ли уже сохранённые координаты
      const { data } = await fetch('/api/master/location', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());

      if (data?.location_coords) {
        map.setCenter(data.location_coords);
        placemark = new window['ymaps'].Placemark(data.location_coords, {
          balloonContent: "Ваша локация"
        });
        map.geoObjects.add(placemark);
        return;
      }

      map.events.add('click', async (e) => {
        const coords = e.get('coords');

        if (placemark) {
          map.geoObjects.remove(placemark);
        }

        placemark = new window['ymaps'].Placemark(coords, {
          balloonContent: "Ваша локация"
        });

        map.geoObjects.add(placemark);
        map.setCenter(coords);

        await fetch('/api/master/location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ telegram_username: telegramUsername, location_coords: coords })
        });
      });
    };
    document.head.appendChild(script);
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

      <div id="map" ref={mapRef} className="w-full h-screen rounded-none overflow-hidden shadow-2xl border border-gray-600 relative"></div>

      <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black bg-opacity-60 px-4 py-2 rounded-lg shadow-md">
        Нажмите на карту, чтобы указать точку
      </div>
    </div>
  );
};

export default Page13;