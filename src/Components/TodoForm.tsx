

interface ITodoForm {
  addTodo: (todo: { name: string, todo: string }) => void;
  todoItem: { name: string, todo: string };
  setTodoItem: (todoItem: { name: string, todo: string }) => void;
  selectedId: null| number, 
}


const TodoForm: React.FC<ITodoForm> = (props) => {
  const { addTodo, setTodoItem, todoItem, selectedId } = props;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //insteadof const handleChange: React.ChangeEventHandler<HTMLInputElement> I could write (e: React.ChangeEvent<HTMLInputElement>)
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value }); // [e.target.name]:e.target.value s an object property shorthand syntax that dynamically sets a new property on the object using the value of e.target.name as the property name and e.target.value as the property value.
    console.log("Todo Value is", todoItem);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(); /* This prevents the webpage to be refreshed so that the current data is visible*/
    console.log("TodoValue On submit", todoItem); // we see the data at the moment of submitting not the new value which was set
    addTodo(todoItem);
    setTodoItem({ name: "", todo: "" }); // This clears the value of the input field after the form is submitted.
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={todoItem.name}
        required
        minLength={2}
      />
      <input
        type="text"
        name="todo" // this line makes a big difference while assigning e.target.value to a state. so be sure to add this. By assigning a unique name attribute to each input field we can distinguish between them in the handleChange function.
        value={todoItem.todo}
        onChange={handleChange}
        //   onChange={e => setTodoValue(e.target.value) /*this line can used instead of above line and the related code on handleChange */
        placeholder="Your todo task"
        required
        minLength={2}
      />

      <button type="submit">{selectedId === null ? "Submit" : "Update"}</button>
      {/* <button type="reset"> Reset</button>  this line still does not work */}
    </form>
  );
};

export default TodoForm;
