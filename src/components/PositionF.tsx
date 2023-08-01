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
    const { label: value, parentId } = position;
    await axios.post("http://localhost:5000/positions", { value, label: value, parentId });
  };

  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold ml-48 my-9 pb-0 mb-4">Add Employee</h1>
      <form
        className="space-y-4 ml-48 mt-4"
        onSubmit={handleSubmit((data: Position) => {
          const { label: value, parentId } = data;
          onSubmit({ value, label: value, parentId });
        })}
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
             {/* <option value="">-- Select a position --</option>
            {positions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))} */}
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