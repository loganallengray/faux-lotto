export const HorseGameList = ({horseGame, setHorseGames}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/horseGames/${horseGame.id}`, {
            method: "DELETE"
        })
            .then(
                fetch(`http://localhost:8088/horseGames?playerId=${horseGame.playerId}&_expand=horse`)
                    .then((res) => res.json())
                    .then((data) => setHorseGames(data))
            )
    }

    return (horseGame.win ? (
        <li key={horseGame.id}>
            <h4>Win - {horseGame?.horse?.name}</h4>
            <div>Amount Gained: ${horseGame.amountBet}</div>
            <div>{horseGame.date}</div>
            <button onClick={(event) => handleDelete(event)}>Delete</button>
        </li>
    ) : (
        <li key={horseGame.id}>
            <h4>Loss - {horseGame?.horse?.name}</h4>
            <div>Amount Lost: ${horseGame.amountBet}</div>
            <div>{horseGame.date}</div>
            <button onClick={(event) => handleDelete(event)}>Delete</button>
        </li>
    ))
}