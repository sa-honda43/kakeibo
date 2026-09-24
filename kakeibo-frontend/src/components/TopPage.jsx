import logo from "../assets/kakeibo_logo.jpeg";

function TopPage({ auth, onNavigateToItems }) {
  // auth オブジェクトまたは直接渡された関数の両方に対応
  const logoutAction = auth?.handleLogout || auth;

  return (
    <div
      style={{
        padding: "30px 0",
        width: "80%",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* ヘッダーエリア */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
          width: "100%",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <img
            src={logo}
            alt="家計簿システム"
            style={{
              height: "85px",
              width: "auto",
              display: "block",
            }}
          />
        </h1>
        <button
          onClick={logoutAction}
          style={{
            padding: "5px 14px",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>

      {/* メインコンテンツ */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "250px",
        }}
      >
        <button
          onClick={onNavigateToItems}
          style={{
            width: "320px",
            height: "100px",
            backgroundColor: "#ffe591",
            border: "1px solid #916841",
            borderRadius: "14px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#70541a",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          入出金明細一覧画面へ
        </button>
      </div>
    </div>
  );
}

export default TopPage;
