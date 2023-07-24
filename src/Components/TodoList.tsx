import { ITodo } from "../App";

interface ITodoList {
  todoList: ITodo[];
  handleDelete: (todoId: number) => void;
  handleEdit: (todoId: number) => void;
}

const TodoList: React.FC<ITodoList> = ({
  todoList,
  handleDelete,
  handleEdit,
}) => {
  return (
    <>
      <p>This is the list of your todos</p>
      <table className="todoTable">
        <thead>
          <tr>
            <th>Todo Id</th>
            <th>Name</th>
            <th>Todo</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(({ todoId, todoText, todoName }) => (
            <tr key={`${todoText}-${todoId}`}>
              <td>{todoId}</td>
              <td>{todoName}</td>
              <td>{todoText}</td>
              <td>
                <button type="button" onClick={() => handleEdit(todoId)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(todoId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TodoList;
