import type { NextPage } from "next";
import Table from "../components/layout/Table";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react'
import Card from "../components/layout/Card";

import { fetchTodosAsync, addTodoAsync, resetTodo, updateAsync } from "../redux/slices/todo";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch fetchTodosAsync when the component mounts
    dispatch(fetchTodosAsync());

    
  }, [dispatch]);





  return (
    <div className={styles.container}>
      <div className="grid grid-rows-1 grid-flow-col gap-4">
      <Card title="Form" actionButtonLabel={"Todo"} secondaryButtonLabel={"Hello World"}>
        <Form />
      </Card>
      <Card title="Todo" actionButtonLabel={"Todo"} secondaryButtonLabel={"Hello World"}>
        <Table/>
      </Card>

    </div>
</div>
  );
};

const Form = function () {
  const todo = useSelector((state) => state.todos.todo);

  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [form, setForm] = useState({ todo: '', description: '', id: null });


  useEffect(() => {
    if (todo) {
      setForm({ ...form, todo: todo.todo, description: todo.description, id: todo.id });
      setId(todo.id);
      setIsUpdate(true);
    } else {
      setForm({ todo: '', description: '', id: null });
      setId(null);
      setIsUpdate(false);
    }
  }, [todo]);
  const dispatch = useDispatch();
  const submitTodo = (event) => {
    event.preventDefault();
    if(isUpdate) {
      dispatch(updateAsync(form));
    }  else {
      dispatch(addTodoAsync(form));
    }

    setForm({ todo: '', description: '', id: null });
  };

  const removeTodo = (index) => {
    
  };

  return (

    <form action="#" onSubmit={submitTodo}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Todo?</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.todo} 
        required
          
          onChange={(e) => setForm({ ...form, todo: e.target.value })}/>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description?</span>
        </div>
        <textarea
          required
          placeholder="Type something meaningful here..."
          className="textarea input-bordered w-full resize-none rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={500}
          aria-label="Enter your text"
          value={form.description}
        ></textarea>
      </label>

      <button className="btn btn-primary mt-2 mr-2 " type="submit">{isUpdate ? 'Update' : 'Add'}</button>
      {isUpdate && <button className="btn btn-primary mt-2 mr-2 "  onClick={() => dispatch(resetTodo(null))} type="button">Cancel</button>}

    </form>
  );
}