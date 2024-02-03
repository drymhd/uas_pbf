import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo";


const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})

store.subscribe(() => {
    console.log("State Store change :", store.getState())
})

export default store;