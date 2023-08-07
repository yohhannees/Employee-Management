import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mantine/core";
import { createStyles, Table, ScrollArea, rem } from "@mantine/core";

// Define the types for your data
type Position = {
  id: number;
  label: string;
  value: string;
  parentId: number;
};

type Employee = {
  id: number;
  name: string;
  position: string;
  parentId: number;
};

type Backup = {
  positions: Position[];
  employees: Employee[];
};

// Define the styles for the table scroll area
const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  backupTablesContainer: {
    display: "flex",
    justifyContent: "space-between", // Add space between tables
  },
  tableContainer: {
    border: `1px solid grey`, // Add green border to the table container
    width: "48%", // Adjust the width to make the tables closer to the edges
  },
}));

const BackupComponent: React.FC = () => {
  const { classes, cx } = useStyles();

  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [currentView, setCurrentView] = useState<Backup | null>(null);

  // Fetch data from the JSON server on component mount
  useEffect(() => {
    fetchPositions();
    fetchEmployees();
    fetchBackups();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/positions");
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/backup");
      setBackups(response.data);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const createBackup = async () => {
    try {
      // Fetch the latest positions and employees data from the server
      await fetchPositions();
      await fetchEmployees();

      // Make a copy of the current positions and employees
      const newBackup: Backup = {
        positions: [...positions],
        employees: [...employees],
      };

      // Send a POST request to create a new backup and update the positions and employees
      const response = await axios.post(
        "http://localhost:5000/backup",
        newBackup
      );

      // Update the state with the new backup and its generated ID
      setBackups((prevBackups) => [...prevBackups, response.data]);

      // Show success message
      window.alert("Backup created successfully!");
    } catch (error) {
      console.error("Error creating backup:", error);
      // Show error message
      window.alert("Error creating backup!");
    }
  };

  const viewBackup = (backup: Backup) => {
    setCurrentView(backup);
  };

  const clearView = () => {
    setCurrentView(null);
  };

  const deleteBackup = async (backup: Backup) => {
    try {
      // Ask for confirmation before deleting the backup
      const confirmDelete = window.confirm(
        `Are you sure you want to delete Backup ${backups.indexOf(backup) + 1}?`
      );

      if (confirmDelete) {
        // Remove the backup from the list of backups
        await axios.delete(`http://localhost:5000/backup/${backup.id}`);
        setBackups((prevBackups) => prevBackups.filter((b) => b !== backup));
        // Show success message
        window.alert("Backup deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting backup:", error);
      // Show error message
      window.alert("Error deleting backup!");
    }
  };

  return (
    <div>
      <Button onClick={createBackup} className=" bg-green-700">
        Create backup
      </Button>
      <Button className="float-right bg-red-600" onClick={clearView}>
        Close
      </Button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {backups.map((backup, index) => (
          <div
            key={index}
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h2>Backup {index + 1}</h2>
            <div>
              <button
                className="pr-2 hover:text-green-500"
                onClick={() => viewBackup(backup)}
              >
                View{" "}
              </button>
              <button
                className="hover:text-red-600"
                onClick={() => deleteBackup(backup)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display the separate tables for positions and employees if a backup is being viewed */}
      {currentView && (
        <div>
          <h2
            className="p-6 font-bold"
            style={{ display: "flex", alignItems: "center" }}
          >
            Viewing Backup
            <p
              className="text-green-700 font-bold"
              style={{ marginLeft: "10px" }}
            >
              {backups.indexOf(currentView) + 1}
            </p>
          </h2>

          <div
            style={{ display: "flex" }}
            className={classes.backupTablesContainer}
          >
            <div className={classes.tableContainer}>
              <h3 className="ml-5 font-bold text-green-700">Positions</h3>
              <ScrollArea h={300}>
                <Table miw={500}>
                  <thead className={cx(classes.header)}>
                    <tr>
                      <th>ID</th>
                      <th>Label</th>
                      <th>Value</th>
                      <th>Parent ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentView.positions.map((position) => (
                      <tr key={position.id}>
                        <td>{position.id}</td>
                        <td>{position.label}</td>
                        <td>{position.value}</td>
                        <td>{position.parentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ScrollArea>
            </div>
            <div className={classes.tableContainer}>
              <h3 className="ml-5 font-bold text-green-700">Employees</h3>
              <ScrollArea h={300}>
                <Table miw={500}>
                  <thead className={cx(classes.header)}>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Parent ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentView.employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.position}</td>
                        <td>{employee.parentId}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupComponent;
