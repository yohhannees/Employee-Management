import React, { useState } from "react";
import { EmployeeForm } from "./components/EmployeeForm";
import axios from "axios";
import { Employee } from "./components/Employee";
import TreeNodeComponent from "./components/TreeNodeComponent";
import { NavbarSimple } from "./components/NavBarSimple";
import HeaderNav from "./components/HeaderNav";
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
