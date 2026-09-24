import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8081/api";

export function useAuth() {
  // ① 初期値指定時に localStorage を参照（リロードしてもログイン状態を維持）
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: loginId, password }),
      });

      if (response.ok) {
        // ② ログイン成功時に localStorage に保存
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setLoginId("");
        setPassword("");
        navigate("/top");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "ログインに失敗しました");
      }
    } catch (error) {
      setLoginError("通信エラーが発生しました");
    }
  };

  // ③ ログアウト時に localStorage を破棄して状態変更
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return {
    isLoggedIn,
    loginId,
    setLoginId,
    password,
    setPassword,
    loginError,
    handleLogin,
    handleLogout,
  };
}
