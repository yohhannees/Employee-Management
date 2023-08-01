import { useForm } from "react-hook-form";
import { Employee } from "./Employee";
import axios from "axios";
import { useState, useEffect } from "react";

interface EmployeeFormProps {
  onSubmit: (data: Employee) => void;
}
interface Position {
  value: string;
  label: string;
  parentId: number;
}
export const EmployeeForm = ({ onSubmit }: EmployeeFormProps) => {
  const { register, handleSubmit, setValue } = useForm<Employee>();

  const handleCreateOrUpdateEmployee = async (employee: Employee) => {
    await axios.post("http://localhost:5000/employees", employee);
  };

  const [positions, setPositions] = useState<Position[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/positions").then((response) => {
      setPositions(response.data);
    });
  }, []);

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPosition = positions.find(
      (position) => position.value === e.target.value
    );
    if (selectedPosition) {
      setValue("parentId", selectedPosition.parentId);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ml-48 my-20 pb-0 mb-4">Add Employee</h1>
      <form
        onSubmit={handleSubmit(onSubmit || handleCreateOrUpdateEmployee)}
        className="space-y-4 ml-48  pb-0 mb-4"
      >
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            className="border border-gray-300 w-full p-2 rounded"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="position" className="block mb-1">
            Position
          </label>
          <select
            id="position"
            className="border border-gray-300 w-full p-2 rounded"
            {...register("position", { required: true })}
            onChange={handlePositionChange}
          >
            <option value="">-- Select a position --</option>
            {positions.map((position) => (
              <option key={position.value} value={position.value}>
                {position.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 active:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
