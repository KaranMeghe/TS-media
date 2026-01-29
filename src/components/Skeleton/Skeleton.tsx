/** @format */

import type { SkeletonProps } from './skeleton.type';

const Skeleton = ({ times }: SkeletonProps) => {
  return (
    <div className='space-y-3'>
      {Array(times)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='relative overflow-hidden bg-gray-200 rounded h-6 max-w-md'>
            <div className='absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-gray-200 via-gray-100 to-gray-200' />
          </div>
        ))}
    </div>
  );
};

export default Skeleton;
