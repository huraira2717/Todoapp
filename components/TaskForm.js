import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Modal,
  ScrollView,
} from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { useTheme } from '../hooks/useTheme';
import { PRIORITIES, PRIORITY_LABELS } from '../constants/priorities';
import { format } from 'date-fns';
import { router } from 'expo-router';

const TaskForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.MEDIUM);
  const [dueDate, setDueDate] = useState(null);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [modalVisible, setModalVisible] = useState(false);  // Manage modal visibility for priority dropdown

  const togglePriorityDropdown = () => {
    setModalVisible(!modalVisible);
  };

  const handlePrioritySelect = (selected) => {
    setPriority(selected);
    setModalVisible(false); // Close the modal after selecting priority
  };

  const handleDateSelect = (date) => {
    setDueDate(date);
    setShowDatePicker(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Task name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(addTask({
        name,
        priority,
        dueDate: dueDate ? dueDate.toISOString() : null,
      }));
      router.navigate('/'); // Navigate to the main page after adding task
    }
  };

  const priorityColor = theme.colors.priority[priority];

  // Fix: Display a range of 14 days from today
  const renderDatePicker = () => {
    if (!showDatePicker) return null;
    
    const days = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i); // Add i days to the current date
      return date;
    });
    
    return (
      <View style={[styles.datePickerContainer, { backgroundColor: theme.colors.card }]} >
        <Text style={[styles.datePickerTitle, { color: theme.colors.text }]}>
          Select Due Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((date) => (
            <TouchableOpacity
              key={date.toISOString()}
              style={[styles.dateOption, {
                backgroundColor: dueDate && date.toDateString() === dueDate.toDateString()
                  ? theme.colors.primary
                  : theme.colors.background,
              }] }
              onPress={() => handleDateSelect(date)}
            >
              <Text style={[styles.dateDay, {
                color: dueDate && date.toDateString() === dueDate.toDateString()
                  ? theme.colors.card
                  : theme.colors.text,
              }]}>
                {format(date, 'd')}
              </Text>
              <Text style={[styles.dateMonth, {
                color: dueDate && date.toDateString() === dueDate.toDateString()
                  ? theme.colors.card
                  : theme.colors.subtext,
              }]}>
                {format(date, 'MMM')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.closeDatePicker}
          onPress={() => setShowDatePicker(false)}
        >
          <Text style={[styles.closeText, { color: theme.colors.primary }]}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.form}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Task Name</Text>
        <TextInput
          style={[styles.input, {
            backgroundColor: theme.colors.card,
            borderColor: errors.name ? theme.colors.error : theme.colors.border,
            color: theme.colors.text,
          }]}
          placeholder="Enter task name..."
          placeholderTextColor={theme.colors.subtext}
          value={name}
          onChangeText={setName}
        />
        {errors.name && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errors.name}
          </Text>
        )}
        
        <Text style={[styles.label, { color: theme.colors.text, marginTop: 16 }]}>Priority</Text>
        <TouchableOpacity
          style={[styles.prioritySelector, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={togglePriorityDropdown}
        >
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
            <Text style={[styles.priorityText, { color: priorityColor }]}>
              {PRIORITY_LABELS[priority]}
            </Text>
          </View>
          <ChevronDown color={theme.colors.subtext} size={20} />
        </TouchableOpacity>

        {/* Priority Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={togglePriorityDropdown}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select Priority</Text>
              {Object.keys(PRIORITIES).map((key) => {
                const value = PRIORITIES[key];
                const color = theme.colors.priority[value];
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.modalItem, value === priority && { backgroundColor: color + '20' }]}
                    onPress={() => handlePrioritySelect(value)}
                  >
                    <Text style={[styles.priorityText, { color }]}>
                      {PRIORITY_LABELS[value]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={togglePriorityDropdown}
              >
                <Text style={[styles.modalCloseText, { color: theme.colors.primary }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        <Text style={[styles.label, { color: theme.colors.text, marginTop: 16 }]}>Due Date</Text>
        <TouchableOpacity
          style={[styles.dateButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Calendar color={theme.colors.primary} size={20} />
          <Text style={[styles.dateButtonText, { color: theme.colors.text }]}>
            {dueDate ? format(dueDate, 'MMM d, yyyy') : 'Select due date (optional)'}
          </Text>
        </TouchableOpacity>
        
        {renderDatePicker()}
        
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  prioritySelector: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  datePickerContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  dateOption: {
    width: 60,
    height: 70,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '600',
  },
  dateMonth: {
    fontSize: 14,
  },
  closeDatePicker: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaskForm;
