import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { 
  CheckCircle, 
  ListTodo, 
  PlusCircle, 
  Settings 
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../../components/ThemeToggle';

export default function TabLayout() {
  const theme = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          headerRight: () => (
            <View style={styles.headerRight}>
              <ThemeToggle />
            </View>
          ),
          tabBarIcon: ({ color }) => <ListTodo size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color }) => <PlusCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 16,
  },
});