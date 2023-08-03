import React, { useEffect } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import axios from "axios";

const OrgChartComponent: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/positions");
        const data = response.data;

        if (data && data.length > 0) {
          // Map parentId to pid for org chart structure
          const processedData = data.map((item: { parentId: any; }) => {
            return {
              ...item,
              pid: item.parentId,
            };
          });

          const orgChartContainer = document.getElementById("orgChart");
          if (orgChartContainer) {
            new OrgChart(orgChartContainer, {
              nodes: processedData,
             
              nodeMenu: {
                details: { text: "Details" },
              },
              nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img",
              },

            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div id="orgChart" style={{ width: "100%", height: "100%" }} />;
};

export default OrgChartComponent;
