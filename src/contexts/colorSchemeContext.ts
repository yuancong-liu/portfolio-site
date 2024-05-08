import { createContext, useContext } from 'react';

type ColorScheme = 'light' | 'dark';

type ColorSchemeContextType = {
  preferredColorScheme?: ColorScheme;
  colorScheme?: ColorScheme;
  setColorScheme?: (colorScheme: 'light' | 'dark') => void;
};

export const ColorSchemeContext = createContext<ColorSchemeContextType>({});

export const useColorSchemeContext = () => useContext(ColorSchemeContext);
