import s from './Button.module.scss'
import cn from 'classnames'


type ЕButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    
};

export const Button: React.FC<ЕButtonProps> = ({ onClick, children, className }) => {
    return (
        <button onClick={onClick} className={cn(s.button, className)}>
            {children}
        </button>
    );
};
