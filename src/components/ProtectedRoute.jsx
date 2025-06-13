// src/components/ProtectedRoute.jsx
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { state } = useAppContext();

  const currentTeacher = state.currentTeacher || JSON.parse(localStorage.getItem("currentTeacher"));

  if (!currentTeacher) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
