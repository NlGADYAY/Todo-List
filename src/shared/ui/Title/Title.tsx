import './Title.scss';

type TitleProps = {
  text: string;
  className?: string;
};

export const Title: React.FC<TitleProps> = ({ text, className = '' }) => {
  return <span className={`title ${className}`}>{text}</span>;
};
