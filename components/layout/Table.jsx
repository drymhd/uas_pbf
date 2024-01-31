export default function Table(props) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                Action
              </label>
            </th>
            <th>Todo</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="radio" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="radio" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
        </tr>
          {/* row 3 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="radio" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            </tr>
          {/* row 4 */}
    </tbody>
        {/* foot */}
      </table>
    </div>
  );
}
