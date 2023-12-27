import React from "react";
import InputField from "../components/InputField";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Employment Type</h4>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test"
          id="test"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark"></span>Any Time
      </label>
      <InputField
        handleChange={handleChange}
        value="full-time"
        title="Full-time"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="temporary"
        title="Temporary"
        name="test"
      />
      <InputField
        handleChange={handleChange}
        value="part-time"
        title="Part-time"
        name="test"
      />
    </div>
  );
};

export default EmploymentType;
