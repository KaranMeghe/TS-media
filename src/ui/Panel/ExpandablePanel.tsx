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
    <div className='mb-4 border border-slate-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden bg-slate-800'>
      <div
        className='flex p-4 justify-between items-center bg-slate-700 hover:bg-slate-600 cursor-pointer'
        onClick={hadleClick}>
        <div className='flex flex-row items-center gap-3 text-slate-100'>{header}</div>
        <div className='text-slate-300'>{expanded ? <GoChevronDown size={20} /> : <GoChevronLeft size={20} />}</div>
      </div>

      {/* Keep children mounted to avoid remounting fetches; only toggle visibility */}
      <div
        aria-hidden={!expanded}
        className={
          expanded
            ? 'p-4 border-t border-slate-700 bg-slate-800 max-h-screen transition-max-height duration-300 ease-in-out'
            : 'p-0 border-t border-slate-700 bg-slate-800 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out'
        }>
        {children}
      </div>
    </div>
  );
}

export default ExpandablePanel;
