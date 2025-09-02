import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Input } from '@shared/ui/Input/Input';
import { Button } from '@shared/ui/Button';
import { addTask } from '@features/TodoList/model/TaskSlice';
import s from './AddTask.module.scss';
import { TCard } from '@features/TodoList/model/types';

type TAddTask = {
    cards: TCard[]
}

export const AddTask: React.FC<TAddTask> = ({cards}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (!title.trim()) return;

        const newTask: TCard = {
            id: nanoid(),
            title,
            checked: false,
            create_ad: new Date(),
            number: cards.length + 1
        };

        dispatch(addTask(newTask));
        setTitle('');
    };

    return (
        <div className={s.addTask}>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Добавить задачу"
                className={s.addTask_input} 
            />
            <Button
                onClick={handleAdd}
                className={s.addTask_button} 
            >
                Добавить
            </Button>
        </div>
    );
};
