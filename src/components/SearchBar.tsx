import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherStart, clearSearchHistory } from '../store/weatherSlice';

interface SearchBarProps {
  loading: boolean;
  onSearch: (city: string) => void;
  searchHistory: string[];
}

const SearchBar = ({ loading, onSearch, searchHistory }: SearchBarProps) => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim().length >= 2) {
      dispatch(fetchWeatherStart());
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          minLength={2}
          required
        />
        <button
          type="submit"
          className="disabled:opacity-50 px-4 py-2 lg:mr-0 cursor-pointer bg-blue-600 dark:bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          disabled={city.trim().length < 2 || loading}
        >
          {loading ? (
            <span className="inline-block mx-4 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-200"></span>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="mb-4 lg:mr-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Recent searches:
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-xs cursor-pointer text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
            >
              Clear history
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => onSearch(item)}
                className="px-3 cursor-pointer py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;