import { Routes, Route, Navigate } from "react-router-dom";
import { CardTransactions } from "./features/CardTransactions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CardTransactions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
