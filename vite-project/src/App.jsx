import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "@/views";
import Login from "@/views/Auth/Login";
import Register from "@/views/Auth/Register";
import NotFound from "@/views/NotFound";

import "@/assets/css/tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;