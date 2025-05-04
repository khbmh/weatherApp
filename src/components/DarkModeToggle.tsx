import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize after component mounts to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(saved ? JSON.parse(saved) : prefersDark);
  }, []);

  // Apply dark mode class and save preference
  useEffect(() => {
    if (!isMounted) return;

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode, isMounted]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Smooth rotation animation values
  const moonRotation = darkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0';
  const sunRotation = darkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100';

  if (!isMounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-10 h-10 flex items-center justify-center p-2 rounded-full cursor-pointer transition-colors duration-300"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun Icon (Light Mode) */}
      <div className={`absolute transition-all duration-500 ${sunRotation}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" />
          <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" strokeLinecap="round" />
        </svg>
      </div>

      {/* Moon Icon (Dark Mode) */}
      <div className={`absolute transition-all duration-500 ${moonRotation}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" />
        </svg>
      </div>
    </button>
  );
};

export default DarkModeToggle;