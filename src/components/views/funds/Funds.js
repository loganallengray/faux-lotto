import { useState } from "react";
import "./funds.css"

export const Funds = ({player, setPlayer}) => {
    const [userChoices, setUserChoices] = useState({
        newFunds: false,
        subtract: false
    })

    /* 
        Send a player with updated currency property to the API with a fetch PUT
        refetch the player data to be updated on the page
        reset user choices
    */

    const handleSubmit = (event) => {
        event.preventDefault()

        if (userChoices.newFunds && userChoices.newFunds !== 0) {
            let newFunds = userChoices.newFunds;

            // Sets amount to negative if subtract is selected
            if(userChoices.subtract) {
                newFunds *= -1
            }

            const totalFunds = player.currency + parseFloat(newFunds);

            const playerToSend = {
                name: player.name,
                email: player.email,
                currency: totalFunds,
                wins: player.wins,
                losses: player.losses
            }

            fetch(`http://localhost:8088/players/${player.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(playerToSend),
            })
                .then(() => {
                    fetch(`http://localhost:8088/players?id=${player.id}`)
                        .then((res) => res.json())
                        .then((data) => {
                            setPlayer(data[0])
                        })
                })
        }
    }

    const handleReset = (event) => {
        event.preventDefault()

        const playerToSend = {
            name: player.name,
            email: player.email,
            currency: 0,
            wins: player.wins,
            losses: player.losses
        }

        fetch(`http://localhost:8088/players/${player.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerToSend),
        })
            .then(() => {
                fetch(`http://localhost:8088/players?id=${player.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setPlayer(data[0])
                    })
            })
    }

    return (
        <>
            <h2 className="page-title">Funds</h2>
            <main id="main-content">
                <div id="current-currency">
                    <div id="funds-display">Current Funds: ${parseFloat(player.currency).toFixed(2)}</div>
                    <button
                        id="funds-reset"
                        onClick={(event) => {
                            handleReset(event)
                        }}
                    >Set Funds to Zero
                    </button>
                </div>
                <form id="fund-form">
                    <fieldset id="fund-options">
                        <div id="fund-header">
                            <label id="fund-header-text">Add/Subtract Funds</label>
                            <div id="fund-subtract">
                                <label>Subtract?</label>
                                <input 
                                    id="subtract-input"
                                    type="checkbox" 
                                    checked={userChoices.subtract}
                                    onChange={(event) => {
                                        const copy = {...userChoices}
                                        copy.subtract = event.target.checked
                                        setUserChoices(copy)
                                    }} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset id="fund-amount">
                        <input 
                            id="funds-input"
                            type="number" 
                            placeholder="Set amount here..."
                            min="0" 
                            value={userChoices.newFunds}
                            onChange={(event) => {
                                const copy = {...userChoices}
                                copy.newFunds = event.target.value
                                setUserChoices(copy)
                            }} />
                        <button 
                            id="fund-submit"
                            onClick={(event) => {
                                handleSubmit(event)
                            }}
                        >Submit Order</button>
                    </fieldset>
                </form>
            </main>
        </>
    )
}