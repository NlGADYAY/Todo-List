import { TaskCard } from "@entities/Tasks/ui/TaskCard";
import { TCard } from "@features/TodoList/model";

type TTableProps = {
  cards: TCard[];
};

export const Table: React.FC<TTableProps> = ({ cards }) => {

  return (
    <>
      {cards ? (
        <ul>
          {cards.map((card, index) => (
            <TaskCard
              key={card.id}
              index={index}
              card={card}
            />
          ))}
        </ul>
      ) : (
        <p>Нет Задач</p>
      )}
    </>
  );
};
