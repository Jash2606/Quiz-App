// Components/ThemeToggle.js
import React from 'react';
import { useGlobalContext } from './context';

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useGlobalContext();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-2 rounded-full ${
        isDarkTheme ? '  bg-yellow-400' : 'bg-gray-800'
      }`}
    >
      {isDarkTheme ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;