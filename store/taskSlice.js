import { createSlice } from '@reduxjs/toolkit';
import { differenceInSeconds , differenceInHours, parseISO } from 'date-fns';

const initialState = {
  tasks: [],
  archivedTasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    archiveCompletedTasks: (state) => {
      const now = new Date();
      const tasksToArchive = state.tasks.filter(task => {
        if (!task.completed || !task.completedAt) return false;

        const completedTime = parseISO(task.completedAt);
        return differenceInSeconds(now, completedTime) >= 10;
      });

      if (tasksToArchive.length > 0) {
        state.archivedTasks = [...state.archivedTasks, ...tasksToArchive];
        state.tasks = state.tasks.filter(task => {
          if (!task.completed || !task.completedAt) return true;

          const completedTime = parseISO(task.completedAt);
          return differenceInSeconds(now, completedTime) < 10;
        });
      }
    },

  },
});

export const {
  addTask,
  toggleTaskCompletion,
  deleteTask,
  archiveCompletedTasks,
} = taskSlice.actions;

export default taskSlice.reducer;