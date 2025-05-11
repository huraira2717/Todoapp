import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';
import { archiveCompletedTasks } from '../store/taskSlice';
import { PRIORITY_ORDER } from '../constants/priorities';
import { useTheme } from '../hooks/useTheme';
import EmptyState from './EmptyState';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Sort tasks by priority (high to low) and then completion status
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by priority
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  });
  
  // Check for tasks to archive every 15 minutes
 useEffect(() => {
    const checkArchivableInterval = setInterval(() => {
      dispatch(archiveCompletedTasks());
    }, 10 * 1000); // Check every 10 seconds
    
    // Clear interval when the component unmounts
    return () => clearInterval(checkArchivableInterval);
  }, [dispatch]);
  
  if (tasks.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <FlatList
      data={sortedTasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Task task={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 100, // Extra space at bottom for better UX
  },
});

export default TaskList;