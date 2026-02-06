import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_PRIMARY_COLOR = '#8b5cf6'; // Purple
const STORAGE_KEY = 'deltav3-primary-color';

function hexToOklch(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Simple approximation for OKLCH conversion
  // For a more accurate conversion, you'd use a proper color space library
  // This is a simplified version that works reasonably well for UI colors
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const c = Math.sqrt(Math.pow(r - l, 2) + Math.pow(g - l, 2) + Math.pow(b - l, 2)) * 0.4;
  
  // Calculate hue
  let h = 0;
  if (c > 0.0001) {
    const rDiff = r - l;
    const gDiff = g - l;
    const bDiff = b - l;
    h = Math.atan2(gDiff, rDiff) * (180 / Math.PI);
    if (h < 0) h += 360;
  }

  return `${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)}`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColorState] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || DEFAULT_PRIMARY_COLOR;
  });

  const setPrimaryColor = (color: string) => {
    setPrimaryColorState(color);
    localStorage.setItem(STORAGE_KEY, color);
  };

  const resetTheme = () => {
    setPrimaryColor(DEFAULT_PRIMARY_COLOR);
  };

  useEffect(() => {
    const oklch = hexToOklch(primaryColor);
    document.documentElement.style.setProperty('--primary', oklch);
    
    // Also update ring color to match
    document.documentElement.style.setProperty('--ring', oklch);
    
    // Update sidebar primary to match
    document.documentElement.style.setProperty('--sidebar-primary', oklch);
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
