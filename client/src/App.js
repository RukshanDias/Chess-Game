import "./App.css";
import ChessGame from "./components/ChessGame";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                <Route path="/" element={<ChessGame />} />
                <Route path="/login-register" element={<LoginRegister />} />
                <Route path="/leaderBoard" element={<LeaderBoard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
