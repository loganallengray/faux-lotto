export const CoinGameDisplay = ({results, showResults}) => {
    if (showResults) {
        return (
            <div id="coin--display">
                <h2>{results.win ? `${results.outcome}, you win!` : `${results.outcome}, better luck next time!`}</h2>
                <div>{results.win ? `You got: $${results.amountBet}` : `You lost: $${results.amountBet}`}</div>
            </div>
        )
    }
}