// src/components/UserDropdown.jsx
import React, { useState } from "react";

const UserDropdown = ({ users, selectedUserId, setSelectedUserId }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          appearance-none
          w-full
          px-3 py-2
          pr-10
          rounded-lg
          border-2
          bg-white
          text-gray-700
          focus:outline-none
          focus:ring-2
          transition-all
          duration-200
          ease-in-out
          ${isFocused ? "border-amber-500 ring-amber-200" : "border-gray-200"}
          ${selectedUserId ? "text-gray-700" : "text-gray-500"}
          hover:border-amber-400
          shadow-sm
        `}
      >
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isFocused ? "transform rotate-180 text-amber-500" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserDropdown;