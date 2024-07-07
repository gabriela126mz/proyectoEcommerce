import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: { backgroundColor: '#4c4e57',color: '#fff'},
  dark: {  backgroundColor: '#333',color: '#fff' },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeContextValue = {
    theme,
    toggleTheme,
    styles: themes[theme],
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
