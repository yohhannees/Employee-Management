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

        setEmployees(employeesData);
        setPositions(positionsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Filter employees without positions
  const employeesWithoutPositions = employees.filter((employee) => {
    return !positions.some((position) => position.value === employee.position);
  });

  // ... rest of the component code remains unchanged ...

  return (
    <div>
      {/* ... */}
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
          {employeesWithoutPositions.map((employee) => (
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
