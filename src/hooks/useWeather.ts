import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../store/weatherSlice';
import { RootState } from '../store';
import { WeatherData, WeatherApiError } from '../types/weatherTypes';

const API_KEY = '180e93bffdf1a20059bdb1d6e9a36f91'; // Your API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const useWeather = (city: string) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      dispatch(fetchWeatherStart());
      try {
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);

        if (!response.ok) {
          const errorData: WeatherApiError = await response.json();
          throw new Error(errorData.message || 'City not found');
        }

        const weatherData: WeatherData = await response.json();
        dispatch(fetchWeatherSuccess(weatherData));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
        dispatch(fetchWeatherFailure(errorMessage));
      }
    };

    fetchWeather();
  }, [city, dispatch]);

  return { data, loading, error };
};