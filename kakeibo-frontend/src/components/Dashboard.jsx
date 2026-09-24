// src/components/Dashboard.jsx
import logo from "../assets/kakeibo_logo.jpeg";
import { useItems } from "../hooks/useItems";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";

function Dashboard({ auth, onNavigateToTop }) {
  const {
    currentView,
    setCurrentView,
    selectedMonth,
    setSelectedMonth,
    selectedType,
    setSelectedType,
    sortOrder,
    setSortOrder,
    errorMessage,
    formState,
    editingId,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStartEdit,
    resetForm,
    availableMonths,
    filteredItems,
  } = useItems();

  const logoutAction = auth?.handleLogout || auth;

  return (
    <div style={{ padding: "20px", maxWidth: "850px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <img
            src={logo}
            alt="家計簿アプリ"
            style={{
              height: "75px",
              width: "auto",
              display: "block",
            }}
          />
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onNavigateToTop}>トップページ</button>
          <button onClick={logoutAction}>ログアウト</button>
        </div>
      </div>

      {/* エラーメッセージ表示エリア */}
      {errorMessage && (
        <div
          style={{
            padding: "10px 15px",
            marginBottom: "15px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            border: "1px solid #ef9a9a",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {errorMessage}
        </div>
      )}

      {currentView === "edit" ? (
        <ItemForm
          title="明細編集画面"
          submitLabel="更新する"
          id={formState.id || editingId}
          {...formState}
          isEditMode={true}
          onSubmit={handleUpdate}
          onCancel={() => {
            resetForm();
            setCurrentView("list");
          }}
        />
      ) : (
        <div>
          {/*  並び替えドロップダウン操作エリア */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <label style={{ fontSize: "14px", fontWeight: "bold" }}>
              並び替え:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="id_asc">入力順（昇順）</option>
              <option value="id_desc">入力順（降順）</option>
              <option value="date_desc">日付順（降順）</option>
              <option value="date_asc">日付順（昇順）</option>
            </select>
          </div>

          <ItemList
            items={filteredItems}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            availableMonths={availableMonths}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <ItemForm
            submitLabel="登録"
            {...formState}
            isEditMode={false}
            onSubmit={handleCreate}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
