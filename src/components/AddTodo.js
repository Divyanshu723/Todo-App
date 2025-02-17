import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const AddTodo = ({ addTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTask = () => {
    if (!taskDate) {
      alert("Please choose a date!");
      return;
    }
    if (!taskText.trim()) return;

    addTodo(taskText, taskDate);
    setTaskText("");
    setTaskDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  return (
    <div className='flex items-center justify-between mt-5 bg-black bg-opacity-60 px-4 py-2 rounded-lg'>

      {!isOpen ? (
        <div className='flex gap-6 items-center' >
          <FaPlus className='text-white text-2xl' />
          <p className='text-lg text-white font-semibold cursor-pointer' onClick={() => setIsOpen(true)}>Add a Task</p>
        </div>
      ) : (
        <div className='flex items-center bg-transparent gap-5 bg-opacity-60 rounded-md'>
            <FaPlus className='text-white cursor-pointer text-2xl' onClick={handleAddTask} />
          <div className='flex gap-2 items-center'>
              <input
                type="text"
                placeholder="Enter task..."
                autoFocus="true"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask();
                  }
                }}
                className="w-40 bg-transparent text-white font-semibold placeholder-gray-300 focus:outline-none"
              />
              <IoMdClose className='text-white cursor-pointer text-xl' onClick={() => {
                setIsOpen(false)
                setTaskText("")
              }} />
          </div>
        </div>
      )}


      <div>
        <input
          type="date"
          className="bg-transparent text-gray-300 text-xl w-full focus:outline-none appearance-none"
          value={taskDate}
          onChange={(e) => {
            setTaskDate(e.target.value);
          }}
        />
      </div>

     
    </div>
  );
};

export default AddTodo;
