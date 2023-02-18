export const CardResult = ({result}) => {
    if (result.win) {
        return (
            <div>
                <h3 class="card-result-header">You won! Want to play again?</h3>
            </div>
        )
    } else {
        return (
            <div>
                <h3 class="card-result-header">You lost! Want to try again?</h3>
            </div>
        )
    }
}