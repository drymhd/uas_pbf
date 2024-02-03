import type { NextPage } from "next";
import Table from "../components/layout/Table";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react'
import Card from "../components/layout/Card";

import { fetchTodosAsync } from "../redux/slices/todo";
import { useDispatch, useSelector } from "react-redux";

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
        <Card title="Created" actionButtonLabel={"Created"} secondaryButtonLabel={"Hello World"}>
          <Table data={todos} />
        </Card>
    </div>
  );
};
