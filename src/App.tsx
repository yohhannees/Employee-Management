import React, { useState } from "react";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeList } from "./components/EmployeeList";
import axios from "axios";
import { Employee } from "./components/Employee";
import TreeNodeComponent from "./components/TreeNodeComponent";


const App: React.FC = () => {
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
    {/* <NavbarSimple/> */}

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-8">
          <EmployeeForm onSubmit={handleCreateOrUpdateEmployee} />
          <EmployeeList />
          <TreeNodeComponent />        
        </div>
      </div>
    </>
  );
};

export default App;