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
      <h1 className="text-2xl font-bold ml-48 mb-4">Add Position</h1>
      <form className="space-y-4 ml-48 mt-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Position Name
          </label>
          <input
            id="name"
            className="border border-gray-300 w-full p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="parent" className="block mb-1">
            Parent Position
          </label>
          <select
            id="parent"
            className="border border-gray-300 w-full p-2 rounded"
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
    </div>
  );
};
