import { TCard, TCardId, TTasksState } from '@features/TodoList/model/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadTasks } from '@shared/constants/localStorage';

type TasksState = {
  tasks: TTasksState;
  totalTasks: number;
};

const loadedTasks = loadTasks();

const maxOrder = (Object.values(loadedTasks) as TCard[]).reduce<number>(
  (max, task) => Math.max(max, task.order ?? 0),
  0,
);

const initialState: TasksState = {
  tasks: loadedTasks,
  totalTasks: maxOrder,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TCard>) => {
      state.totalTasks += 1;
      const newTask = {
        ...action.payload,
       order: state.totalTasks,
      };
      state.tasks[action.payload.id] = newTask;
    },
    removeTask: (state, action: PayloadAction<TCardId>) => {
      delete state.tasks[action.payload];
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
         order: index + 1,
        };
      });
      state.tasks = reorderedTasks;
    },
  },
});

export const { addTask, removeTask, editTask, toggleTask, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
