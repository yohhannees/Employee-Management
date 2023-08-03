import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Group,
  ActionIcon,
  Table,
  Text,
  Anchor,
  TextInput,
  ScrollArea,
  useMantineTheme,
  Pagination,
  Button,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { Select } from "@mantine/core";

interface Employee {
  id: number;
  name: string;
  position: string;
  parentId: number | null;
}

export const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(8);
  const [isEditMode, setIsEditMode] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    axios.get("http://localhost:5000/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    axios.delete(`http://localhost:5000/employees/${employee.id}`).then(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((e) => e.id !== employee.id)
      );
      setSelectedEmployee(null);
    });

    window.alert(
      `Successfully Deleted  "{${employee.name}}" from position "{${employee.position}}"`
    );
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
  };

  const handleUpdateClick = (updatedEmployee: Employee) => {
    axios
      .put(
        `http://localhost:5000/employees/${updatedEmployee.id}`,
        updatedEmployee
      )
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((e) =>
            e.id === updatedEmployee.id ? updatedEmployee : e
          )
          
        );
        setSelectedEmployee(null);
        setIsEditMode(false);
      });

    window.alert(`Successfully Updated The Employee`);
  };

  const handleCancelClick = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const rows = currentEmployees.map((employee) => (
    <tr key={employee.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} radius={30}>
            {employee.name.charAt(0)}
          </Avatar>
          <Text fz="sm" fw={500}>
            {employee.name}
          </Text>
        </Group>
      </td>
      <td>
        <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {employee.position}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {employee.id}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {employee.parentId || "N/A"}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => handleEditClick(employee)}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDeleteClick(employee)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const pageCount = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div>
      {isEditMode && selectedEmployee && (
        <EmployeeEditForm
          employee={selectedEmployee}
          onUpdate={handleUpdateClick}
          onCancel={handleCancelClick}
        />
      )}

      {!isEditMode && (
        <TextInput
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          className="mb-4"
        />
      )}

      <ScrollArea>
        <Table sx={{ minWidth: 600 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Position</th>
              <th>ID</th>
              <th>ParentID</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <Pagination
        total={pageCount}
        className="mt-4"
        style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
        {...{ pages: pageCount, value: currentPage, onChange: setCurrentPage }}
      />
    </div>
  );
};

interface EmployeeEditFormProps {
  employee: Employee;
  onUpdate: (updatedEmployee: Employee) => void;
  onCancel: () => void;
}

interface Position {
  label: string;
  value: string;
  parentId: number | null;
}
const EmployeeEditForm: React.FC<EmployeeEditFormProps> = ({
  employee,
  onUpdate,
  onCancel,
}) => {
  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const selectedPosition = positions.find((p) => p.value === position);
  const parentId = selectedPosition?.parentId ?? employee.parentId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedEmployee = { ...employee, name, position, parentId };
    onUpdate(updatedEmployee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group spacing="xs">
        <TextInput
          label="Name"
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />

        <Select
          label="Position"
          required
          value={position}
          onChange={(value) => setPosition(value)}
          data={positions}
          textField="label"
          valueField="value"
        />

        <TextInput
          label="Parent ID"
          type="number"
          value={parentId?.toString() ?? ""}
          onChange={(event) => setParentId(Number(event.currentTarget.value))}
        />
        <Button type="submit" className="bg-green-700 active:bg-green-950">
          Update
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className=" bg-red-700 active:bg-red-950 "
        >
          Cancel
        </Button>
      </Group>
    </form>
  );
};
