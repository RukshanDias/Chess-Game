import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessGame = () => {
    // state
    const [game, setGame] = useState(new Chess());
    console.log(game);
    const [currentTimeout, setCurrentTimeout] = useState(undefined);
    const [optionSquare, setOptionSquares] = useState({});

    // effects

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
        console.log(move);
        setGame(gameCopy);

        // illegal move
        if (move === null) {
            console.log("wrong move");
            alert("illegal move..");
            return false;
        }

        // store timeout so it can be cleared on undo/reset so computer doesn't execute move
        const newTimeout = setTimeout(makeRandomMove, 200);
        setCurrentTimeout(newTimeout);
        return true;
    }

    const isGameOver = () => {
        console.log("checking game")
        if (game.game_over()) {
            alert("game over");
            return true;
        } else if (game.in_draw()) {
            alert("draw");
            return true;
        }
        return false;
    };

    function makeRandomMove() {
        const possibleMoves = game.moves();
        console.log(possibleMoves);
        // exit if the game is over
        // if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
        if(isGameOver())return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        console.log("random no:" + randomIndex);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
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
        <div className="App">
            {/* <Chessboard/> */}
            <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                customSquareStyles={{ ...optionSquare }}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={() => setOptionSquares({})}
            />
        </div>
    );
};

export default ChessGame;
