// import { type } from "os";
import { ChangeEventHandler, useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FieldErrors,
} from "react-hook-form";

// type AddTodoFn = (todo: { name: string; todo: string }) => void; // this is a sample and can be used instead of interface but inteface are better in some aspects

interface ITodoForm {
  addTodo: (todo: { name: string; todo: string }) => void;
  // in case of useing a type we could even use them here, for example :
  //addTodo :AddTodoFn
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

  const onChange :ChangeEventHandler<HTMLInputElement> = (e) => {
    //instead of const handleChange: React.ChangeEventHandler<HTMLInputElement> I could write (e: React.ChangeEvent<HTMLInputElement>)
    setTodoItem({ ...todoItem, [e.target.name]: e.target.value }); // [e.target.name]:e.target.value s an object property shorthand syntax that dynamically sets a new property on the object using the value of e.target.name as the property name and e.target.value as the property value.
    console.log("Todo Value is", todoItem);
  };

  const onSubmit: SubmitHandler<FieldValues> = (e) => {
    // e.preventDefault(); /* This prevents the webpage to be refreshed so that the current data is visible*/
    console.log("TodoValue On submit", todoItem); // we see the data at the moment of submitting not the new value which was set
    addTodo(todoItem);
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
          minLength: { value: 2, message: "Minimum length is 2 characters" },
          onChange,
        })}
        // defaultValue={todoItem.name}
        placeholder="Enter Your Name"
        value={todoItem.name}
      />
      {errors.name && <p>{errors.name?.message}</p>}
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
          required: "This field is required",
          minLength: {
            value: 2, 
            message:"Minimum length is 2 characters"
          } ,
          onChange,
          // disabled: watch("name")==="", // this disables the field unless the previous field is filled with data
        })}
        value={todoItem.todo}
        // defaultValue={todoItem.todo}
        placeholder="Your todo task"
      />
      {errors.todo && <p>{errors.todo?.message}</p>}

      {/* <input */}
      {/* type="text" */}
      {/* name="todo" // this line makes a big difference while assigning e.target.value to a state. so be sure to add this. By assigning a unique name attribute to each input field we can distinguish between them in the handleChange function. */}
      {/* value={todoItem.todo} */}
      {/* onChange={handleChange} */}
      {/* //   onChange={e => setTodoValue(e.target.value) /*this line can used instead of above line and the related code on handleChange */}
      {/* placeholder="Your todo task" */}
      {/* required */}
      {/* minLength={2} */}
      {/* /> */}

      <button type="submit" disabled={!isDirty || isSubmitting}>
        {selectedId === null ? "Submit" : "Update"}
      </button>
      {/* <button type="reset"> Reset</button>  this line still does not work */}
    </form>
  );
};

export default TodoForm;
