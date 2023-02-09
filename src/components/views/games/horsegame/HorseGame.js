import { useEffect, useState } from "react"
import { HorseDisplay } from "./HorseDisplay"
import { HorseGameDisplay } from "./HorseGameDisplay"
import { HorseGameLogic } from "./HorseGameLogic"
import "./HorseGame.css"

export const HorseGame = ({player, setPlayer}) => {
    const [horses, setHorses] = useState([])
    const [chosenHorse, setChosenHorse] = useState({})
    const [showChosenHorse, setShowChosenHorse] = useState(false)
    const [userChoices, setUserChoices] = useState({
        horseId: 0,
        amountBet: false,
        betAll: false
    })
    const [results, setResults] = useState ({})
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8088/horses?_sort=chances&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setHorses(data)
            })
    }, []);

    useEffect(() => {
        if (userChoices.horseId !== 0) {
            setChosenHorse(horses.find(horse => horse.id === userChoices.horseId))
            setShowChosenHorse(true)
        } else {
            setChosenHorse({})
            setShowChosenHorse(false)
        }
    }, [userChoices]);
        
        const handleRace = (event) => {
            event.preventDefault()
            
            // check if all user options are filled out correctly
            if (parseFloat(userChoices.amountBet) !== 0 && parseFloat(userChoices.amountBet) <= player.currency && userChoices.horseId !== 0
                || userChoices.betAll === true && userChoices.call !== 0 && player.currency !== 0) {
                    const result = HorseGameLogic(horses, chosenHorse)
                    
                    const playerToEdit = {...player}
                
                    const gameToSend = {
                        playerId: player.id,
                        horseId: chosenHorse.id,
                        amountBet: parseFloat(userChoices.amountBet),
                        newAmount: 0,
                        win: result.win,
                        date: new Date().toLocaleDateString()
                    }
                    
                    // if bet all is selected, set amount bet to all of the player's currency
                    if (userChoices.betAll) {
                        gameToSend.amountBet = player.currency
                    }

                    // if user has won, take their bet and increase it by the odds of the horse
                    // edit player's currency and win/losses
                    if (result.win) {
                        const [toDollar, fromDollar] = result.horse.odds.split("-")
                        gameToSend.newAmount = (toDollar / fromDollar) * gameToSend.amountBet + gameToSend.amountBet
                        playerToEdit.currency += gameToSend.newAmount
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
                    fetch(`http://localhost:8088/horseGames`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(gameToSend),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            result.game = data
                            setResults(result)
                        })
                        .then(() => setShowResults(true))
        }
    }

    return (
        <>
            <h2>Horse Race</h2>
            <main id="main-content">
                <HorseGameDisplay results={results} showResults={showResults} />
                <form id="horse-form">
                    <fieldset id="horse-choice">
                        <select
                            onChange={(event) => {
                                const copy = {...userChoices}
                                copy.horseId = parseInt(event.target.value)
                                setUserChoices(copy)
                            }}
                        >
                            <option value="0">Choose a horse...</option>
                            {horses.map(horse => (
                                <option key={horse.id} value={horse.id}>{horse.name}</option>
                            ))}
                        </select>
                    </fieldset>
                    <HorseDisplay horse={chosenHorse} showHorse={showChosenHorse} />
                    <fieldset id="horse-options">
                        <div id="currency-amount">Current Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                        <div id="horse-options-header">
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
                    <fieldset id="horse-amount">
                        <input 
                            id="horse-amount-input"
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
                            id="horse-submit"
                            onClick={(event) => {
                                handleRace(event)
                            }}
                        >Start Race</button>
                    </fieldset>
                </form>
            </main>
        </>
    )
}