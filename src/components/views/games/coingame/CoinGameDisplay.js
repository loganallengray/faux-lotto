export const CoinGameDisplay = ({results, showResults}) => {
    if (showResults) {
        return (
            <div id="coin--display">
                <h2>{results.win ? `${results.outcome}, you win!` : `${results.outcome}, better luck next time!`}</h2>
                <div>{results.win ? `You got: ` : `You lost: `}${parseFloat(results.amountBet).toFixed(2)}</div>
            </div>
        )
    }
}