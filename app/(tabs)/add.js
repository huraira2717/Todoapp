import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskForm from '../../components/TaskForm';
import { useTheme } from '../../hooks/useTheme';

export default function AddTaskScreen() {
  const theme = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TaskForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});