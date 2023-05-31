import { useState } from "react";

interface ITodoForm{
    addTodo: (todoItem:{ todo: string, id: number }) => void;
}

const TodoForm: React.FC<ITodoForm> = ({ addTodo }) => {
    const [todoItem, setTodoItem] = useState({todo:'', id:0});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTodoItem((prevTodoItem) => ({
            todo: "",
            id: prevTodoItem.id + 1,
           }));
        addTodo(todoItem);
    }


    return (

        <div>
        Here you can add some tasks to your todo list:
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                value={todoItem.todo}
                    onChange={(e) => setTodoItem((prevTodoItem) => ({
                        ...prevTodoItem, 
                        todo: e.target.value,
                    }))
                }
            />
            <button type="submit">Add</button>
            </form>
            </div>
    );
};
export default TodoForm;