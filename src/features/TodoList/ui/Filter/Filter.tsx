import { CheckBox } from '@shared/ui/CheckBox';
import s from './Filter.module.scss';

type FilterProps = {
  isFilter: boolean,
  onFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Filter: React.FC<FilterProps> = ({ isFilter, onFilter }) => {
  return (
    <div className={s.filter_container}>
      <CheckBox
        label="Выполненные задачи"
        name="tasks-filter"
        checked={isFilter}
        onChange={() => onFilter(prev => !prev)}
      />
    </div>
  );
};
