import { Button } from '@mantine/core';
const HeaderNav = () => {
  return (
    <header className="bg-slate-50 text-white flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" color="gray" size="sm">
          Logout
        </Button>
        <div className="flex items-center space-x-2">
          <div className="bg-red-400">pho</div>
          <span>John Doe</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" color="gray" size="sm">
          Logout
        </Button>
        <div className="flex items-center space-x-2">
          <div className="bg-red-400">pho</div>
          <span className='text-black'>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;