import "./App.css";
import ChessGame from "./components/ChessGame";

function App() {
    return (
        <div className="App">
          {/* <Chessboard/> */}
            {/* <Chessboard position={game.fen()} onPieceDrop={onDrop} /> */}
            <ChessGame/>
        </div>
    );
}

export default App;
