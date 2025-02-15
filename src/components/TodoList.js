import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, toggleCompletion }) => {
    return (
        <div>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleCompletion={toggleCompletion} />
            ))}
        </div>
    );
};

export default TodoList;
