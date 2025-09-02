import { TaskCard } from '@entities/Tasks/ui/TaskCard';
import { TCard } from '@features/TodoList/model';
import s from './Table.module.scss';
import { useDragAndDrop } from '@features/TodoList/model/useDragAndDrop';

type TTableProps = {
  cards: TCard[];
  onReorder?: (cards: TCard[]) => void;
};

export const Table: React.FC<TTableProps> = ({ cards, onReorder }) => {
  const dragDropHandlers = useDragAndDrop(cards, {
    onReorder,
  });

  return (
    <>
      {cards && cards.length > 0 ? (
        <ul>
          {cards.map((card, index) => (
            <TaskCard
              key={card.id}
              index={index}
              card={card}
              dragDropHandlers={dragDropHandlers}
            />
          ))}
        </ul>
      ) : (
        <div className={s.table_no_data}>Нет Задач</div>
      )}
    </>
  );
};
