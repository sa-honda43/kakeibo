function ItemList({
  items,
  selectedMonth,
  setSelectedMonth,
  availableMonths,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>明細一覧</h2>
        <div>
          <label style={{ fontWeight: "bold", marginRight: "5px" }}>
            対象月:{" "}
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">すべての月</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="rounded-table">
        <thead>
          <tr style={{ backgroundColor: "#f2f7d9" }}>
            <th>日付</th>
            <th>区分</th>
            <th>タグ</th>
            <th>金額</th>
            <th>摘要</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "#666" }}>
                該当する明細がありません
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.tag}</td>
                <td>{Number(item.amount).toLocaleString()}円</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => onEdit(item)}>編集</button>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
