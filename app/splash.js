import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';

export default function SplashScreen() {
  const theme = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  
  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Navigate to main screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <CheckCircle size={80} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>TaskMaster</Text>
        <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
          Stay organized, get things done
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
});