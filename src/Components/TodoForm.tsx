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

const TodoForm: React.FC<ITodoForm> = (props) => {
  const { addTodo, setTodoItem, todoItem, selectedId } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      todo: "",
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
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Minimum length is 2 character",
          },
          onChange,
        })}
        placeholder="Enter Your Name"
        value={todoItem.name}
      />
      {errors.name && <p>{errors.name?.message}</p>}

      <label htmlFor="todo"> Your task:</label>
      <input
        {...register("todo", {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Minimum length is 2 character",
          },
          onChange,
          // disabled: watch("name") === "", // this disables the field unless the previous field is filled with data
        })}
        value={todoItem.todo}
        placeholder="Your todo task"
      />
      {errors.todo && <p>{errors.todo?.message}</p>}

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {selectedId === null ? "Submit" : "Update"}
      </button>
      <button
        type="button"
        onClick={() => reset()}
        disabled={watch("name") === "" && watch("todo") === ""}
      >
        Reset
      </button>
    </form>
  );
};
export default TodoForm;
