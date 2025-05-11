import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import { updateSystemTheme } from '../store/themeSlice';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  
  // Monitor system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      store.dispatch(updateSystemTheme(colorScheme || 'light'));
    });

    
    return () => subscription.remove();
  }, []);
  
  return (
    <Provider store={store}>
      <StatusBarController />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
}

// Separate component to use Redux hooks
function StatusBarController() {
  const themeMode = store.getState().theme.mode;
  return <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />;
}