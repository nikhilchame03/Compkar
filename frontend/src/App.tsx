import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PracticeDashboard } from "@/pages/PracticeDashboard";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PracticeDashboard />} />
        <Route path="/question/:serial" element={<QuestionDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
