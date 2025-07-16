import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning('Please enter a user name');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("https://leaderboard-system-7ik6.onrender.com/api/users", { name });
      setName("");
      onUserAdded();
      toast.success('User added successfully!');
    } catch (err) {
      console.error("Failed to add user:", err);
      toast.error('Failed to add user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleAddUser}
      className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl"
    >

      <div className="flex flex-col sm:flex-row -mt-8 gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`
              w-full px-2 py-2 pr-12 border-2 rounded-lg
              focus:outline-none transition duration-200
              ${name.trim() ? "border-amber-400" : "border-gray-300"}
              focus:border-amber-400 focus:ring-1 focus:ring-amber-200
              placeholder-gray-400
            `}
          />
          {name && (
            <motion.button
              type="button"
              onClick={() => setName("")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
            </motion.button>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={!name.trim() || isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            px-3 py-2 rounded-lg text-white
            transition-all duration-300
            focus:outline-none focus:ring-1 focus:ring-offset-2
            shadow-md flex items-center justify-center gap-2
            ${!name.trim() || isSubmitting
              ? "bg-amber-600 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:ring-amber-300"
            }
          `}
        >
          {isSubmitting ? (
            <>
              Adding...
            </>
          ) : (
            <>
              Add User
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddUserForm;
