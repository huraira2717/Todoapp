import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { CheckCircle, Circle, Trash2 } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskCompletion, deleteTask } from '../store/taskSlice';
import { format } from 'date-fns';
import { PRIORITY_LABELS } from '../constants/priorities';
import { useTheme } from '../hooks/useTheme';

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const opacity = new Animated.Value(1);
  const scale = new Animated.Value(1);
  
  const handleToggleCompletion = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    dispatch(toggleTaskCompletion(task.id));
  };
  
  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(deleteTask(task.id));
    });
  };
  
  const priorityColor = theme.colors.priority[task.priority];
  
  return (
    <Animated.View
      style={[
        styles.container,
        theme.shadow.sm,
        { backgroundColor: theme.colors.card },
        { opacity, transform: [{ scale }] },
      ]}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={handleToggleCompletion}
        activeOpacity={0.7}
      >
        {task.completed ? (
          <CheckCircle color={theme.colors.primary} size={24} />
        ) : (
          <Circle color={theme.colors.subtext} size={24} />
        )}
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text },
            task.completed && styles.completedText,
          ]}
        >
          {task.name}
        </Text>
        
        <View style={styles.details}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {PRIORITY_LABELS[task.priority]}
            </Text>
          </View>
          
          {task.dueDate && (
            <Text style={[styles.dueDate, { color: theme.colors.subtext }]}>
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Trash2 color={theme.colors.error} size={20} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dueDate: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
  },
});

export default Task;