import PlayerEntry from "./PlayerEntry.jsx";
import "../styles/app.css"
import {useEffect, useState} from "react";
import Gameboard from "./Gameboard.jsx";
import {useImmer} from "use-immer";
import GameOver from "./GameOver.jsx";
import GameWon from "./GameWon.jsx";
import Score from "./Score.jsx";
import getPokemon from "../scripts/API.js";

function shuffle(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}





function App() {
    const [playerName, setPlayerName] = useState("Ash");
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [isVisible, setVisibility] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);
    const [recordScore, setRecordScore] = useState(0);
    const [iconArray, setIconArray] = useImmer([
        {id: 0, name: "Chikorita", isClicked: false, sprite: null},
        {id: 1, name: "Cyndaquil", isClicked: false, sprite: null},
        {id: 2, name: "Totodile", isClicked: false, sprite: null},
        {id: 3, name: "Hoothoot", isClicked: false, sprite: null},
        {id: 4, name: "Mareep", isClicked: false, sprite: null},
        {id: 5, name: "Marill", isClicked: false, sprite: null},
        {id: 6, name: "Sudowoodo", isClicked: false, sprite: null},
        {id: 7, name: "Sentret", isClicked: false, sprite: null},
        {id: 8, name: "Natu", isClicked: false, sprite: null},
        {id: 9, name: "Swinub", isClicked: false, sprite: null},
        {id: 10, name: "Cleffa", isClicked: false, sprite: null},
        {id: 11, name: "Wooper", isClicked: false, sprite: null},
    ]);

    async function loadData() {
        try {
            const updatedArray = await Promise.all(iconArray.map(async (icon) => {
                const sprite = await getPokemon(icon.name.toLowerCase());
                return { ...icon, sprite };
            }));
            setIconArray(updatedArray);
        } catch (error) {
            console.error("Error loading Pokemon data:", error);
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    console.log(iconArray)

    const handleCardClick = (id) => {
        setIconArray(draft => {
            const foundCard = draft.find(card => card.id === id);
                foundCard && foundCard.isClicked === true ? setGameOver(over => !over) : foundCard.isClicked = true;
        });


        setScore(score => score  + 1);
        score === 7 ? setGameWon(true) : null
        score >= recordScore ? setRecordScore(score + 1) : null
    };


    const changeName = (event) => {
        setPlayerName(event.target.value);
    }

    const logIn = () => {
        setTimeout(() => setHasLoggedIn(true), 900);
        setVisibility(false);
    }

    const restartGame = () => {
        setIconArray(draft => {
            draft.forEach((card) => {
                card.isClicked = false;
            });
        });

        setGameOver(false);
        setGameWon(false);
        setHasLoggedIn(false);
        setVisibility(true);
        setScore(0);
    };

    useEffect(() => {
        if (score > 0 && !gameOver && !gameWon) {
            setIconArray((array) => shuffle(array));
        }
    }, [score, gameOver, gameWon]);

    return (
            <div id="main-div">
                <Score score={score} playerName={playerName} maxScore={recordScore} />
                {!hasLoggedIn && (
                    <div className={`${isVisible ? "fade-in" : "fade-out"}`}>
                        <PlayerEntry name={playerName} onChange={changeName} logIn={logIn}/>
                    </div>
                )}

                {hasLoggedIn && !gameOver && !gameWon &&
                    <Gameboard iconsArray={iconArray.slice(0, 8)} onCardClick={handleCardClick}/>}
                {gameOver && <GameOver restart={restartGame}/>}
                {gameWon && !gameOver && <GameWon restart={restartGame}/>}
        </div>
    );
}

export default App;