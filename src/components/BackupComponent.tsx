import React, { useState, useEffect } from "react";
import axios from "axios";

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

const BackupComponent: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [backups, setBackups] = useState<Backup[]>([]);

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
    } catch (error) {
      console.error("Error creating backup:", error);
    }
  };

  const loadBackup = async (backup: Backup) => {
    try {
      // Send a PUT request to update the positions
      await axios.put("http://localhost:5000/positions", backup.positions);

      // Send a PUT request to update the employees
      await axios.put("http://localhost:5000/employees", backup.employees);

      // Fetch the updated positions and employees after loading the backup
      await fetchPositions();
      await fetchEmployees();
    } catch (error) {
      console.error("Error loading backup:", error);
    }
  };



  const deleteBackup = async (backup: Backup) => {
    try {
      // Remove the backup from the list of backups
      await axios.delete(`http://localhost:5000/backup/${backup.id}`);
      setBackups((prevBackups) => prevBackups.filter((b) => b !== backup));
    } catch (error) {
      console.error("Error deleting backup:", error);
    }
  };

  return (
    <div>
      <button onClick={createBackup}>Create backup</button>
      {backups.map((backup, index) => (
        <div key={index}>
          <h2>Backup {index + 1}</h2>
          <button onClick={() => loadBackup(backup)}>Load</button>
          <button onClick={() => deleteBackup(backup)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BackupComponent;
