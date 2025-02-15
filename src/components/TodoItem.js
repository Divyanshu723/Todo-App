import React, { useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdClose } from 'react-icons/io';

const TodoItem = ({ todo, deleteTodo, toggleCompletion }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteTask = () => {
    deleteTodo(todo.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className='flex items-center justify-between bg-white px-5 py-3 rounded-md my-3'>
      <div className='flex gap-4 items-center'>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleCompletion(todo.id)}
          className='w-6 h-6'
        />
        <div>
          <p className={`${todo.isCompleted ? "line-through text-gray-500" : "text-black"} font-medium text-xl`}>
            {todo.text}
          </p>
          <p className={`${todo.isCompleted ? "line-through text-blue-300" : "text-blue-500"} font-medium text-xl`}>{todo.date}</p>
        </div>
      </div>

      <div onClick={() => setIsDeleteModalOpen(true)}>
        <AiOutlineDelete className='text-2xl cursor-pointer' />
      </div>

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl font-bold mb-3">Are you sure you want to delete this task?</h2>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
