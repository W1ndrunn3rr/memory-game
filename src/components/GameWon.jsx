import "../styles/gamewon.css"
export default function GameWon({restart}) {
    return (
        <div className="game-won">
            <h1>Game Won :)</h1>
            <button onClick={() => restart()}>Restart ? </button>
        </div>
    )
}