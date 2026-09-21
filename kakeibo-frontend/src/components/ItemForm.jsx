// src/components/ItemForm.jsx
import React from "react";

const TAG_OPTIONS = ["食費", "日用品", "交通費", "交際費", "固定費", "その他"];

function ItemForm({
  title,
  submitLabel,
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
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <table
          className="rounded-table"
          style={{ width: "100%", tableLayout: "fixed" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f7d9" }}>
              <th style={{ width: "15%" }}>日付</th>
              <th style={{ width: "10%" }}>区分</th>
              <th style={{ width: "10%" }}>タグ</th>
              <th style={{ width: "13%" }}>金額</th>
              <th style={{ width: "25%" }}>摘要(20字以内)</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </td>
              <td>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="支出">支出</option>
                  <option value="収入">収入</option>
                </select>
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
              <td>
                <input
                  type="text"
                  inputMode="numeric"
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
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={20}
                />
              </td>
              <td>
                <button type="submit">{submitLabel}</button>
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    style={{ marginLeft: "5px" }}
                  >
                    キャンセル
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default ItemForm;
