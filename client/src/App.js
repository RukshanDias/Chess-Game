import "./App.css";
import { useState } from 'react';
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'

function App() {
  const [game, setGame] = useState(new Chess());
    return (
        <div className="App">
          <Chessboard/>
            {/* <Chessboard position={game.fen()} onPieceDrop={onDrop} /> */}
        </div>
    );
}

export default App;
