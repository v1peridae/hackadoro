import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>("");

  const addTodo = () => {
    if (todoText) {
      const newTodo: Todo = { id: Date.now(), text: todoText, completed: false };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-[#7f1a5d3b] text-[#69316D] rounded-3xl mx-10 mb-10 mt-12 font-neuebit p-5 text-center">
      <h2 className="text-5xl text-textone mb-5">To-Do List</h2>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="w-full mb-3 px-4 py-2 text-3xl rounded-md"
        placeholder="Add a new task"
      />
      <button onClick={addTodo} className="text-4xl text-[#69316D] px-5 py-2 bg-textone rounded-md">
        Add Task
      </button>
      <ul className="mt-5 text-left text-3xl">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center my-2">
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} className="mr-3" />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500 ml-3">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
