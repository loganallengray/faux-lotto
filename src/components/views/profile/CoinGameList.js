export const CoinGameList = ({coinGame, setCoinGames}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/coinGames/${coinGame.id}`, {
            method: "DELETE"
        })
            .then(() => 
                fetch(`http://localhost:8088/coinGames?playerId=${coinGame.playerId}`)
                    .then((res) => res.json())
                    .then((data) => setCoinGames(data))
            )
    }

    return (coinGame.win ? (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game">
            <h4>Win - {coinGame.choice}</h4>
            <div>Amount Gained: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div class="game--delete--container">
                <div>{coinGame.date}</div>
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ) : (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game">
            <h4>Loss - {coinGame.choice}</h4>
            <div>Amount Lost: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div class="game--delete--container">
                <div>{coinGame.date}</div>
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ))
}