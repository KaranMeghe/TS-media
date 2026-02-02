/** @format */
import Header from './Header';
import RenderUsers from './RenderUsers';

const UsersList = () => {
  return (
    <>
      <div className='flex flex-row justify-between items-center m-3 p-2'>
        <Header />
      </div>
      <RenderUsers />
    </>
  );
};

export default UsersList;
