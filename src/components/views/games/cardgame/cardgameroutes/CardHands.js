import { CardHidden } from "./CardHidden"

export const CardHands = ({gameProps, gameProgress}) => {
    return (
        <>
            <div>
                <h3 class="deck-header">Dealer's Hand</h3>
                <div className="deck-container">
                    <div class="card-container">
                        <CardHidden gameProps={gameProps} gameProgress={gameProgress} />
                    </div>
                    {gameProps.dealerDeck.map((card) => { return (
                        <div key={card.id} class="card-container">
                            <img src={`cards/${card.name}.png`} />    
                        </div>
                    )})}
                </div>
            </div>
            <div>
                <h3 class="deck-header">Your Hand</h3>
                <div className="deck-container">
                    {gameProps.playerDeck.map((card) => { return (
                        <div key={card.id} class="card-container">
                            <img src={`cards/${card.name}.png`} />     
                        </div>
                    )})}
                </div>
            </div>
        </>
    )
}