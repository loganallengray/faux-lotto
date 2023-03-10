import { useState } from "react"
import { CoinGameDisplay } from "./CoinGameDisplay"
import { CoinGameLogic } from "./CoinGameLogic"
import "./CoinGame.css"

export const CoinGame = ({player, setPlayer}) => {
    const [userChoices, setUserChoices] = useState({
        call: true,
        amountBet: false,
        betAll: false
    })
    const [results, setResults] = useState ({})
    const [showResults, setShowResults] = useState(false)

    const handleFlip = (event) => {
        event.preventDefault()

        // check if all user options are filled out correctly
        if (userChoices.amountBet && parseFloat(userChoices.amountBet) !== 0 && parseFloat(userChoices.amountBet) <= player.currency && userChoices.call !== 0 
            || userChoices.betAll === true && userChoices.call !== 0 && player.currency !== 0) {
            const result = CoinGameLogic(userChoices.call)

            const playerToEdit = {...player}
            
            const gameToSend = {
                playerId: player.id,
                amountBet: parseFloat(userChoices.amountBet),
                choice: result.choice,
                outcome: result.flip,
                win: result.win,
                featured: false,
                date: new Date().toLocaleDateString()
            }
            
            // if bet all is selected, set amount bet to all of the player's currency
            if (userChoices.betAll) {
                gameToSend.amountBet = player.currency
            }

            // edit player's currency and win/losses
            if (result.win) {
                playerToEdit.currency += gameToSend.amountBet
                playerToEdit.wins += 1
            } else {
                playerToEdit.currency -= gameToSend.amountBet
                playerToEdit.losses += 1
            }

            fetch(`http://localhost:8088/players/${player.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(playerToEdit),
            })
                .then(() => { return fetch(`http://localhost:8088/players?id=${player.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setPlayer(data[0])
                    })})
            fetch(`http://localhost:8088/coinGames`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameToSend),
            })
                .then((res) => res.json())
                .then((data) => setResults(data))
                .then(() => setShowResults(true))
        }
    }

    return (
        <>
            <h2 className="page-title">Coin Game</h2>
            <main id="main-content">
                <CoinGameDisplay results={results} showResults={showResults} />
                <form id="coin-form">
                    <fieldset id="coin-choice">
                        <div className="coin-container">
                            {userChoices.call ? <button
                                className="coin-button"
                                onClick={(event) => {
                                    event.preventDefault()
                                    const copy = {...userChoices}
                                    copy.call = true
                                    setUserChoices(copy)
                            }}
                            >Heads</button>
                            : <button
                                className="coin-button coin-unselected"
                                onClick={(event) => {
                                    event.preventDefault()
                                    const copy = {...userChoices}
                                    copy.call = true
                                    setUserChoices(copy)
                            }}
                            >Heads</button>}
                        </div>
                        <div className="coin-container">
                            {userChoices.call ? <button
                            className="coin-button coin-unselected"
                                onClick={(event) => {
                                    event.preventDefault()
                                    const copy = {...userChoices}
                                    copy.call = false
                                    setUserChoices(copy)
                            }}
                            >Tails</button>
                            : <button
                            className="coin-button"
                                onClick={(event) => {
                                    event.preventDefault()
                                    const copy = {...userChoices}
                                    copy.call = false
                                    setUserChoices(copy)
                            }}
                            >Tails</button>}
                        </div>
                    </fieldset>
                    <fieldset id="coin-options">
                        <div id="currency-amount">Current Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                        <div id="coin-options-header">
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
                    <fieldset id="coin-amount">
                        <input 
                            id="coins-amount-input"
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
                            id="coin-submit"
                            onClick={(event) => {
                                handleFlip(event)
                            }}
                        >Flip Coin</button>
                    </fieldset>
                </form>
            </main>
        </>
    )
}