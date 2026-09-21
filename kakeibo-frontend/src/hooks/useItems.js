import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8081/api";

export function useItems() {
  const [items, setItems] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedMonth, setSelectedMonth] = useState("");

  // フォーム状態
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState("支出");
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
  };

  // ★Dashboard表示時に無条件でデータ取得を実行
  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setDate("");
    setType("支出");
    setTag("");
    setAmount("");
    setDescription("");
    setEditingId(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          type,
          tag,
          amount: Number(amount),
          description,
        }),
      });
      if (res.ok) {
        resetForm();
        fetchItems();
      }
    } catch (err) {
      console.error("保存失敗:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/items/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          type,
          tag,
          amount: Number(amount),
          description,
        }),
      });
      if (res.ok) {
        resetForm();
        setCurrentView("list");
        fetchItems();
      }
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error("削除失敗:", err);
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setDate(item.date || "");
    setType(item.type || "支出");
    setTag(item.tag || "");
    setAmount(item.amount || "");
    setDescription(item.description || "");
    setCurrentView("edit");
  };

  // 抽出計算
  const availableMonths = Array.from(
    new Set(
      items.map((i) => (i.date ? i.date.slice(0, 7) : "")).filter(Boolean),
    ),
  ).sort();

  const filteredItems = selectedMonth
    ? items.filter((i) => i.date && i.date.startsWith(selectedMonth))
    : items;

  return {
    currentView,
    setCurrentView,
    selectedMonth,
    setSelectedMonth,
    formState: {
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
    },
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStartEdit,
    resetForm,
    availableMonths,
    filteredItems,
  };
}
