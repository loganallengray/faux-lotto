export const CoinGameList = ({coinGame, setCoinGames}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/coinGames/${coinGame.id}`, {
            method: "DELETE"
        })
            .then(() => 
                fetch(`http://localhost:8088/coinGames?playerId=${coinGame.playerId}&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setCoinGames(data))
            )
    }

    const handleFeature = (event) => {
        event.preventDefault()

        const newGame = {
            featured: true
        }

        if (coinGame.featured) {
            newGame.featured = false
        }
    
        fetch(`http://localhost:8088/coinGames/${coinGame.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGame),
        })
            .then(() => 
                fetch(`http://localhost:8088/coinGames?playerId=${coinGame.playerId}&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setCoinGames(data))
            )
    }

    return (coinGame.win ? (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game game--won">
            <h4>Win - {coinGame.choice}</h4>
            <div>Amount Gained: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div>{coinGame.date}</div>
            <div class="game--delete--container">
                {coinGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ) : (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game game--lost">
            <h4>Loss - {coinGame.choice}</h4>
            <div>Amount Lost: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div>{coinGame.date}</div>
            <div class="game--delete--container">
            {coinGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ))
}