import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

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
    await axios.post("http://localhost:5000/positions", position);
  };

   const [positions, setPositions] = useState<Position[]>([]);
    useEffect(() => {
      axios.get("http://localhost:5000/positions").then((response) => {
        setPositions(response.data);
      });
    }, []);

  return (
    <>
      <form
        className="space-y-4 ml-48 mt-4"
        onSubmit={handleSubmit(onSubmit || handleCreateOrUpdatePosition)}
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
            <option value="">Select a parent position</option>
            <option value="5">Tech Lead</option>
            <option value="4">Product Owner</option>
            <option value="16">COO</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 active:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Add Position
        </button>
      </form>
      <div className="ml-48">
        <h1>Positions</h1>
        <ul>
          {positions.map((position) => (
            <li key={position.value}>
              {position.label} ({position.value}) - Parent ID:{" "}
              {position.parentId}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PositionF;
