import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { TCard } from "@features/TodoList/model";

export const selectFilteredTasks = createSelector(
  (state: RootState) => state.tasks.tasks,
  (_: RootState, filter: boolean) => filter, // дополнительный аргумент
  (tasks, filter): TCard[] => {

    return Object.values(tasks).filter(task => {
      if (filter) {
        return task.checked;
      } else {
        return true;
      }
    });
  }
);

