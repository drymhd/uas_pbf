import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Rename fetchTodos to fetchTodosAsync to avoid conflicts
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

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [], // Corrected the state property name to be plural 'todos'
    loading: false,
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
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
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo } = todoSlice.actions;
export { fetchTodosAsync }; // Export only once with a different name
export default todoSlice.reducer;