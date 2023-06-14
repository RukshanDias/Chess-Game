import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessGame = () => {
    // state
    const [game, setGame] = useState(new Chess());
    console.log(game);
    const [currentTimeout, setCurrentTimeout] = useState(undefined);

    // effects

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
        // makeRandomMove();
        const newTimeout = setTimeout(makeRandomMove, 200);
        setCurrentTimeout(newTimeout);
        return true;
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        console.log(possibleMoves);
        // exit if the game is over
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        console.log("random no:" + randomIndex);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
    }

    return (
        <div className="App">
            {/* <Chessboard/> */}
            <Chessboard position={game.fen()} onPieceDrop={onDrop}/>
        </div>
    );
};

export default ChessGame;
