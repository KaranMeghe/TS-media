/** @format */

import type { ButtonProps } from './Button.type';
import { GoSync } from 'react-icons/go';

const Button = ({ isLoading, children, className, onClick }: ButtonProps) => {
  return (
    <button disabled={isLoading} className={className} onClick={onClick}>
      {isLoading ? <GoSync className='animate-spin' /> : children}
    </button>
  );
};

export default Button;
