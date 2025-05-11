import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

const EmptyState = () => {
  const theme = useTheme();
  const bounce = new Animated.Value(0);
  
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);
  
  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <CheckCircle size={64} color={theme.colors.primary} />
      </Animated.View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>
        No tasks yet
      </Text>
      
      <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
        Add your first task using the button below
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default EmptyState;