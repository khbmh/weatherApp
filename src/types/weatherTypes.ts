export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country?: string;
  };
  timezone: number;
  visibility?: number;
  rain?: {
    '1h'?: number;
  };
  snow?: {
    '1h'?: number;
  };
  dt: number;
}

export interface WeatherApiError {
  cod: string | number;
  message: string;
}