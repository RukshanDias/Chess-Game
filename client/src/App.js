import "./App.css";
import ChessGame from "./components/ChessGame";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                <Route path="/" element={<ChessGame />} />
                <Route path="/login-register" element={<LoginRegister />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
