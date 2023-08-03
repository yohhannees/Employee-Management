import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Button,
  Pagination,
  TextInput,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface Position {
  id: number;
  label: string;
  value: string;
  parentId: number | null; // Allow parentId to be null for the CEO position
}

interface EditFormProps {
  position: Position;
  positions: Position[];
  onCancel: () => void;
  onSubmit: (position: Position) => void;
}

function EditForm({ position, positions, onCancel, onSubmit }: EditFormProps) {
  const [label, setLabel] = useState(position.label);
  const [parentId, setParentId] = useState(position.parentId);

  const handleSubmit = () => {
    const updatedPosition: Position = {
      ...position,
      label,
      value: label, // set value to label
      parentId,
    };
    onSubmit(updatedPosition);
  };

  return (
    <>
      <Group spacing="xs">
        <TextInput
          type="text"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
        <select
          className="block w-48 h-9 px-3 bg-gray-800 rounded-md text-gray-200 focus:outline-none"
          style={{ backgroundColor: "#25262B", padding: "0px 12px" }}
          value={parentId || ""}
          onChange={(event) =>
            setParentId(event.target.value ? Number(event.target.value) : null)
          }
        >
          <option value="">None</option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.label}
            </option>
          ))}
        </select>
        <Button
          className="bg-green-700 active:bg-green-950"
          onClick={handleSubmit}
        >
          Update
        </Button>
        <Button className=" bg-red-700 active:bg-red-950" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </>
  );
}

export function PositionList() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [editPosition, setEditPosition] = useState<Position | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useMantineTheme();

  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  const handleEdit = (position: Position) => {
    setEditPosition(position);
  };

  const handleEditSubmit = (position: Position) => {
    // Check if the edited position is the CEO (parentId is null), which is not allowed to change
    if (position.parentId === null) {
      window.alert(
        "Cannot edit the root position (CEO) or add another root position ."
      );
      return;
    }

    // Check if the edited position's new parentId is not a child of the edited position
    const isValidParent = (parentId: number) => {
      let parent = positions.find((p) => p.id === parentId);
      while (parent) {
        if (parent.id === position.id) return false;
        parent = positions.find((p) => p.id === parent.parentId);
      }
      return true;
    };

    if (!isValidParent(position.parentId)) {
      window.alert("Cannot set the position under its own child.");
      return;
    }

    axios
      .put(`http://localhost:5000/positions/${position.id}`, {
        label: position.label,
        value: position.value,
        parentId: position.parentId,
      })
      .then(() => {
        setPositions((prevPositions) =>
          prevPositions.map((prevPosition) =>
            prevPosition.id === position.id ? position : prevPosition
          )
        );
        setEditPosition(null);
        window.alert(`Successfully updated  "{${position.label}}"`);
      });
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/positions/${id}`).then(() => {
      setPositions((prevPositions) =>
        prevPositions.filter((position) => position.id !== id)
      );
      const totalPages = Math.ceil(filteredPositions.length / positionsPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
      window.alert(`Successfully Deleted The Position`);
    });
  };

  const getParentPosition = (parentId: number | null) => {
    return parentId
      ? positions.find((position) => position.id === parentId)?.label ?? ""
      : "";
  };

  const filteredPositions = positions.filter((position) =>
    position.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const positionsPerPage = 10;
  const pageCount = Math.ceil(filteredPositions.length / positionsPerPage);
  const startIndex = (currentPage - 1) * positionsPerPage;
  const endIndex = startIndex + positionsPerPage;
  const currentPositions = filteredPositions.slice(startIndex, endIndex);

  const rows = currentPositions.map((position) => (
    <tr key={position.id}>
      <td>{position.label}</td>
      <td>{getParentPosition(position.parentId)}</td>
      <td>{position.parentId}</td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => handleEdit(position)}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDelete(position.id)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search Positions..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="mb-4"
      />
      {editPosition && (
        <EditForm
          position={editPosition}
          positions={positions}
          onCancel={() => setEditPosition(null)}
          onSubmit={handleEditSubmit}
        />
      )}
      <Table striped style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Label</th>
            <th>Parent</th>
            <th>Parent ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        onChange={setCurrentPage}
        total={pageCount}
        limit={positionsPerPage}
        style={{ position: "fixed", bottom: "2rem", right: "2rem" }}
        withBorder
        size="sm"
        color={theme.colors.gray[5]}
        variant="outline"
      />
    </ScrollArea>
  );
}
