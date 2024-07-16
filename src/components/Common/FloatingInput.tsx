import React, { useState } from "react";

const FloatingLabelInput = ({ label, id, type, value, onChange, errorMsg, touched }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-6 w-full">
      <input
        type={type}
        id={id}
        className={`block w-full pt-5 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 peer ${isFocused || value ? 'placeholder-transparent' : ''}`}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={id}
        className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 peer-focus:left-2.5 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 ${isFocused || value ? 'scale-75 -translate-y-8' : ''}`}
      >
        {label}
      </label>
      {errorMsg && touched && (
        <div className="text-red-500 text-sm m-2">{errorMsg}</div>
      )}
    </div>
  )
}

export default FloatingLabelInput