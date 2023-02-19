export const FeaturedCardGameList = ({cardGame, dealerDecks, playerDecks}) => {
    return (cardGame.win ? (
        <li key={cardGame.id} id={`card-game-${cardGame.id}`} class="player--game game--won">
            <h3 className="player-name">{cardGame?.player?.name}</h3>
            <h4>Win</h4>
            <h5>Dealer's Hand</h5>
            <div class="summ-deck-container">
                {dealerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <h5>Player's Hand</h5>
            <div class="summ-deck-container">
                {playerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <div>Amount Gained: ${parseFloat(cardGame.newAmount).toFixed(2)}</div>
            <div>{cardGame.date}</div>
        </li>
    ) : (
        <li key={cardGame.id} id={`card-game-${cardGame.id}`} class="player--game game--lost">
            <h3 className="player-name">{cardGame?.player?.name}</h3>
            <h4>Loss</h4>
            <h5>Dealer's Hand</h5>
            <div class="summ-deck-container">
                {dealerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <h5>Player's Hand</h5>
            <div class="summ-deck-container">
                {playerDecks.filter((deck) => deck.cardGameId === cardGame.id).map((card) => { return (
                    <div key={card.id} class="summ-card-container">
                                <img src={`cards/${card?.card?.name}.png`} />    
                            </div>
                        )})}
            </div>
            <div>Amount Lost: ${parseFloat(cardGame.amountBet).toFixed(2)}</div>
            <div>{cardGame.date}</div>
        </li>
    ))
}