import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const initialState = {
  mode: Appearance.getColorScheme() || 'light',
  isSystemTheme: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      state.isSystemTheme = false;
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      state.isSystemTheme = false;
    },
    useSystemTheme: (state) => {
      state.mode = Appearance.getColorScheme() || 'light';
      state.isSystemTheme = true;
    },
    updateSystemTheme: (state, action) => {
      if (state.isSystemTheme) {
        state.mode = action.payload;
      }
    },
  },
});

export const { 
  toggleTheme, 
  setTheme, 
  useSystemTheme,
  updateSystemTheme,
} = themeSlice.actions;

export default themeSlice.reducer;