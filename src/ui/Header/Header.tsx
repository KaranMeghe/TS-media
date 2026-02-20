/** @format */
/** @format */

import Button from '../../ui/Button';
import type { HeaderUIProps } from './header.type';

const Header = ({ isCreating, handleClick, error, children, btnTxt }: HeaderUIProps) => {
  return (
    <>
      <h1 className='m2 text-xl'>{children}</h1>
      <div className='flex flex-col'>
        <Button isLoading={isCreating} className='border-2 py-1 px-2' onClick={handleClick}>
          {btnTxt}
        </Button>
        {error && <p className='text-red-500 my-1'>{error || 'Something went wrong'}</p>}
      </div>
    </>
  );
};

export default Header;
