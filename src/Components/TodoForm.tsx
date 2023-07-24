import { ChangeEventHandler, useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FieldErrors,
} from "react-hook-form";

interface ITodoForm {
  addTodo: (
    todo: { name: string; todo: string },
    selectedId: number | null
  ) => void;
  todoItem: { name: string; todo: string };
  setTodoItem: (todoItem: { name: string; todo: string }) => void;
  selectedId: null | number;
}

// for transfering the form to react hook form we need to delete some part of the code and substite them with useform and related codes.
const TodoForm: React.FC<ITodoForm> = (props) => {
  const { addTodo, setTodoItem, todoItem, selectedId } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitting },
    reset,
    // watch,
  } = useForm({
    defaultValues: {
      name: todoItem.name,
      todo: todoItem.todo,
    },
    mode: "onSubmit", // it is defualt and no need to type it, it triggers the validation on a specefic event, in this case onSubmit, but can be changed to other options such as onTouch, on blur and etc.
  });

  //it is recommended to use reset inside useEffect rather than submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //insteadof const handleChange: React.ChangeEventHandler<HTMLInputElement> I could write (e: React.ChangeEvent<HTMLInputElement>)
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value }); // [e.target.name]:e.target.value s an object property shorthand syntax that dynamically sets a new property on the object using the value of e.target.name as the property name and e.target.value as the property value.
    console.log("Todo Value is", todoItem);
  };

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    // e.preventDefault(); /* This prevents the webpage to be refreshed so that the current data is visible*/
    console.log("TodoValue On submit", todoItem); // we see the data at the moment of submitting not the new value which was set
    addTodo(todoItem, selectedId);
    setTodoItem({ name: "", todo: "" }); // This clears the value of the input field after the form is submitted.
  };
  const onError = (errors: FieldErrors) => {
    console.log("Form Errors", errors);
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit(onSubmit, onError)}>
      <label htmlFor="name">Your name:</label>
      <input
        {...register("name", {
          required: "this is required",
          minLength: 2,
          onChange,
        })}
        // defaultValue={todoItem.name}
        placeholder="Enter Your Name"
        value={todoItem.name}
      />
      {errors.name && <p>This field is required.</p>}
      {/* <input
        type="text"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={todoItem.name}
        required
        minLength={2}
      /> */}
      <label htmlFor="todo"> Your task:</label>
      <input
        {...register("todo", {
          required: true,
          minLength: 2,
          onChange,
          // disabled: watch("name")==="", // this disables the field unless the previous field is filled with data
        })}
        value={todoItem.todo}
        // defaultValue={todoItem.todo}
        placeholder="Your todo task"
      />
      {errors.todo && (
        <p>This field is required and the minimum length is 2 chars.</p>
      )}

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {selectedId === null ? "Submit" : "Update"}
      </button>
      {/* <button type="reset"> Reset</button>  this line still does not work */}
    </form>
  );
};

export default TodoForm;
