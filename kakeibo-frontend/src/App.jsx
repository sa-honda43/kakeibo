// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  const auth = useAuth();

  return (
    <Routes>
      {/* ログイン画面へのルート */}
      <Route
        path="/login"
        element={
          auth.isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginForm auth={auth} />
          )
        }
      />

      {/* ダッシュボード画面へのルート */}
      <Route
        path="/dashboard"
        element={
          auth.isLoggedIn ? (
            <Dashboard auth={auth} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ルートURL(/)やその他のアクセスはログイン状態に応じてリダイレクト */}
      <Route
        path="*"
        element={
          <Navigate to={auth.isLoggedIn ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
