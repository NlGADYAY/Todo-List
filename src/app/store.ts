import { configureStore } from "@reduxjs/toolkit";
import tasks from '@features/TodoList/model/TaskSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { saveTasks } from "@shared/constants/localStorage";

export const store = configureStore({
    reducer: {
        tasks,
    },
});

store.subscribe(() => {
    const state = store.getState();
    saveTasks(state.tasks.tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
