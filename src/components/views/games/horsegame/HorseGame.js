import { useEffect, useState } from "react"
import { HorseDisplay } from "./HorseDisplay"
import { HorseGameDisplay } from "./HorseGameDisplay"
import { HorseGameLogic } from "./HorseGameLogic"

export const HorseGame = ({player, setPlayer}) => {
    const [horses, setHorses] = useState([])
    const [chosenHorse, setChosenHorse] = useState({})
    const [showChosenHorse, setShowChosenHorse] = useState(false)
    const [userChoices, setUserChoices] = useState({
        horseId: 0,
        amountBet: 0,
        betAll: false
    })
    const [results, setResults] = useState ({})
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8088/horses`)
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
            if (userChoices.amountBet !== 0 && userChoices.amountBet <= player.currency && userChoices.call !== 0 
                || userChoices.betAll === true && userChoices.call !== 0) {
                    const result = HorseGameLogic(horses, chosenHorse)
                    
                    const playerToEdit = {...player}
                
                    const gameToSend = {
                        playerId: player.id,
                        horseId: chosenHorse.id,
                        amountBet: userChoices.amountBet,
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
            <HorseGameDisplay results={results} showResults={showResults} />
            <form>
                <fieldset>
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
                    <HorseDisplay horse={chosenHorse} showHorse={showChosenHorse} />
                </fieldset>
                <fieldset>
                    <div>Current Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                    <label>Bet Amount</label>
                    <input 
                        type="number" 
                        placeholder="Set amount here..."
                        min="0" 
                        max={player.currency}
                        value={userChoices.amountBet}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.amountBet = parseFloat(event.target.value)
                            setUserChoices(copy)
                    }} />
                </fieldset>
                <fieldset>
                    <input 
                        type="checkbox" 
                        checked={userChoices.subtract}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.betAll = event.target.checked
                            setUserChoices(copy)
                        }} />
                    <label>Bet all?</label>
                </fieldset>
                <button 
                    onClick={(event) => {
                        handleRace(event)
                    }}
                >Start Race</button>
            </form>
        </>
    )
}