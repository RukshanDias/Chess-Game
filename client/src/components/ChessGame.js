import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import axios from "axios";
import "./ChessGame.css";
import Dashboard from "./Dashboard/Dashboard";

const ChessGame = () => {
    // state
    const [game, setGame] = useState(new Chess());
    const [currentTimeout, setCurrentTimeout] = useState(undefined);
    const [optionSquare, setOptionSquares] = useState({});
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [result, setResult] = useState(null);
    const [username, setUsername] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);

    // effects
    useEffect(() => {
        if (result && username) {
            // if points not null
            axios
                .post(process.env.REACT_APP_SERVER_URL + "/api/user/updateData", { username, result })
                .then((res) => {
                    console.log("result updated");
                })
                .catch((err) => {
                    console.error(err);
                    alert("error occured");
                });
        }
    }, [result]);

    // set username if logged in
    useEffect(() => {
        console.log(sessionStorage);
        const storedUsername = sessionStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername.replace(/^['"]|['"]$/g, ""));
        }
        console.log(username);
    }, []);

    // Functions & Methods

    const safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    };

    function onDrop(sourceSquare, targetSquare) {
        const gameCopy = { ...game };
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });
        setGame(gameCopy);

        // illegal move
        if (move === null) {
            console.log("wrong move");
            alert("illegal move..");
            return false;
        }
        if (isGameOver()) return true;
        // computers turn
        setIsUserTurn(false);

        // store timeout so it can be cleared on undo/reset so computer doesn't execute move
        const newTimeout = setTimeout(makeRandomMove, 200);
        setCurrentTimeout(newTimeout);

        return true;
    }

    const isGameOver = () => {
        console.log("checking game");
        if (game.game_over()) {
            alert("game over");
            if (isUserTurn) {
                alert("you won");
                setResult("won");
            } else {
                alert("you lose");
                setResult("lost");
            }
            return true;
        } else if (game.in_draw()) {
            alert("draw");
            setResult("draw");
            return true;
        }
        return false;
    };

    function makeRandomMove() {
        const possibleMoves = game.moves();

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        console.log("random no:" + randomIndex);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });

        if (isGameOver()) return; // check game over
        setIsUserTurn(true); //users turn
    }

    const onMouseOverSquare = (square) => {
        // alert("hover" + square);
        const moves = game.moves({
            square,
            verbose: true,
        });
        console.log(moves);
        if (moves.length === 0) {
            return;
        }

        const newSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) && game.get(move.to).color !== game.get(square).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        console.log(newSquares);
        setOptionSquares(newSquares);
    };

    return (
        <div className="ChessGame">
            <Chessboard
                position={(username && isGameStarted) ? game.fen() : ""}
                onPieceDrop={onDrop}
                customSquareStyles={{ ...optionSquare }}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={() => setOptionSquares({})}
            />
            <Dashboard username={username} isUserTurn={isUserTurn} game={game} isGameStarted={setIsGameStarted}/>
        </div>
    );
};

export default ChessGame;
