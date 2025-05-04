import { FC } from 'react';

interface WeatherIconProps {
  iconCode?: string; // Make iconCode optional
  className?: string;
}

const WeatherIcon: FC<WeatherIconProps> = ({ iconCode, className = '' }) => {
  // Return null if no iconCode is provided
  if (!iconCode) {
    return null;
  }

  const getIconUrl = (code: string) => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
  };

  return (
    <img
      src={getIconUrl(iconCode)}
      alt="Weather icon"
      className={`w-20 shadow-2xl backdrop-blur-3xl bg-black/10 rounded-full h-20 ${className}`}
      onError={(e) => {
        // Fallback if image fails to load
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
};

export default WeatherIcon;