const TAG_OPTIONS = ["食費", "日用品", "交通費", "交際費", "固定費", "その他"];

function ItemForm({
  title,
  submitLabel,
  id,
  date,
  setDate,
  type,
  setType,
  tag,
  setTag,
  amount,
  setAmount,
  description,
  setDescription,
  onSubmit,
  onCancel,
  isEditMode = false,
}) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <form onSubmit={onSubmit} noValidate>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <table
            className="rounded-table"
            style={{ flex: 1, tableLayout: "fixed" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#fcd6f2" }}>
                <th style={{ width: "8%" }}>ID</th>
                <th style={{ width: "18%" }}>日付</th>
                <th style={{ width: "10%" }}>区分</th>
                <th style={{ width: "18%" }}>金額</th>
                <th style={{ width: "28%" }}>摘要(20字以内)</th>
                <th style={{ width: "18%" }}>タグ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={id || "-"}
                    disabled
                    style={{
                      backgroundColor: "#f5f5f5",
                      textAlign: "center",
                      cursor: "not-allowed",
                    }}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="支出">支出</option>
                    <option value="収入">収入</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="text-right"
                    placeholder="金額を入力"
                    value={
                      amount !== "" && !isNaN(amount)
                        ? Number(amount).toLocaleString()
                        : ""
                    }
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");
                      setAmount(rawValue);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={20}
                  />
                </td>
                <td>
                  <select value={tag} onChange={(e) => setTag(e.target.value)}>
                    <option value="">選択</option>
                    {TAG_OPTIONS.map((optionTag) => (
                      <option key={optionTag} value={optionTag}>
                        {optionTag}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          {!isEditMode && (
            <div
              style={{
                width: "100px",
                alignSelf: "stretch",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "50%",
                  minHeight: "32px",
                  backgroundColor: "#fff59d",
                  border: "1px solid #fbc02d",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {submitLabel}
              </button>
            </div>
          )}
        </div>

        {isEditMode && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "15px",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "8px 28px",
                backgroundColor: "#c8e6c9",
                border: "1px solid #81c784",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {submitLabel}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: "8px 28px",
                  backgroundColor: "#ffcdd2",
                  border: "1px solid #e57373",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                キャンセル
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default ItemForm;
