import React from "react";
import "./LeaderBoard.css";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
    const navigate = useNavigate();

    const playGame = () => {
        navigate("/");
    };

    return (
        <div className="leaderBoard">
            <header className="leaderBoard-header">
                <button className="btn" onClick={playGame}>
                    Play
                </button>
            </header>
            <div className="leaderBoard-container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-header">Leaderboard</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="overflow-table">
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
            {/* <footer className="leaderBoard-footer">Chess Game</footer> */}
        </div>
    );
};

export default LeaderBoard;
