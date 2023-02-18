export const CardHands = ({gameProps}) => {
    return (
        <>
            <div>
                    <h3>Dealer's Hand</h3>
                    <div>{gameProps.hidden.name}</div>
                    {gameProps.dealerDeck.map((card) => { return (
                        <div key={card.id}>{card.name}</div>
                    )})}
                </div>
                <div>
                    <h3>Your Hand</h3>
                    {gameProps.playerDeck.map((card) => { return (
                        <div key={card.id}>{card.name}</div>
                    )})}
            </div>
        </>
    )
}