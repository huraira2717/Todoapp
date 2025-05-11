import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});