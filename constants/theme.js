import { Appearance } from 'react-native';

const defaultMode = Appearance.getColorScheme() || 'light';

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#3E64FF',
    secondary: '#5A73FC',
    accent: '#FF5E62',
    background: '#F7F9FC',
    card: '#FFFFFF',
    text: '#1F2937',
    subtext: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    priority: {
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#10B981',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#5A73FC',
    secondary: '#3E64FF',
    accent: '#FF7A7C',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    subtext: '#9CA3AF',
    border: '#374151',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    priority: {
      high: '#F87171',
      medium: '#FBBF24',
      low: '#34D399',
    }
  },
  spacing: lightTheme.spacing,
  radius: lightTheme.radius,
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export const getTheme = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

export default {
  light: lightTheme,
  dark: darkTheme,
  default: defaultMode,
  getTheme,
};