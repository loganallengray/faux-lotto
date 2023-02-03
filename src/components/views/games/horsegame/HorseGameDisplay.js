export const HorseGameDisplay = ({results, showResults}) => {
    if (showResults) {
        const game = results.game
        const horse = results.horse;

        return (
            <div id="horseWin--display">
                <h2>{results.win ? `${horse.name} won!` : `Sorry, ${horse.name} took first place!`}</h2>
                <div>{results.win ? `You got: $${parseFloat(game.newAmount).toFixed(2)}` : `You lost: $${parseFloat(game.amountBet).toFixed(2)}`}</div>
            </div>
        )
    }
}