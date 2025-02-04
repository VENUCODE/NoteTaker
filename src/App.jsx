import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/auth";

export default function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen p-2  gap-4 bg-slate-200">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
