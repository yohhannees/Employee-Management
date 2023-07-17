import { NavbarSimple } from "./NavBarSimple";
import HeaderNav from "./HeaderNav";
import { EmployeeList } from "./EmployeeList";

const ListPageLayout = () => {
  return (
    <>
      <div id="list">
        <NavbarSimple />
        <HeaderNav />
      </div>
      <div className="space-y-4 ml-60 mr-14 my-32 mb-4">
        <div>
          <EmployeeList />
        </div>
      </div>
    </>
  );
};

export default ListPageLayout;
