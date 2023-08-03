import { NavbarSimple } from "./NavBarSimple";
import HeaderNav from "./HeaderNav";

import OrgChartComponent from "./OrgChartComponent";

const chartLayout = () => {
  return (
    <>
      <div id="list">
        <NavbarSimple />
        <HeaderNav />
      </div>
      <div className="space-y-4 ml-60 mr-14 my-24 mb-4">
        <div>
          <OrgChartComponent/>
        </div>
      </div>
    </>
  );
};

export default chartLayout;
