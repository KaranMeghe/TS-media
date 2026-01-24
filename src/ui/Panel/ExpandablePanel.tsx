/** @format */

import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import type { PanelProps } from './Panel.type';

function ExpandablePanel({ header, children }: PanelProps) {
  const [expanded, setIsExpande] = useState(false);

  const hadleClick = () => {
    return setIsExpande(!expanded);
  };

  return (
    <div className='mb-2 border rounded w-full'>
      <div className='flex p-2 justify-between items-center'>
        <div className='flex flex-row items-center  gap-2'>{header}</div>
        <div onClick={hadleClick} className='cursor-pointer'>
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className='p-2 border-t'>{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
