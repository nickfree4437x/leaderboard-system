import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClaimHistory from "./Components/ClaimHistory"; // Assuming it's still in components

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim-history" element={<ClaimHistory />} />
      </Routes>
  );
}

export default App;
