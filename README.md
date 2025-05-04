# Weather App

A responsive weather application built with **React.js**, **TypeScript**, **Redux**, and **Tailwind CSS**. This app displays real-time weather data for cities around the world, including temperature, weather conditions, wind speed, and more.

![Weather App Screenshot](https://i.ibb.co/SXbS8D7s/weatherapp.png)

## Live Demo

[Check out the live demo](https://weather-kb.netlify.app)

## Features

- **Current Weather Data**: Displays real-time weather data, including temperature, humidity, weather conditions, wind speed, and more.
- **City Search**: Easily search for weather information by city name.
- **Responsive Design**: The app adapts to all device sizes, from mobile to desktop.
- **Modern UI**: Clean and user-friendly interface with weather icons for better visualization.
- **Error Handling**: Displays helpful error messages if the search is invalid or the API request fails.
- **Loading States**: Provides visual feedback during data fetching to improve the user experience.
- **Search History**: Stores previously searched cities and shows a list for quick access (Bonus feature).
- **Dark Mode**: Toggle between light and dark themes for a personalized experience (Bonus feature).

## Technologies Used

- **React.js (v18+)**: JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed superset of JavaScript for better developer experience.
- **Redux Toolkit**: Simplified state management with Redux.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **OpenWeatherMap API**: Fetches real-time weather data.

## Installation

To get the project up and running locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/khbmh/weatherApp.git
````

2. Navigate to the project directory:

   ```bash
   cd weatherApp
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file at the root of the project and add the following environment variable:

   ```env
   VITE_API_KEY=your-openweathermap-api-key-here
   ```

   **Note**: Make sure to replace `your-openweathermap-api-key-here` with your actual OpenWeatherMap API key. You can obtain the API key by signing up at [OpenWeatherMap](https://openweathermap.org/).

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to see the app in action!

## Configuration

* **API Key**: Ensure you have your own API key from OpenWeatherMap. Store it in the `.env.local` file. Vite will automatically load the environment variable during the build process.

* **Dark Mode**: Toggle dark mode using the theme switch button in the app's header. This feature is controlled through React state and persists across page reloads using localStorage.

## Folder Structure

Here’s an overview of the main project structure:

```
src/
├── assets/                       # Static assets like images, fonts, icons, etc.
├── components/                   # React components
│   ├── DarkModeToggle.tsx         # Component for toggling dark mode
│   ├── Footer.tsx                # Footer component, likely contains app info and copyright
│   ├── SearchBar.tsx             # Component for searching cities and displaying weather
│   ├── WeatherDisplay.tsx        # Component that shows current weather details
│   ├── WeatherIcon.tsx           # Component that displays weather icons based on conditions
├── hooks/                        # Custom React hooks
│   └── useWeather.ts             # Custom hook for fetching and managing weather data
├── store/                        # Redux-related files for state management
│   ├── index.ts                  # Redux store setup and configuration
│   └── weatherSlice.ts           # Redux slice for managing weather data (state, actions, reducers)
├── types/                        # TypeScript types and interfaces for the app
│   └── weatherTypes.ts           # Type definitions for weather-related data
├── App.tsx                       # Main application component
└── Main.tsx                      # The main layout component, renders App with additional layout or routing

```

## Code Implementation

### `.env.local` Example

In your `.env.local` file, store your OpenWeatherMap API key like so:

```env
VITE_API_KEY=your-openweathermap-api-key-here
```
