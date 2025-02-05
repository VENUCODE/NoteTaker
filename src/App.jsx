import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/auth";
import { useAuth } from "./contexts/useAuth";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-200">
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Layout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
      </Routes>
    </div>
  );
}
