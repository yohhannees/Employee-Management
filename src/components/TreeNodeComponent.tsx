import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Badge, useMantineTheme } from "@mantine/core";

import { positions } from "./PositionLabel";

interface Position {
  label: string;
  value: string;
  parentId: number | null;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  parentId: number | null;
}

interface TreeNode {
  position: Position;
  children: TreeNode[];
}

const arrayToTree = (positions: Position[]): TreeNode[] => {
  const positionMap = new Map<string, Position>();
  positions.forEach((position) => {
    positionMap.set(position.value, position);
  });

  const nodeMap = new Map<string, TreeNode>();
  positions.forEach((position) => {
    nodeMap.set(position.value, {
      position,
      children: [],
    });
  });

  const roots: TreeNode[] = [];
  positions.forEach((position) => {
    if (position.parentId === null) {
      roots.push(nodeMap.get(position.value)!);
    } else {
      const parentPosition = positionMap.get(
        positions[position.parentId - 1].value
      )!;
      const parentNode = nodeMap.get(parentPosition.value)!;
      parentNode.children.push(nodeMap.get(position.value)!);
    }
  });
  return roots;
};

interface Props {
  node: TreeNode;
  depth: number;
  onPositionClick: (positionValue: string) => void;
}

const TreeNodeComponent = ({ node, depth, onPositionClick }: Props) => {
  const [showEmployees, setShowEmployees] = useState(false);
  const theme = useMantineTheme();

  const handleClick = () => {
    setShowEmployees(!showEmployees);
    onPositionClick(node.position.value);
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer"
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        <Text weight={500} size="sm">
          {node.position.label}
        </Text>
        {node.children.length > 0 && (
          <Badge
            color={theme.colorScheme === "dark" ? "gray" : "teal"}
            variant="filled"
            size="sm"
            className="ml-2"
          >
            {node.children.length}
          </Badge>
        )}
      </div>
      {showEmployees && node.children.length === 0 && (
        <div className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Render employees for this position */}
          </div>
        </div>
      )}
      {node.children.map((child) => (
        <TreeNodeComponent
          key={child.position.value}
          node={child}
          depth={depth + 1}
          onPositionClick={onPositionClick}
        />
      ))}
    </div>
  );
};

const TreeComponent = ({
  positions,
  employees,
}: {
  positions: Position[];
  employees: Employee[];
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const tree = arrayToTree(positions);

  const handlePositionClick = (positionValue: string) => {
    setSelectedPosition(positionValue);
  };

  const positionEmployees = employees.filter(
    (employee) => employee.position === selectedPosition
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="col-span-full">
        <Card shadow="lg" className="p-4">
          {tree.map((node) => (
            <TreeNodeComponent
              key={node.position.value}
              node={node}
              depth={0}
              onPositionClick={handlePositionClick}
            />
          ))}
        </Card>
      </div>
      {selectedPosition && (
        <div className="col-span-full">
          <Card shadow="lg" className="p-4">
            <Text weight={700} size="lg" className="mb-4">
              {positions.find((p) => p.value === selectedPosition)?.label} 
            </Text>
            {positionEmployees.map((employee) => (
              <div key={employee.id} className="my-2">
                <Card shadow="sm">
                  <div className="p-4">
                    <Text weight={500}>{employee.name}</Text>
                    <Text size="xs" color="gray">
                      ID: {employee.id}
                    </Text>
                    <Text size="xs" color="gray">
                      Position: {employee.position}
                    </Text>
                    <Text size="xs" color="gray">
                      Parent ID: {employee.parentId}
                    </Text>
                  </div>
                </Card>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      axios.get("http://localhost:5000/employees").then((response) => {
        setEmployees(response.data);
      });
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      <Text weight={700} size="lg" className="mb-4">
        Company Hierarchy
      </Text>
      {employees.length > 0 && (
        <TreeComponent positions={positions} employees={employees} />
      )}
    </div>
  );
};
export default App;