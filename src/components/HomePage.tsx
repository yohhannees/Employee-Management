import { EmployeeForm } from "./EmployeeForm";
import axios from "axios";
import { Employee } from "./Employee";
import TreeNodeComponent from "./TreeNodeComponent";
import { NavbarSimple } from "./NavBarSimple";
import HeaderNav from "./HeaderNav";
import PositionF from "./PositionF";

interface Position {
  value: string;
  label: string;
  parentId: number;
}

const HomePage: React.FC = () => {

   const handleCreateOrUpdateEmployee = async (employee: Employee) => {
     await axios.post("http://localhost:5000/employees", employee);
     window.alert(
       `Successfully added position "${employee.name}" with parent position "${employee.position}"`
     );
   };

  const handleCreateOrUpdatePosition = async (position: Position) => {
    const { label: value, parentId } = position;
    // Use parentId directly as the parent's id for the new position
    await axios.post("http://localhost:5000/positions", {
      value,
      label: value,
      parentId,
    });
  };

  return (
    <>
      <div>
        <NavbarSimple />
        <HeaderNav />
      </div>
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <EmployeeForm onSubmit={handleCreateOrUpdateEmployee} />
            <PositionF onSubmit={handleCreateOrUpdatePosition} />
            <div className="ml-64"></div>
          </div>
          <div>
            <TreeNodeComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
