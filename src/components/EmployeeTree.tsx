import React, { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "./Employee";

interface TreeNode {
  label: string;
  value: string;
  children: TreeNode[];
}

const buildTree = (nodes: Employee[], parentId: number | null): TreeNode[] => {
  const children = nodes
    .filter((node) => node.parentId === parentId)
    .map((node) => ({
      label: node.position,
      value: node.id.toString(),
      children: buildTree(nodes, node.id),
    }));

  return children;
};

export const EmployeeTree: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    axios.get("http://localhost:5000/employees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  useEffect(() => {
    setTreeData(buildTree(employees, null));
  }, [employees]);

  const handleNodeClick = (node: TreeNode) => {
    const employee = employees.find((e) => e.id.toString() === node.value);
    setSelectedEmployee(employee || null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Employee Tree</h2>
      {employees.length > 0 && (
        <ul>
          {treeData.map((node) => (
            <TreeNode
              key={node.value}
              node={node}
              onNodeClick={handleNodeClick}
            />
          ))}
        </ul>
      )}
      {selectedEmployee && (
        <div>
          <h3 className="text-lg font-bold">
            {selectedEmployee.name} ({selectedEmployee.position})
          </h3>
          <p>ID: {selectedEmployee.id}</p>
          <p>Parent ID: {selectedEmployee.parentId}</p>
        </div>
      )}
    </div>
  );
};
interface TreeNodeProps {
  node: TreeNode;
  onNodeClick: (node: TreeNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onNodeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <div className="flex items-center justify-between py-2">
        <div>
          <span className="cursor-pointer" onClick={() => onNodeClick(node)}>
            {node.label}
          </span>
          {node.children.length > 0 && (
            <button
              className="ml-2 bg-blue-500 active:bg-blue-950 text-white px-2 py-1 rounded"
              onClick={handleClick}
            >
              {isOpen ? "-" : "+"}
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.value}
              node={child}
              onNodeClick={onNodeClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
