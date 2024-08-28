import "../styles/score.css"
export default function Score({playerName, score, maxScore}) {
   return ( <div className={"score-div"}>
        <h1>
            {playerName}`s score : {score}
        </h1>
           <h1>Record score : {maxScore}</h1>
    </div>
   )
}