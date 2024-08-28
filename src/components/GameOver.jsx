import "../styles/gameover.css"
export default function GameOver({restart}) {
    return (
            <div className="game-over">
                <h1>Game Over :(</h1>
                <button onClick={() => restart()}>Restart ?</button>
            </div>
    )
}