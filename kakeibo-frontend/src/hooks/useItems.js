import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8081/api";

export function useItems() {
  const [items, setItems] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // ★ 並び替え順のState管理（初期値: id_asc）
  // id_asc (入力古い順), id_desc (入力新しい順), date_desc (日付新しい順), date_asc (日付古い順)
  const [sortOrder, setSortOrder] = useState("id_asc");

  // エラーメッセージ管理State
  const [errorMessage, setErrorMessage] = useState("");

  // フォーム状態
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState("支出");
  const [tag, setTag] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // データ取得関数
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("データ取得失敗:", error);
      setErrorMessage("データの取得/保存に失敗しました");
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("データ取得失敗:", error);
        setErrorMessage("データの取得/保存に失敗しました");
      }
    };

    loadItems();
  }, []);

  const resetForm = () => {
    setDate("");
    setType("支出");
    setTag("");
    setAmount("");
    setDescription("");
    setEditingId(null);
    setErrorMessage("");
  };

  // 必須項目入力バリデーションチェック
  const validateForm = () => {
    if (!date || !amount || !type || !tag) {
      setErrorMessage("未入力の項目があります。入力内容を確認してください。");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      } else {
        setErrorMessage("データの取得/保存に失敗しました");
      }
    } catch (err) {
      console.error("保存失敗:", err);
      setErrorMessage("データの取得/保存に失敗しました");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      } else {
        setErrorMessage("データの取得/保存に失敗しました");
      }
    } catch (err) {
      console.error("更新失敗:", err);
      setErrorMessage("データの取得/保存に失敗しました");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
      } else {
        setErrorMessage("データの取得/保存に失敗しました");
      }
    } catch (err) {
      console.error("削除失敗:", err);
      setErrorMessage("データの取得/保存に失敗しました");
    }
  };

  const handleStartEdit = (item) => {
    setErrorMessage("");
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

  // 1. 月・種別の絞り込み
  const rawFilteredItems = items.filter((i) => {
    const matchMonth = selectedMonth
      ? i.date && i.date.startsWith(selectedMonth)
      : true;
    const matchType = selectedType ? i.type === selectedType : true;
    return matchMonth && matchType;
  });

  // 2. ★ 安全な並び替え処理（エラーが出ないようガード）
  const filteredItems = [...rawFilteredItems].sort((a, b) => {
    if (sortOrder === "id_asc") {
      return (a.id || 0) - (b.id || 0); // 入力順 (古い順/ID昇順)
    }
    if (sortOrder === "id_desc") {
      return (b.id || 0) - (a.id || 0); // 入力順 (新しい順/ID降順)
    }
    if (sortOrder === "date_desc") {
      const dateA = a.date || "";
      const dateB = b.date || "";
      return dateB.localeCompare(dateA) || (b.id || 0) - (a.id || 0); // 日付降順 (同じ日付ならID降順)
    }
    if (sortOrder === "date_asc") {
      const dateA = a.date || "";
      const dateB = b.date || "";
      return dateA.localeCompare(dateB) || (a.id || 0) - (b.id || 0); // 日付昇順 (同じ日付ならID昇順)
    }
    return 0;
  });

  return {
    currentView,
    setCurrentView,
    selectedMonth,
    setSelectedMonth,
    selectedType,
    setSelectedType,
    sortOrder,
    setSortOrder,
    errorMessage,
    setErrorMessage,
    editingId,
    formState: {
      id: editingId,
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
