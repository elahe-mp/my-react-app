import { useState } from "react";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";

const TodoListApp: React.FC = () => {
    const [todos, setTodos] = useState([] as { todo: string;  id: number}[]);

    const addTodo = (todoItem: { todo: string; id: number }) => {
      setTodos([...todos, todoItem]);
    };

    return (
        <div>
            <h1>Todo List:</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} />
        </div>
    )
}
export default TodoListApp;