import { NavbarSimple } from "./NavBarSimple";
import HeaderNav from "./HeaderNav";
import EmployeesWithNoPosition from "./EmployeesWithNoPosition";

const ManagePageLayout = () => {
  return (
    <>
      <div id="list">
        <NavbarSimple />
        <HeaderNav />
      </div>
      <div className="space-y-4 ml-60 mr-14 my-24 mb-4">
        <div>
          <EmployeesWithNoPosition />
        </div>
      </div>
    </>
  );
};

export default ManagePageLayout;
