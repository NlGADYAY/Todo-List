import { Root, AddTask, Table, Filter } from "./ui";
import { useAppSelector } from "@app/store";
import { useState } from "react";
import { selectFilteredTasks } from "./ui/Table/model/TableSelector";

export const TodoList = () => {
  const [isFilter, setIsFilter] = useState(false)
  const cards = useAppSelector((state) =>
    selectFilteredTasks(state, isFilter)
  );

  return (
    <Root
      headers={<AddTask cards={cards} />}
      filter={<Filter
        filter={isFilter}
        onFilter={setIsFilter}
      />}
      table={<Table
        cards={cards}
      />}
      title={'Todo List'}
    />
  );
};
