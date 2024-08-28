import "../styles/playerEntry.css"
export default function PlayerEntry({name,onChange,logIn}) {
    return(
    <div id="player-form">
        <h1 className="text-3xl">Welcome to the Memory Game</h1>
        <h2>Please insert your name to start a game :)</h2>
        <input type="text" id="playerName" placeholder="Name" value={name} onChange ={onChange}/>
        <button onClick={logIn}>JUMP IN</button>
    </div>);
}