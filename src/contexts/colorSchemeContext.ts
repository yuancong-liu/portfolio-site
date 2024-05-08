import { createContext, useContext } from 'react';

type ColorScheme = 'light' | 'dark';

type ColorSchemeContextType = {
  preferredColorScheme?: ColorScheme;
  option: 'system' | ColorScheme;
  colorScheme?: ColorScheme;
  setColorScheme?: (colorScheme: 'light' | 'dark') => void;
  setOption?: (option: 'system' | ColorScheme) => void;
};

export const ColorSchemeContext = createContext<ColorSchemeContextType>({
  option: 'system',
});

export const useColorSchemeContext = () => useContext(ColorSchemeContext);
