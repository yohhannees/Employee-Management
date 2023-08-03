import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Badge,
  Group,
  Table,
  Text,
  useMantineTheme,
  TextInput,
  Button,
  ActionIcon,
  Select,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  parentId: number | null;
}

interface Position {
  id: number;
  label: string;
  value: string;
  parentId: number;
}

function EmployeesWithNoPosition() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [positions, setPositions] = useState<Position[]>([]);
  const theme = useMantineTheme();

  useEffect(() => {
    // Fetch data from both endpoints in parallel using Promise.all
    const fetchPositions = axios.get<Position[]>(
      "http://localhost:5000/positions"
    );
    const fetchEmployees = axios.get<Employee[]>(
      "http://localhost:5000/employees"
    );

    Promise.all([fetchPositions, fetchEmployees])
      .then((responses) => {
        const positionsData = responses[0].data;
        const employeesData = responses[1].data;

        // Filter employees without positions
        const employeesWithoutPositions = employeesData.filter((employee) => {
          return !positionsData.some((position) => position.id === employee.id);
        });

        setEmployees(employeesWithoutPositions);
        setPositions(positionsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleUpdateClick = () => {
    if (selectedEmployee) {
      // Send the updated employee data to the server
      axios
        .put(
          `http://localhost:5000/employees/${selectedEmployee.id}`,
          selectedEmployee
        )
        .then(() => {
          // Update the employee in the state
          setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
              employee.id === selectedEmployee.id ? selectedEmployee : employee
            )
          );
          setSelectedEmployee(null);
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };
  const handleDeleteClick = (employee: Employee) => {
    // Send a DELETE request to the server to delete the employee
    axios
      .delete(`http://localhost:5000/employees/${employee.id}`)
      .then(() => {
        // Update the state by removing the deleted employee from the list
        setEmployees((prevEmployees) =>
          prevEmployees.filter((e) => e.id !== employee.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleCancelClick = () => {
    setSelectedEmployee(null);
  };

  
  return (
    <div>
      {selectedEmployee && (
        <div>
          <Text className="text-green-500 font-bold">
            Editing Employee: {selectedEmployee.name}
          </Text>
          <form>
            <Group spacing="xs">
              <TextInput
                label="Name"
                required
                value={selectedEmployee.name}
                onChange={(event) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: event.currentTarget.value,
                  })
                }
              />

              {/* Dropdown for selecting positions */}
              <Select
                label="Position"
                required
                value={selectedEmployee.position}
                onChange={(value) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    position: value,
                    parentId:
                      positions.find((p) => p.value === value)?.parentId ??
                      null, // Set the parent ID based on selected position
                  })
                }
                data={positions}
                textField="label"
                valueField="value"
              />

              <Button
                onClick={handleUpdateClick}
                className="bg-green-700 active:bg-green-950"
              >
                Update
              </Button>
              <Button
                onClick={handleCancelClick}
                className=" bg-red-700 active:bg-red-950 "
              >
                Cancel
              </Button>
            </Group>
          </form>
        </div>
      )}

      <Text className="text-green-500 font-bold">
        Employees without Parent Positions
      </Text>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Position</th>
            <th>Parent ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Group spacing="sm">
                  <Avatar size={30} radius={30} color="green-500">
                    {employee.name.charAt(0)}
                  </Avatar>
                  <Text fz="sm" fw={500}>
                    {employee.name}
                  </Text>
                </Group>
              </td>
              <td>{employee.id}</td>
              <td>
                <Badge
                  variant={theme.colorScheme === "dark" ? "light" : "outline"}
                >
                  {employee.position}
                </Badge>
              </td>
              <td>
                <Text
                  size="sm"
                  color={theme.colorScheme === "dark" ? "light" : "dimmed"}
                >
                  {employee.parentId || "N/A"}
                </Text>
              </td>
              <td>
                <Group spacing={0} position="right">
                  <ActionIcon onClick={() => handleEditClick(employee)}>
                    <IconPencil size="1rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    <IconTrash size="1rem" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeesWithNoPosition;
