import s from './CheckBox.module.scss'
type TCheckBox = {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const CheckBox: React.FC<TCheckBox> = ({ label, className, ...props }) => {
  
  return (
    <label className={s.checkbox_label}>
      <input type="checkbox"
       {...props} />
      <span>{label }</span>
    </label>
  );
};
