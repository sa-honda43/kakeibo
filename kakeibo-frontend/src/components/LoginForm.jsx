import React from "react";

function LoginForm({ auth }) {
  // auth オブジェクトから必要な値・関数を取り出す
  const {
    loginId,
    setLoginId,
    password,
    setPassword,
    loginError,
    handleLogin,
  } = auth;

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>家計簿アプリ</h1>
      <br />
      <h2>ログイン</h2>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>ログインID: </label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>パスワード: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ marginTop: "15px" }}>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
