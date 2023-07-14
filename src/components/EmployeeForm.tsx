import { useForm } from "react-hook-form";
import { Employee } from "./Employee";
import axios from "axios";
import { positions } from "./PositionLabel";

interface EmployeeFormProps {
  onSubmit: (data: Employee) => void;
}

export const EmployeeForm = ({ onSubmit }: EmployeeFormProps) => {
  const { register, handleSubmit, setValue } = useForm<Employee>();

  const handleCreateOrUpdateEmployee = async (employee: Employee) => {
    await axios.post("http://localhost:5000/employees", employee);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPosition = positions.find(
      (position) => position.value === e.target.value
    );
    if (selectedPosition) {
      setValue("parentId", selectedPosition.parentId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit || handleCreateOrUpdateEmployee)}
      className="space-y-4"
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
        className="bg-green-500 active:bg-red-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};
