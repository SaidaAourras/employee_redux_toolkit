import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Form from "./components/form";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./components/Employees";
import Materials from "./components/Materials";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/add" element={<Form />} />
          <Route path="/materials" element={<Materials />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
