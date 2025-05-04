import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  const [validatedCity, setValidatedCity] = useState('');
  const { data, loading, error } = useWeather(validatedCity);
  const { searchHistory } = useSelector((state: RootState) => state.weather);

  const handleSearch = (city: string) => {
    if (city.trim().length < 2) return;
    setValidatedCity(city.trim());
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <nav className='flex justify-between items-center text-xl lg:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8'>
          <h1 className="">Weather App</h1>
          <DarkModeToggle />
        </nav>

        <SearchBar loading={loading} onSearch={handleSearch} searchHistory={searchHistory} />

        <WeatherDisplay
          data={data}
          loading={loading}
          error={error}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;