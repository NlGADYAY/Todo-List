import { TCard, TCardId, TTasksState } from '@features/TodoList/model/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadTasks } from '@shared/constants/localStorage';

type TasksState = {
  tasks: TTasksState;
};

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TCard>) => {
      const newTask = {
        ...action.payload,
        order: Object.keys(state.tasks).length,
      };
      state.tasks[action.payload.id] = newTask;
    },
    removeTask: (state, action: PayloadAction<TCardId>) => {
      delete state.tasks[action.payload];

      const remainingTasks = Object.values(state.tasks).sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );

      remainingTasks.forEach((task, index) => {
        state.tasks[task.id].order = index;
      });
    },
    editTask: (
      state,
      action: PayloadAction<{ id: TCardId; title: string }>,
    ) => {
      if (state.tasks[action.payload.id]) {
        state.tasks[action.payload.id].title = action.payload.title;
      }
    },
    toggleTask: (state, action: PayloadAction<TCardId>) => {
      if (state.tasks[action.payload]) {
        state.tasks[action.payload].checked =
          !state.tasks[action.payload].checked;
      }
    },
    reorderTasks: (state, action: PayloadAction<TCard[]>) => {
      const reorderedTasks: TTasksState = {};
      action.payload.forEach((task, index) => {
        reorderedTasks[task.id] = {
          ...task,
          order: index,
        };
      });
      state.tasks = reorderedTasks;
    },
  },
});

export const { addTask, removeTask, editTask, toggleTask, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
