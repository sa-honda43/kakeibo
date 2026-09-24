function ItemList({
  items,
  selectedMonth,
  setSelectedMonth,
  selectedType,
  setSelectedType,
  availableMonths,
  onEdit,
  onDelete,
}) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>明細一覧</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          {/* 区分フィルター */}
          <div>
            <label style={{ fontWeight: "bold", marginRight: "5px" }}>
              区分:{" "}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: "4px 6px", // ★ 上下6px、左右12pxの余白を追加して縦幅を拡大
                borderRadius: "4px", // ★ 角を少し丸く調整（お好みで）
              }}
            >
              <option value="">すべて</option>
              <option value="支出">支出</option>
              <option value="収入">収入</option>
            </select>
          </div>

          {/* 対象月フィルター */}
          <div>
            <label style={{ fontWeight: "bold", marginRight: "5px" }}>
              対象月:{" "}
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: "4px 6px", // ★ 上下6px、左右12pxの余白を追加して縦幅を拡大
                borderRadius: "4px", // ★ 角を少し丸く調整（お好みで）
              }}
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
      </div>

      <table
        className="rounded-table"
        style={{ width: "100%", tableLayout: "fixed" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#fccfe9" }}>
            <th style={{ width: "5%" }}>ID</th>
            <th style={{ width: "15%" }}>日付</th>
            <th style={{ width: "9%" }}>区分</th>
            <th style={{ width: "12%" }}>金額</th>
            <th style={{ width: "22%" }}>摘要</th>
            <th style={{ width: "14%" }}>タグ</th>
            <th style={{ width: "13%" }}></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#666" }}>
                該当する明細がありません
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>{item.id}</td>
                <td style={{ textAlign: "center" }}>{item.date}</td>
                <td style={{ textAlign: "center" }}>{item.type}</td>
                <td style={{ textAlign: "right", paddingRight: "8px" }}>
                  {Number(item.amount).toLocaleString()}円
                </td>
                <td>{item.description}</td>
                <td style={{ textAlign: "center" }}>{item.tag}</td>
                {/* 編集・削除ボタン（角丸・カラー・横並び） */}
                <td style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <button
                      onClick={() => onEdit(item)}
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#c8e6c9",
                        border: "1px solid #81c784",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      編集
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#ffcdd2",
                        border: "1px solid #e57373",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      削除
                    </button>
                  </div>
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
