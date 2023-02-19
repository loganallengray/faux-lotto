export const CardGameList = ({cardGame, setCardGames, dealerDecks, playerDecks}) => {
    const handleDelete = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/cardGames/${cardGame.id}`, {
            method: "DELETE"
        })
            .then(() => 
                fetch(`http://localhost:8088/cardGames?playerId=${cardGame.playerId}&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setCardGames(data))
            )
    }

    const handleFeature = (event) => {
        event.preventDefault()

        const newGame = {
            featured: true
        }

        if (cardGame.featured) {
            newGame.featured = false
        }
    
        fetch(`http://localhost:8088/cardGames/${cardGame.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGame),
        })
            .then(() => 
                fetch(`http://localhost:8088/cardGames?playerId=${cardGame.playerId}&_sort=id&_order=desc`)
                    .then((res) => res.json())
                    .then((data) => setCardGames(data))
            )
    }

    return (cardGame.win ? (
        <li key={cardGame.id} id={`card-game-${cardGame.id}`} class="player--game game--won">
            <h4>Win</h4>
            <h5>Dealer's Hand</h5>
            <div class="summ-deck-container">
                {dealerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <h5>Your Hand</h5>
            <div class="summ-deck-container">
                {playerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <div>Amount Gained: ${parseFloat(cardGame.newAmount).toFixed(2)}</div>
            <div>{cardGame.date}</div>
            <div class="game--delete--container">
                {cardGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ) : (
        <li key={cardGame.id} id={`card-game-${cardGame.id}`} class="player--game game--lost">
            <h4>Loss</h4>
            <h5>Dealer's Hand</h5>
            <div class="summ-deck-container">
                {dealerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <h5>Your Hand</h5>
            <div class="summ-deck-container">
                {playerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <div>Amount Lost: ${parseFloat(cardGame.amountBet).toFixed(2)}</div>
            <div>{cardGame.date}</div>
            <div class="game--delete--container">
            {cardGame.featured ? (<button class="game--unfeature" onClick={(event) => handleFeature(event)}>Unfeature</button>)
                : (<button class="game--feature" onClick={(event) => handleFeature(event)}>Feature</button>)}
                <button 
                    class="game--delete"
                    onClick={(event) => handleDelete(event)}
                >Delete</button>
            </div>
        </li>
    ))
}