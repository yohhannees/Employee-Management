import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, ChevronIcon } from "@mantine/core"; // Assuming you have a ChevronIcon component from Mantine
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

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

  const buildTree = (position: Position): TreeNode => {
    return {
      position,
      children: positions
        .filter((p) => p.parentId === position.id)
        .map((p) => buildTree(p)),
    };
  };

  const roots: TreeNode[] = positions
    .filter((p) => p.parentId === null)
    .map((p) => buildTree(p));

  return roots;
};

interface Props {
  node: TreeNode;
  depth: number;
  onPositionClick: (positionValue: string) => void;
}

const TreeNodeComponent = ({ node, depth, onPositionClick }: Props) => {
  const [showEmployees, setShowEmployees] = useState(true); // Set it to true initially

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
        {node.children.length > 0 && (
          <>
            {showEmployees ? (
              <IconChevronDown size={16} />
            ) : (
              <IconChevronRight size={16} />
            )}
          </>
        )}
        <Text
          weight={600}
          size="sm"
          className={
            "text-green-500 hover:border active:text-black border-green-700 "
          }
        >
          {node.position.label}
        </Text>
      </div>
      {showEmployees && (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.position.value}
              node={child}
              depth={depth + 1}
              onPositionClick={onPositionClick}
            />
          ))}
        </div>
      )}
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
    <div className="grid grid-cols-2 gap-4">
      <div>
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
        <div>
          <Card shadow="lg" className="p-4">
            <Text weight={700} size="lg" className="mb-4">
              {positions.find((p) => p.value === selectedPosition)?.label}
            </Text>
            {positionEmployees.map((employee) => (
              <div key={employee.id} className="my-2">
                <Card shadow="sm">
                  <div className="p-4">
                    <Text weight={500}>{employee.name}</Text>
                    <Text size="xs" color="green" weight="bold">
                      ID: {employee.id}
                    </Text>
                    <Text size="xs" color="green" weight="bold">
                      Position: {employee.position}
                    </Text>
                    <Text size="xs" color="green" weight="bold">
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
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      axios.get("http://localhost:5000/employees").then((response) => {
        setEmployees(response.data);
      });
    };

    const fetchPositions = async () => {
      axios.get("http://localhost:5000/positions").then((response) => {
        setPositions(response.data);
      });
    };

    fetchEmployees();
    fetchPositions();
  }, []);

  return (
    <div className="p-4 my-16">
      <Text weight={700} size="lg" className="mb-4">
        Company Hierarchy
      </Text>
      {employees.length > 0 && (
        <>
          <TreeComponent positions={positions} employees={employees} />
        </>
      )}
    </div>
  );
};

export default App;
