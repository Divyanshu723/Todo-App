import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const AddTodo = ({ addTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!taskDate) {
      setError("Please choose a date!");
      return;
    }
    if (!taskText.trim()) return;

    addTodo(taskText, taskDate);
    setTaskText("");
    setTaskDate("");
    setError("");
    setIsOpen(false);
  };

  return (
    <div className='flex items-center justify-between mt-5 bg-black bg-opacity-60 px-4 py-2 rounded-lg'>
      {/* Add Task Button */}
      <div className='flex gap-6 items-center cursor-pointer' onClick={() => setIsOpen(true)}>
        <FaPlus className='text-white' />
        <p className='text-lg text-white font-semibold'>Add a Task</p>
      </div>

      {/* Date Picker */}
      <div>
        <input
          type="date"
          className="bg-transparent text-gray-300 text-xl w-full focus:outline-none appearance-none"
          value={taskDate}
          onChange={(e) => {
            setTaskDate(e.target.value);
            setError(""); // Clear error when date is selected
          }}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-3">Add a Task</h2>

            {/* Task Input */}
            <input
              type="text"
              placeholder="Enter task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Add Button */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
