'use client'
import { useState } from "react";
interface WeatherResponse {
  city: string;
  date: string;
  temperature: number;
  description: string;
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Kazan');
  const [selectedDate, setSelectedDate] = useState('2026-01-16');

  const fetchWeather = async (city: string, date: string) => {
    setLoading(true);
    setWeather(null);
    setError(null);

    try {
      const res = await fetch(`https://first.orn1xx.ru/weather/${city}?date=${date}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch weather: ${res.status}`);
      }

      const data: WeatherResponse = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  // Обработчик смены города
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    fetchWeather(city, selectedDate);
  };

  // Обработчик смены даты
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    fetchWeather(selectedCity, date);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Погода</h1>

      {/* Панель управления */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Выберите город:</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleCityChange('Moscow')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCity === 'Moscow'
                    ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Москва
              </button>
              <button
                type="button"
                onClick={() => handleCityChange('Kazan')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCity === 'Kazan'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Казань
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Выберите дату:</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Состояние загрузки */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Загрузка данных о погоде...</p>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {error && (
        <div className="text-center py-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Данные о погоде */}
      {weather && !loading && (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Погода в {weather.city}</h2>
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600 mb-2">Прогноз на {weather.date}</p>
          </div>

          <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
            <div className="text-6xl font-bold text-blue-600">{weather.temperature} °C</div>
            <div className="text-2xl font-medium text-gray-700">{weather.description}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">Город:</p>
              <p className="text-gray-700">{weather.city}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Дата:</p>
              <p className="text-gray-700">{weather.date}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Температура:</p>
              <p className="text-gray-700">{weather.temperature} °C</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Описание:</p>
              <p className="text-gray-700">{weather.description}</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500 italic text-center">
            Данные получены клиентским fetch. В Network браузера видны прямые запросы к first.orn1xx.ru.
          </p>
        </div>
      )}
    </main>
  );
}
