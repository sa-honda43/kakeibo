import React from "react";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import { useItems } from "../hooks/useItems";

function Dashboard({ auth }) {
  const {
    currentView,
    setCurrentView,
    selectedMonth,
    setSelectedMonth,
    formState,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStartEdit,
    resetForm,
    availableMonths,
    filteredItems,
  } = useItems();

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>家計簿アプリ</h1>
        <button onClick={auth.handleLogout}>ログアウト</button>
      </div>

      {currentView === "edit" ? (
        <ItemForm
          title="明細編集画面"
          submitLabel="更新する"
          {...formState}
          onSubmit={handleUpdate}
          onCancel={() => {
            resetForm();
            setCurrentView("list");
          }}
        />
      ) : (
        <div>
          <ItemForm
            title="新規明細登録"
            submitLabel="追加"
            {...formState}
            onSubmit={handleCreate}
          />
          <hr />
          <ItemList
            items={filteredItems}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            availableMonths={availableMonths}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
