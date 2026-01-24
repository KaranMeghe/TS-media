/** @format */

import type { ButtonProps } from './Button.type';

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
