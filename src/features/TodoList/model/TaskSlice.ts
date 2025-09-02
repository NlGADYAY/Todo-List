import { TCard, TCardId, TTasksState } from "@features/TodoList/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTasks } from "@shared/constants/localStorage";

type TasksState = {
  tasks: TTasksState;
}

const initialState:  TasksState  = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TCard>) => {
      state.tasks[action.payload.id] = action.payload;
    },
    removeTask: (state, action: PayloadAction<TCardId>) => {
      state.tasks = Object.fromEntries(
        Object.entries(state.tasks).filter(([key]) => key !== action.payload)
      );
    },
    editTask: (state, action: PayloadAction<{ id: TCardId; title: string }>) => {
      if (state.tasks[action.payload.id]) {
        state.tasks[action.payload.id].title = action.payload.title;
      }
    },
    toggleTask: (state, action: PayloadAction<TCardId>) => {
      if (state.tasks[action.payload]) {
        state.tasks[action.payload].checked = !state.tasks[action.payload].checked;
      }
    },

  },
});

export const { addTask, removeTask, editTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
