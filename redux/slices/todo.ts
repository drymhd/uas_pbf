import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';


const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await fetch('/api/todo');
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});


const deleteTodosAsync = createAsyncThunk('todos/delete/:id', async (id:any) => {
  try {
    const response = await fetch('/api/todo/'+id, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});

const updateStatusAsync = createAsyncThunk('todos/updateStatus', async (id) => {
  try {
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({ id, type: "update_status" }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});
const updateAsync = createAsyncThunk('todos/update/:id', async (form:any) => {
  try {
    const { id } = form;


    const response = await fetch('/api/todo/'+id, {
      method: 'POST',
      body: JSON.stringify({form}),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});

const addTodoAsync = createAsyncThunk('todos/add', async (form) => {
  try {
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({ form , type: "store" }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});

const getTodoAsync = createAsyncThunk('api/todos/:id', async (id) => {
  try {
    const response = await fetch('/api/todo/'+id, {
      method: 'GET',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Handle errors here if needed
    throw error;
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    todo: null,
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    resetTodo: (state, action) => {
      state.todo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.todos.sort((a,b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));

      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteTodosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodosAsync.fulfilled, (state, action) => {
        state.loading = false;

        let index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        state.todos.splice(index, 1);


      })
      .addCase(deleteTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        
        
        // If you want to update the existing state instead of pushing a new todo
        state.todos = state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo));

        state.todos.sort((a,b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
      })
      .addCase(updateStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        
        
        // If you want to update the existing state instead of pushing a new todo
        state.todos.push(action.payload);
        state.todos.sort((a,b) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
   
      builder
      .addCase(getTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
       state.todo = action.payload
      })
      .addCase(getTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      

      builder
      .addCase(updateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todo = null;
        console.log(action.payload);
        
        state.todos = state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo));

        console.log(action.payload);
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, resetTodo } = todoSlice.actions;
export { fetchTodosAsync, updateStatusAsync, addTodoAsync, getTodoAsync, updateAsync, deleteTodosAsync };
export default todoSlice.reducer;