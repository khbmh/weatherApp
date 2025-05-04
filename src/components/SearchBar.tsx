import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherStart, clearSearchHistory } from '../store/weatherSlice';

interface SearchBarProps {
  onSearch: (city: string) => void;
  searchHistory: string[];
}

const SearchBar = ({ onSearch, searchHistory }: SearchBarProps) => {
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
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength={2}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={city.trim().length < 2}
        >
          Search
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-gray-500">Recent searches:</h3>
            <button
              onClick={handleClearHistory}
              className="text-xs cursor-pointer text-red-500 hover:text-red-700"
            >
              Clear history
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => onSearch(item)}
                className="px-3 cursor-pointer py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
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