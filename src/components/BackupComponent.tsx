import React, { useState, useEffect } from "react";
import { Button, Paper, Table, useMantineTheme } from "@mantine/core";
import axios from "axios";

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
  parentId: number | null;
}

interface Backup {
  positions: Position[];
  employees: Employee[];
}

const BackupComponent: React.FC = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const theme = useMantineTheme();

  // Fetching backups from the server on component mount
  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await axios.get<Backup[]>(
        "http://localhost:5000/backup"
      );
      setBackups(response.data);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const createBackup = async () => {
    try {
      const response = await axios.post<Backup>(
        "http://localhost:5000/backup",
        {
          positions: [],
          employees: [],
        }
      );
      setBackups((prevBackups) => [...prevBackups, response.data]);
    } catch (error) {
      console.error("Error creating backup:", error);
    }
  };

  const deleteBackup = async (index: number) => {
    try {
      await axios.delete(`http://localhost:5000/backup/${index}`);
      setBackups((prevBackups) => prevBackups.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting backup:", error);
    }
  };

  const loadBackup = async (backup: Backup) => {
    try {
      await axios.put(
        `http://localhost:5000/backup/${backups.indexOf(backup)}`,
        backup
      );
      window.alert("Backup data loaded successfully!");
      // After loading, you might want to update the positions and employees in your state.
      // This depends on your specific implementation.
    } catch (error) {
      console.error("Error loading backup:", error);
    }
  };

  return (
    <div>
      <Button onClick={createBackup}>Create Backup</Button>
      {backups.map((backup, index) => (
        <Paper key={index} shadow="xs" style={{ margin: "1rem 0" }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Load</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>date {/* Add the date here */}</td>
                <td>time{/* Add the time here */}</td>
                <td>
                  <button onClick={() => loadBackup(backup)}>Load</button>
                </td>
                <td>
                  <button
                    onClick={() => deleteBackup(index)}
                    style={{ color: "red", border: "1px solid red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      ))}
    </div>
  );
};

export default BackupComponent;
