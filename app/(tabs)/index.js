import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import TaskList from '../../components/TaskList';
import { useTheme } from '../../hooks/useTheme';

export default function TasksScreen() {
  const theme = useTheme();
  const tasks = useSelector((state) => state.tasks.tasks);
  
  // Count completed and active tasks
  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {tasks.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card, ...theme.shadow.sm }]}>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>
              {activeCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
              Active
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.colors.card, ...theme.shadow.sm }]}>
            <Text style={[styles.statValue, { color: theme.colors.accent }]}>
              {completedCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
              Completed
            </Text>
          </View>
        </View>
      )}
      
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
});