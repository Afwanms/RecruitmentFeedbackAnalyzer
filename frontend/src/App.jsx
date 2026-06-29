import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CandidateDetail from "./pages/CandidateDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/candidates/:candidateId"
        element={<CandidateDetail />}
      />
    </Routes>
  );
}

export default App;