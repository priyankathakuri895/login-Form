import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth");

  // 🔒 Only allow if exactly "true"
  if (auth === "true") {
    return children;
  }

  // ❌ Otherwise go to login
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;