import logo from "../assets/kakeibo_logo.jpeg";

function LoginForm({ auth }) {
  // 安全に取り出せるよう || {} を追加
  const {
    loginId = "",
    setLoginId = () => {},
    password = "",
    setPassword = () => {},
    loginError = "",
    handleLogin = () => {},
  } = auth || {};

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "380px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* ロゴ画像 */}
      <h1 style={{ margin: "0 0 20px 0" }}>
        <img
          src={logo}
          alt="家計簿アプリ"
          style={{
            height: "140px",
            width: "auto",
            display: "inline-block",
          }}
        />
      </h1>

      {/* ログイン枠 */}
      <div
        style={{
          border: "2px solid #d9e169",
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#eeefbe",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "20px" }}>ログイン</h2>

        {loginError && <p style={{ color: "red" }}>{loginError}</p>}

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <label style={{ width: "90px", fontSize: "14px" }}>
              ログインID:
            </label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <label style={{ width: "90px", fontSize: "14px" }}>
              パスワード:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ flex: 1, padding: "6px" }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "6px 20px",
                cursor: "pointer",
              }}
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
