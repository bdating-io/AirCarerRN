// FontSizeContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store';

const MAX_FONT_SIZE = 24;
const MIN_FONT_SIZE = 12;

interface FontSizeContextProps {
  fontSize: number;
  changeFontSize: (fontSize: number) => void;
}

const FontSizeContext = createContext<FontSizeContextProps | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(14);

  useEffect(() => {
    const fetchFontSize = async () => {
      const storedFontSize = await SecureStorage.getItemAsync('fontSize');
      if (storedFontSize) {
        setFontSize(parseInt(storedFontSize));
      }
    };

    fetchFontSize();
  }, []);

  const changeFontSize = (fontSize: number) => {
    let font = fontSize;
    if (font > MAX_FONT_SIZE) {
        font = MAX_FONT_SIZE;
    } else if (fontSize < MIN_FONT_SIZE) {
        font = MIN_FONT_SIZE;
    }
    setFontSize(font);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = React.useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};