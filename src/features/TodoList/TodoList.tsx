import { Root, AddTask, Table, Filter } from './ui';
import { useAppSelector, useAppDispatch } from '@app/store';
import { useState } from 'react';
import { selectFilteredTasks } from './ui/Table/model/TableSelector';
import { reorderTasks } from './model';
import { TCard } from './model';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const [isFilter, setIsFilter] = useState(false);

  const cards = useAppSelector((state) => selectFilteredTasks(state, isFilter));

  const handleReorder = (reorderedCards: TCard[]) => {
    dispatch(reorderTasks(reorderedCards));
  };

  return (
    <Root
      headers={<AddTask cards={cards} />}
      filter={<Filter isFilter={isFilter} onFilter={setIsFilter} />}
      table={<Table cards={cards} onReorder={handleReorder} />}
      title={'Todo List'}
    />
  );
};
