import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../types/weatherTypes';

// Helper functions for localStorage
const loadSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem('weatherSearchHistory');
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

const saveSearchHistory = (history: string[]) => {
  localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
};

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchHistory: string[];
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  searchHistory: loadSearchHistory(), // Initialize from localStorage
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<WeatherData>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      
      // Update search history
      if (action.payload.name) {
        const cityName = action.payload.name;
        state.searchHistory = [
          cityName,
          ...state.searchHistory.filter(city => city !== cityName),
        ].slice(0, 5); // Keep only 5 most recent
        
        // Save to localStorage
        saveSearchHistory(state.searchHistory);
      }
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
      localStorage.removeItem('weatherSearchHistory');
    },
  },
});

export const { 
  fetchWeatherStart, 
  fetchWeatherSuccess, 
  fetchWeatherFailure,
  clearSearchHistory
} = weatherSlice.actions;
export default weatherSlice.reducer;