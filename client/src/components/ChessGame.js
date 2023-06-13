import React from "react";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const ChessGame = () => {
    const [game, setGame] = useState(new Chess());
    const [currentTimeout, setCurrentTimeout] = useState(undefined);

    const safeGameMutate = (modify) => {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    };

    function onDrop(sourceSquare, targetSquare) {
        // const gameCopy = { ...game };
        const gameCopy = new Chess(game.fen());
        console.log(game);
        console.log(gameCopy);
        console.log(sourceSquare);
        console.log(targetSquare);
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });
        console.log(move);
        setGame(gameCopy);

        // illegal move
        if (move === null) return false;

        // store timeout so it can be cleared on undo/reset so computer doesn't execute move
        const newTimeout = setTimeout(makeRandomMove, 200);
        setCurrentTimeout(newTimeout);
        return true;
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
    }

    return (
        <div className="App">
            {/* <Chessboard/> */}
            <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
    );
};

export default ChessGame;
