import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const PositionForm = () => {
  const [positionName, setPositionName] = useState("");
  const [parentId, setParentId] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      positionName,
      parentId,
    },
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/positions", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Position name"
        {...register("positionName", { required: true })}
        value={positionName}
        onChange={(e) => setPositionName(e.target.value)}
      />
      <select
        name="parentId"
        value={parentId}
        onChange={(e) => setParentId(e.target.value)}
      >
        <option value="">Select a parent position</option>
        <option value="5">Tech Lead</option>
        <option value="4">Product Owner</option>
        <option value="16">COO</option>
      </select>
      {errors.positionName && (
        <p className="text-red-500">Position name is required</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PositionForm;
