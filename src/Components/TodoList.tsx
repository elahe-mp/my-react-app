
interface ITodoList {
    todos: {
        id: number,
        todo: string
    }[];

}

const TodoList: React.FC<ITodoList> = ({todos}) => {
    return (
      <ul>
        {todos.map((todo, id) => (
          <li key={`todo-${id}`}>
            id {`todo-${id}`} with the Todo name `{todo.todo}`{" "}
          </li>
        ))}
      </ul>
    );
};
export default TodoList;