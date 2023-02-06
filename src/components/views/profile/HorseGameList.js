export const HorseGameList = ({horseGame, setHorseGames}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/horseGames/${horseGame.id}`, {
            method: "DELETE"
        })
            .then(() =>
                fetch(`http://localhost:8088/horseGames?playerId=${horseGame.playerId}&_expand=horse`)
                    .then((res) => res.json())
                    .then((data) => setHorseGames(data))
            )
    }

    return (horseGame.win ? (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game">
            <h4>Win - {horseGame?.horse?.name}</h4>
            <div>Amount Gained: ${parseFloat(horseGame.newAmount).toFixed(2)}</div>
            <div class="game--delete--container">
                <div>{horseGame.date}</div>
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ) : (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game">
            <h4>Loss - {horseGame?.horse?.name}</h4>
            <div>Amount Lost: ${parseFloat(horseGame.amountBet).toFixed(2)}</div>
            <div class="game--delete--container">
                <div>{horseGame.date}</div>
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ))
}