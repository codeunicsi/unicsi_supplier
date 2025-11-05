import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-medium mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brown-500"
    />
  </div>
);

export default InputField;
