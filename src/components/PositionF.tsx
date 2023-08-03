import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface Position {
  value: string;
  label: string;
  parentId: number;
}

interface PositionFormProps {
  onSubmit: (data: Position) => void;
}

export const PositionF = ({ onSubmit }: PositionFormProps) => {
  const { register, handleSubmit } = useForm<Position>();

  const handleCreateOrUpdatePosition = async (position: Position) => {
    const { label: value, parentId } = position;

    await axios.post("http://localhost:5000/positions", {
      value,
      label: value,
      parentId,
    });
  };

  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  const handleFormSubmit = async (data: Position) => {
    const { label: value, parentId } = data;
    const positionData = { value, label: value, parentId };

    if (window.confirm("Are you sure you want to add this position?")) {
      try {
        await handleCreateOrUpdatePosition(positionData);
      
        window.alert(
          `Successfully added position "${value}" with parent position "${
            positions[parentId - 1].label
          }"`
        );
      } catch (error) {
        console.error("Error adding position:", error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold ml-48 my-9 pb-0 mb-4">Add Employee</h1>
      <form
        className="space-y-4 ml-48 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div>
          <label htmlFor="name" className="block mb-1">
            Position Name
          </label>
          <input
            id="label"
            className="border border-gray-300 w-full p-2 rounded"
            {...register("label", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="parent" className="block mb-1">
            Parent Position
          </label>
          <select
            id="parentId"
            className="border border-gray-300 w-full p-2 rounded"
            {...register("parentId", { required: true })}
          >
            <option value="">-- Select a Parent position --</option>
            {positions.map((position, index) => (
              <option key={index} value={index + 1}>
                {position.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 active:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Add Position
        </button>
      </form>
    </>
  );
};

export default PositionF;
