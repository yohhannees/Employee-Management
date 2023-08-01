import React, { useEffect, useState } from "react";
import axios from "axios";
import  OrgChart from "react-organizational-chart";
import {  TreeNode } from "react-organizational-chart";

interface Position {
  id: number;
  label: string;
  value: string;
  parentId: number | null;
}

const OrgChartComponent: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  const renderTree = (parentId: number | null) => {
    return
    <>
    positions

      .filter((position) => position.parentId === parentId)
      .map((position) => (
        <TreeNode label={position.label} key={position.id}>
          {renderTree(position.id)}
        </TreeNode>
        <OrgChart></OrgChart>
        </>
      ));

  };

  return (
   <div>
     <Org]Chart/>
   </div>
 );
};

export default OrgChartComponent;
