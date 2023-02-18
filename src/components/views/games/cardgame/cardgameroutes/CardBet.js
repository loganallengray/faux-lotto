export const CardBet = ({player, userChoices, setUserChoices, handleStart}) => {
    return (
        <form>
            <fieldset id="card-options">
                <div id="currency-amount">Current Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                <div id="card-options-header">
                    <label>Bet Amount</label>
                    <div>
                        <label>Bet all?</label>
                        <input 
                            type="checkbox" 
                            checked={userChoices.subtract}
                            onChange={(event) => {
                                const copy = {...userChoices}
                                copy.betAll = event.target.checked
                                setUserChoices(copy)
                            }} />
                    </div>
                </div>
            </fieldset>
            <fieldset id="card-amount">
                <input 
                    id="cards-amount-input"
                    type="number" 
                    placeholder="Set amount here..."
                    min="0" 
                    max={player.currency}
                    value={userChoices.amountBet}
                    onChange={(event) => {
                        const copy = {...userChoices}
                        copy.amountBet = event.target.value
                        setUserChoices(copy)
                }} />
                <button 
                    id="card-submit"
                    onClick={(event) => { handleStart(event) }}
                >Start Game</button>
            </fieldset>
        </form>
    )
}