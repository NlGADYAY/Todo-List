import { memo, useState } from 'react';
import { TCard } from '@features/TodoList/model/types';
import { CheckBox } from '@shared/ui/CheckBox';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input/Input';
import { Title } from '@shared/ui/Title';
import s from './TaskCard.module.scss';
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask, editTask } from '@features/TodoList/model';
import cn from 'classnames';
import { DragDropHandlers } from '@features/TodoList/model/useDragAndDrop';

type TTaskCardProps = {
  card: TCard;
  index: number;
  dragDropHandlers?: DragDropHandlers;
};

export const TaskCardComponent: React.FC<TTaskCardProps> = ({
  card,
  index,
  dragDropHandlers,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(card.title);

  const onToggle = (id: string) => dispatch(toggleTask(id));
  const onDelete = (id: string) => dispatch(removeTask(id));
  const onEdit = (id: string, title: string) =>
    dispatch(editTask({ id, title }));

  return (
    <li
      className={cn(s.cardList, {
        [s.dragOver]:
          dragDropHandlers?.isDragging &&
          dragDropHandlers.dragOverIndex === index,
      })}
      draggable={!isEdit}
      onDragStart={(e) => dragDropHandlers?.handleDragStart(e, card, index)}
      onDragOver={dragDropHandlers?.handleDragOver}
      onDragEnter={(e) => dragDropHandlers?.handleDragEnter(e, index)}
      onDragLeave={dragDropHandlers?.handleDragLeave}
      onDrop={(e) => dragDropHandlers?.handleDrop(e, index)}
      onDragEnd={dragDropHandlers?.handleDragEnd}
    >
      <div className={s.cardList_left}>
        <CheckBox
          checked={card.checked}
          onChange={() => onToggle(card.id)}
          label=""
        />
        <span>{card.order}</span>
        {isEdit ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <Title text={card.title} />
        )}
      </div>

      <div className={s.cardList_right}>
        {isEdit ? (
          <Button
            onClick={() => {
              onEdit(card.id, editValue);
              setIsEdit(false);
            }}
          >
            Сохранить
          </Button>
        ) : (
          <>
            <Button
              className={s.cardList_button}
              onClick={() => {
                setIsEdit(true);
                setEditValue(card.title);
              }}
            >
              Редактировать
            </Button>
            <Button
              className={s.cardList_button}
              onClick={() => onDelete(card.id)}
            >
              Удалить
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export const TaskCard = memo(TaskCardComponent);
