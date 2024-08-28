import {useEffect, useState} from 'react';
import "../styles/gameboard.css";
import getPokemon from "../scripts/API.js";

function GameCard({source, onClick, id,name}) {
    return (
        <div className="game-card" onClick={() => onClick(id)}>
            <img src={source} alt="pokemon"/>
            <h1>{name}</h1>
        </div>
    );
}

export default function Gameboard({iconsArray, onCardClick}) {
    return (
        <div className="game-board">
            {iconsArray.map((card) => (
                <GameCard
                    onClick={onCardClick}
                    source={card.sprite}
                    name = {card.name}
                    id={card.id}
                    key={card.id}
                />
            ))}

        </div>
    );
}