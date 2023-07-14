import { ITodo } from "../App";
// interface ITodo {
//     id: number;
//     text: string;
// }

interface ITodoList {
    todoList: ITodo[];
    handleDelete: (todoId: number) => void;
    handleEdit: (todoId: number) => void;
}

const TodoList: React.FC<ITodoList> = ({ todoList, handleDelete, handleEdit }) => {


  return (
    <>
      <p>This is the list of your todos</p>
      <table className="todoTable">
        <tr>
          <th>Todo Id</th>
          <th>Name</th>
          <th>Todo</th>
          <th>actions</th>
        </tr>
        {todoList.map(({ todoId, todoText, todoName }) => (
          <tr key={`${todoText}-${todoId}`}>
            <td>{todoId}</td>
            <td>{todoName}</td>
            <td>{todoText}</td>
            <td>
              <button type="button" onClick={()=>handleEdit(todoId)}>Edit</button>
              {/*  this part is not yet activated*/}
              <button type="button" onClick={()=>handleDelete(todoId)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
export default TodoList;
