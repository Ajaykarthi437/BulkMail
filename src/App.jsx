import React from "react";  // This is required for JSX to work in versions prior to React 17.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MailForm from "./components/MailForm.jsx";
import MailHistory from "./components/MailHistory.jsx";

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #eef2ff, #f3e8ff)", padding: "1.5rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "700", textAlign: "center", color: "#4c51bf" }}>
          MERN Bulk Mail App
        </h1>
        <Routes>
          <Route path="/" element={<MailForm />} />
          <Route path="/history" element={<MailHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;