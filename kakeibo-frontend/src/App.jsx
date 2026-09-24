import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth"; // カスタムフックのパスに合わせて変更してください
import TopPage from "./components/TopPage";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";

function App() {
  const auth = useAuth();

  return (
    <Routes>
      {/* ログイン画面 */}
      <Route
        path="/login"
        element={
          auth.isLoggedIn ? (
            <Navigate to="/top" replace />
          ) : (
            <LoginForm auth={auth} />
          )
        }
      />

      {/* トップ画面（要ログイン） */}
      <Route
        path="/top"
        element={
          auth.isLoggedIn ? (
            <TopPage
              auth={auth}
              onNavigateToItems={() => window.location.assign("/dashboard")}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ダッシュボード・一覧画面（要ログイン） */}
      <Route
        path="/dashboard"
        element={
          auth.isLoggedIn ? (
            <Dashboard
              auth={auth}
              onNavigateToTop={() => window.location.assign("/top")}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ルート（/）にアクセスした場合は、ログイン状態に応じてリダイレクト */}
      <Route
        path="*"
        element={<Navigate to={auth.isLoggedIn ? "/top" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
