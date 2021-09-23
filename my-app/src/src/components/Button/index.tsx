import { FC } from 'react';
import './style.css';

type Props = {
  buttonText:string;
  onClick:() => void;
};

export const Button: FC<Props> = (props) => {
  const {
    onClick, buttonText
  } = props;

  return (
      <li>
        <button className="btn" type="button" onClick={onClick}>
            {buttonText}
        </button>
      </li>
  );
};

export default Button;
