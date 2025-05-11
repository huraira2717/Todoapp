import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../constants/theme';

export const useTheme = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  return themeMode === 'dark' ? darkTheme : lightTheme;
};