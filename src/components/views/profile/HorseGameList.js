export const HorseGameList = ({horseGame, setHorseGames}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/horseGames/${horseGame.id}`, {
            method: "DELETE"
        })
            .then(() =>
                fetch(`http://localhost:8088/horseGames?playerId=${horseGame.playerId}&_expand=horse&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setHorseGames(data))
            )
    }

    const handleFeature = (event) => {
        event.preventDefault()

        const newGame = {
            featured: true
        }

        if (horseGame.featured) {
            newGame.featured = false
        }
    
        fetch(`http://localhost:8088/horseGames/${horseGame.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGame),
        })
            .then(() => 
                fetch(`http://localhost:8088/horseGames?playerId=${horseGame.playerId}&_expand=horse&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setHorseGames(data))
            )
    }

    return (horseGame.win ? (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game game--won">
            <h4>Win - {horseGame?.horse?.name}</h4>
            <div>Amount Gained: ${parseFloat(horseGame.newAmount).toFixed(2)}</div>
            <div>{horseGame.date}</div>
            <div class="game--delete--container">
                {horseGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ) : (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game game--lost">
            <h4>Loss - {horseGame?.horse?.name}</h4>
            <div>Amount Lost: ${parseFloat(horseGame.amountBet).toFixed(2)}</div>
            <div>{horseGame.date}</div>
            <div class="game--delete--container">
                {horseGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ))
}