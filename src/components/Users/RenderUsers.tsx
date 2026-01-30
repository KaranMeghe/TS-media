/** @format */

import Skeleton from '../Skeleton/Skeleton';
import type { RenderUsersProps } from './userUi.type';

const RenderUsers = ({ users, isUserFetching }: RenderUsersProps) => {
  return (
    <>
      {isUserFetching ? (
        <Skeleton times={users.length} />
      ) : (
        users.map((user) => (
          <div className='mb-2 border rounded' key={user.id}>
            <div className='flex p-2 justify-between items-center cursor-pointer'>{user.name}</div>
          </div>
        ))
      )}
    </>
  );
};

export default RenderUsers;
