import React from "react";

function Search({ value, placeholder, id, handleInputChange, type, className, label }) {

  return (
    <div className="flex flex-col items-center justify-center my-6 max-w-[400px] mx-auto">
      <label htmlFor={id} className="text-[16px] sm:text-[24px] font-semibold mb-4">{label}</label>
      <input
        id={id}
        type={type}
        onChange={handleInputChange}
        value={value}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

export default Search;
