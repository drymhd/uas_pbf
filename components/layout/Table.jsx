import { useDispatch, useSelector } from "react-redux";
import { updateStatusAsync, getTodoAsync, deleteTodosAsync } from "../../redux/slices/todo";
export default function Table(props) {

const dispatch = useDispatch();

const todos = useSelector((state) => state.todos.todos);



  const updateTodo = async (id, status) => {
    dispatch(updateStatusAsync(id));
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr style={{ textAlign: 'left', width: '10%' }}>
            <th>
              <label>
                #
              </label>
            </th>
            <th style={{ width: '50%' }}>Todo</th>
            <th>Decription</th>
            <th style={{ width: '10%' }}>Action</th>
          </tr>
        </thead>
        <tbody>

          {todos.map((todo) => (
            <tr key={todo.id} className={todo.status == 'done' ? 'line-through bg-lime-800' : ''}>
              <th>
                <label>
                  <input type="checkbox" checked={todo.status == 'done' ? true : false} onChange={() => updateTodo(todo.id, todo.status)} className="radio" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold" >{todo.todo}</div>
                    <div className="text-sm opacity-50">{todo.status}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap"> {todo.description}</td>
              <td>
                <Action todo={todo} />
                </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
}



const Action = (props) => {
  const {todo} = props;

  const dispatch = useDispatch();

  const edit = async (id) => {
    dispatch(getTodoAsync(id));
  }


  if(todo.status != 'done') {
    return (
      <div>
        <button className="btn btn-ghost" onClick={() => edit(todo.id)}>Edit</button>
        <button className="btn btn-ghost" onClick={() => dispatch(deleteTodosAsync(todo.id))}>Delete</button>
      </div>
    )
  } else {
    return (
      <></>
    );
  }
}