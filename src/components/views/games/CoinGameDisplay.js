export const CoinGameDisplay = ({results, showResults}) => {
    if (showResults) {
        return (
            <div id="coin--display">
                {results.outcome}
            </div>
        )
    }
}