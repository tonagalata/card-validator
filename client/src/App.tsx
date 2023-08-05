import "./App.css";
import ValidateCard from "./components/ValidateCard";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/validate-card" element={<ValidateCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
