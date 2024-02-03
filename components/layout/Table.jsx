import { useDispatch } from "react-redux";
import { updateStatusAsync } from "../../redux/slices/todo";
export default function Table(props) {

const dispatch = useDispatch();

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
                Action
              </label>
            </th>
            <th style={{ width: '50%' }}>Todo</th>
            <th>Decription</th>
          </tr>
        </thead>
        <tbody>

          {props.data.map((todo) => (
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
            </tr>
          ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
}
