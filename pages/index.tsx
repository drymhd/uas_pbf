import type { NextPage } from "next";
import Table from "../components/layout/Table";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react'
import Card from "../components/layout/Card";

import { fetchTodosAsync, addTodoAsync } from "../redux/slices/todo";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Checkbox } from 'react-daisyui';

import { show } from "../services/todoService";
import { componentShapes } from "react-daisyui/dist/constants";


export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);


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
        <Table data={todos} />
      </Card>

    </div>
</div>
  );
};

const Form = function () {
  const [form, setForm] = useState({ todo: '', description: ''});
  const dispatch = useDispatch();
  const addTodo = (event) => {
    event.preventDefault();
    dispatch(addTodoAsync(form));

    setForm({ todo: '', description: '' });
  };

  const removeTodo = (index) => {
    
  };

  return (

    <form action="#" onSubmit={addTodo}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Todo?</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-bordered w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.todo} 
          onChange={(e) => setForm({ ...form, todo: e.target.value })}/>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description?</span>
        </div>
        <textarea
          placeholder="Type something meaningful here..."
          className="textarea input-bordered w-full resize-none rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={500}
          aria-label="Enter your text"
          value={form.description}
        ></textarea>
      </label>

      <button className="btn btn-primary mt-2" type="submit">Add</button>

    </form>
  );
}