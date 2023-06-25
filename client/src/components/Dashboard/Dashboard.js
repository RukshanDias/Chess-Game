import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Dashboard.css";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    let username = props.username;
    const isUserTurn = props.isUserTurn;

    const startGame = () => {
        if (!username) {
            setIsLoggedIn(false);
            alert("pls login");
            navigate("/login-register");
        } else {
            setIsLoggedIn(true);
            setIsGameStarted(true);
            props.isGameStarted(true);
        }
    };

    // navigate commands
    const resetGame = () => {
        props.game.reset();
        setIsGameStarted(false);
        props.isGameStarted(false);
        navigate("/");
    };
    const viewLeaderboard = () => {
        navigate("/leaderBoard");
    };
    return (
        <div>
            <div className="container">
                {!isGameStarted && (
                    <button className="start-btn" onClick={startGame}>
                        start
                    </button>
                )}

                {isGameStarted && (
                    <div className="dashBoard">
                        <div className="user">logged in as {username}</div>
                        <div className="tagline">{username} vs computer</div>
                        <div className="turn"> Turn: {isUserTurn ? username : "Computer"}</div>
                        <div className="footer">
                            <button onClick={resetGame}>reset</button>
                            <button onClick={viewLeaderboard}>view Leaderboard</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
