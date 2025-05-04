import { FC } from 'react';
import { WeatherData } from '../types/weatherTypes';
import WeatherIcon from './WeatherIcon';

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDisplay: FC<WeatherDisplayProps> = ({ data, loading, error }) => {
  // Loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        Search for a city to see weather data
      </div>
    );
  }

  // Calculate local time using the timezone offset
  const getLocalTime = (timestamp?: number) => {
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + (data.timezone * 1000));
  };

  // Format options
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Current local time
  const localTime = getLocalTime();
  
  // Convert pressure to inHg
  const pressureInHg = (data.main.pressure * 0.02953).toFixed(2);
  
  // Convert visibility to miles if available
  const visibilityInMiles = data.visibility ? (data.visibility / 1609).toFixed(1) : 'N/A';

  // Wind direction helper
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="bg-blue-50 backdrop-blur-sm rounded-xl shadow-md p-6 max-w-md mx-auto">
      {/* Header with location and time */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data.name}, {data.sys.country}</h2>
          <p className="text-gray-600">
            {localTime.toLocaleDateString([], dateOptions)}
          </p>
          <p className="text-gray-600 font-medium">
            Local Time: {localTime.toLocaleTimeString([], timeOptions)}
          </p>
          <p className="text-gray-500 capitalize mt-1">
            {data.weather[0].description}
          </p>
        </div>
        <WeatherIcon iconCode={data.weather[0].icon} />
      </div>

      {/* Main temperature display */}
      <div className="mt-4">
        <div className="flex items-center">
          <span className="text-5xl font-bold text-gray-800">
            {Math.round(data.main.temp)}°C
          </span>
          <div className="ml-4">
            <div className="text-sm text-gray-600">
              High: {Math.round(data.main.temp_max)}°C
            </div>
            <div className="text-sm text-gray-600">
              Low: {Math.round(data.main.temp_min)}°C
            </div>
          </div>
        </div>
        <div className="mt-1 text-gray-600">
          Feels like {Math.round(data.main.feels_like)}°C
        </div>
      </div>

      {/* Weather details grid */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-lg font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Wind</p>
          <p className="text-lg font-semibold">
            {data.wind.speed} m/s {data.wind.deg && `(${getWindDirection(data.wind.deg)})`}
          </p>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Pressure</p>
          <p className="text-lg font-semibold">
            {data.main.pressure} hPa ({pressureInHg} inHg)
          </p>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Visibility</p>
          <p className="text-lg font-semibold">
            {visibilityInMiles} miles
          </p>
        </div>
      </div>

      {/* Sun times */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Sunrise</p>
          <p className="text-lg font-semibold">
            {getLocalTime(data.sys.sunrise).toLocaleTimeString([], timeOptions)}
          </p>
        </div>
        <div className="bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Sunset</p>
          <p className="text-lg font-semibold">
            {getLocalTime(data.sys.sunset).toLocaleTimeString([], timeOptions)}
          </p>
        </div>
      </div>

      {/* Precipitation */}
      {data.rain && (
        <div className="mt-6 bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Rain (last hour)</p>
          <p className="text-lg font-semibold">
            {data.rain['1h'] || 0} mm
          </p>
        </div>
      )}

      {data.snow && (
        <div className="mt-6 bg-blue-50/50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Snow (last hour)</p>
          <p className="text-lg font-semibold">
            {data.snow['1h'] || 0} mm
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;