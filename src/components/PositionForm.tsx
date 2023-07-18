import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  label: string;
  value: string;
  parentId: number;
};

const PositionForm = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    axios
      .post("http://localhost:5000/positions", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-4">
        <label htmlFor="label" className="block text-gray-700 font-bold mb-2">
          Position Name
        </label>
        <input
          type="text"
          id="label"
          {...register("label")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="parentId"
          className="block text-gray-700 font-bold mb-2"
        >
          Parent Position
        </label>
        <select
          id="parentId"
          {...register("parentId")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a parent position</option>
          <option value={5}>Tech Lead</option>
          <option value={4}>Product Owner</option>
          <option value={16}>COO</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default PositionForm;
