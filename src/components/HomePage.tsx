import React, { useEffect, useState } from "react";
import { EmployeeForm } from "./EmployeeForm";
import axios from "axios";
import { Employee } from "./Employee";
import TreeNodeComponent from "./TreeNodeComponent";
import { NavbarSimple } from "./NavBarSimple";
import HeaderNav from "./HeaderNav";
import PositionF from "./PositionF";
import PositionForm from "./PositionForm";

interface Position {
  value: string;
  label: string;
  parentId: number;
}

const HomePage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleCreateOrUpdateEmployee = async (employee: Employee) => {
    if (selectedEmployee) {
      await axios.put(
        `http://localhost:5000/employees/${selectedEmployee.id}`,
        employee
      );
    } else {
      await axios.post("http://localhost:5000/employees", employee);
    }
    setSelectedEmployee(null);
  };
 const handleCreateOrUpdatePosition = async (position: Position) => {
   await axios.post("http://localhost:5000/positions", position);
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
            <PositionF onSubmit={handleCreateOrUpdatePosition}/>
            <div className="ml-64">
              
              
            </div>
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
