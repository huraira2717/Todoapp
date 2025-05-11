import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Text } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const themeMode = useSelector((state) => state.theme.mode);
  
  const translateX = new Animated.Value(themeMode === 'dark' ? 28 : 0);
  
  const handleToggle = () => {
    Animated.timing(translateX, {
      toValue: themeMode === 'dark' ? 0 : 28,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    dispatch(toggleTheme());
  };
  
  const isDark = themeMode === 'dark';
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? theme.colors.primary + '30' : theme.colors.primary + '15',
        }
      ]}
      onPress={handleToggle}
      activeOpacity={0.8}
    >
      <View style={styles.toggleContainer}>
        <Animated.View
          style={[
            styles.toggleCircle,
            {
              backgroundColor: isDark ? theme.colors.primary : theme.colors.primary,
              transform: [{ translateX }],
            },
          ]}
        >
          {isDark ? (
            <Moon size={16} color="#FFFFFF" />
          ) : (
            <Sun size={16} color="#FFFFFF" />
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 20,
  },
  toggleContainer: {
    width: 56,
    height: 28,
    borderRadius: 20,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;