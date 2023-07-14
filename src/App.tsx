import { useState } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

export interface ITodo {
  todoId: number;
  todoText: string;
  todoName: string;
}

const App: React.FC = () => {
  const [todoItem, setTodoItem] = useState({ name: "", todo: "" });
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [currentId, setCurrentId] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addTodo = (todo: { name: string; todo: string }) => {
    if (selectedId !== null) {
      //Edithing an existing todo
      const updatedTodoList = todoList.map((todoItem) =>
        todoItem.todoId === selectedId
          ? { ...todoItem, todoText: todo.todo, todoName: todo.name }
          : todoItem
      );
      setTodoList(updatedTodoList);
      setTodoItem({ name: "", todo: "" });
      setSelectedId(null);
    } else {
      //adding a new todo
      const newTodo: ITodo = {
        todoId: currentId,
        todoText: todo.todo,
        todoName: todo.name,
      };
      setTodoList([...todoList, newTodo]);
      setCurrentId(currentId + 1);
    }
  }


  const handleDelete = (todoId: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.todoId !== todoId);
    setTodoList(updatedTodoList);
  };

  const handleEdit = (todoId: number) => {
    const foundItem = todoList.find((todo) => todo.todoId === todoId);
    // console.log("foundItem is", foundItem);
    if (foundItem) {
      setTodoItem({
        name: foundItem.todoName,
        todo: foundItem.todoText,
      }); // By this code we can see the selected data in the form
      setSelectedId(foundItem.todoId);
      // console.log(selectedId);
    }
  };

  return (
    <div>
      <h1>Welcome to may React App With TypeScript!</h1>
      <p>Let's start building amazing things with React and TypeScipt.</p>
      <TodoForm
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        addTodo={addTodo}
        selectedId={selectedId}
      />
      <TodoList
        todoList={todoList}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default App;
