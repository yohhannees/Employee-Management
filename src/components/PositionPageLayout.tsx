import HeaderNav from "./HeaderNav"
import { NavbarSimple } from "./NavBarSimple"
import { PositionList } from "./PositionList"


const PositionPageLayout = () => {
  return (
    <>
 <div id="Position">
        <NavbarSimple />
        <HeaderNav />
      </div>
      <div className="space-y-4 ml-64 mr-14 my-24 mb-4">
        <div>
          <PositionList />
        </div>
      </div>
    </>
  )
}

export default PositionPageLayout