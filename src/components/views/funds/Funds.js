import { useState } from "react";

export const Funds = ({player, setPlayer}) => {
    const [userChoices, setUserChoices] = useState({
        newFunds: 0,
        subtract: false
    })

    /* 
        Send a player with updated currency property to the API with a fetch PUT
        refetch the player data to be updated on the page
        reset user choices
    */

    const handleSubmit = (event) => {
        event.preventDefault()

        if (userChoices.newFunds !== 0) {
            let newFunds = userChoices.newFunds;

            // Sets amount to negative if subtract is selected
            if(userChoices.subtract) {
                newFunds *= -1
            }

            const totalFunds = player.currency + newFunds;

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
                            setUserChoices({})
                        })
                })
        }
    }

    return (
        <>
            <h2>Funds</h2>
            <div>Current Funds: ${parseFloat(player.currency).toFixed(2)}</div>
            <form>
                <fieldset>
                    <label>Add/Subtract Funds</label>
                    <input 
                        type="number" 
                        placeholder="Set amount here..."
                        min="0" 
                        value={userChoices.newFunds}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.newFunds = parseFloat(event.target.value)
                            setUserChoices(copy)
                        }} />
                </fieldset>
                <fieldset>
                    <input 
                        type="checkbox" 
                        checked={userChoices.subtract}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.subtract = event.target.checked
                            setUserChoices(copy)
                        }} />
                    <label>Subtract?</label>
                    <button 
                        onClick={(event) => {
                            handleSubmit(event)
                        }}
                    >Submit Order</button>
                </fieldset>
            </form>
        </>
    )
}