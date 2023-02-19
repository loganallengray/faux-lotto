import { useEffect, useState } from "react";
import { CardGameHit } from "./CardGameHit";
import { CardGameStartLogic } from "./CardGameStartLogic";
import { CardGameRouting } from "./CardGameRouting";
import { CardGameEndLogic } from "./CardGameEndLogic";
import { CardGameStay } from "./CardGameStay";
import "./CardGame.css";

export const CardGame = ({player, setPlayer}) => {
    const [gameProgress, setGameProgress] = useState(1)
    const [results, setResults] = useState({
        win: false,
        desc: ""
    })
    const [gameProps, setGameProps] = useState({
        deck: [],
        dealerDeck: [],
        playerDeck: [],
        dealerSum: 0,
        playerSum: 0,
        dealerAceCount: 0,
        playerAceCount: 0,
        hidden: {}
,    })
    const [userChoices, setUserChoices] = useState({
        amountBet: false,
        betAll: false
    })

    useEffect(() => {
        fetch(`http://localhost:8088/cards`)
            .then((res) => res.json())
            .then((data) => {
                const copy = gameProps
                copy.deck = data
                setGameProps(copy)
            })
    }, []);

    useEffect(() => {
        if (!(gameProps.playerSum < 21) || gameProps.playerSum === 21) {
            CardGameEndLogic(gameProps, setGameProps, results, setResults, setGameProgress, sendToApi)
        }
    }, [gameProps]);

    const sendToApi = (results, gameProps) => {
        const playerToEdit = {...player}

        const gameToSend = {
            playerId: player.id,
            amountBet: parseFloat(userChoices.amountBet),
            newAmount: 0,
            win: results.win,
            featured: false,
            date: new Date().toLocaleDateString()
        }

        if (userChoices.betAll) {
            gameToSend.amountBet = player.currency
        }

        if (results.win) {
            gameToSend.newAmount = gameToSend.amountBet * 1.5;
            playerToEdit.currency += gameToSend.newAmount;
            playerToEdit.wins += 1
        } else {
            playerToEdit.currency -= gameToSend.amountBet
            playerToEdit.losses += 1
        }

        let gameId = 0

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
        fetch(`http://localhost:8088/cardGames`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameToSend),
            })
                .then((res) => res.json())
                .then((data) => {
                    const promisePlayerArray = [];
                    for (let card of gameProps.playerDeck) {
                        const cardDeckItem = {
                            cardGameId: data.id,
                            cardId: card.id
                        }
                        promisePlayerArray.push(
                            fetch(`http://localhost:8088/playerDecks`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(cardDeckItem),
                            })
                        )
                    }
                    Promise.all(promisePlayerArray)

                    fetch(`http://localhost:8088/dealerDecks`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({cardGameId: data.id, cardId: gameProps.hidden.id}),
                    })

                    const promiseDealerArray = [];
                    for (let card of gameProps.dealerDeck) {
                        const cardDeckItem = {
                            cardGameId: data.id,
                            cardId: card.id
                        }
                        promiseDealerArray.push(
                            fetch(`http://localhost:8088/dealerDecks`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(cardDeckItem),
                            })
                        )
                    }
                    Promise.all(promiseDealerArray)
                })
    }

    const handleStart = (event) => {
        event.preventDefault()

        if (userChoices.amountBet && parseFloat(userChoices.amountBet) !== 0 && parseFloat(userChoices.amountBet) <= player.currency 
        || userChoices.betAll === true && player.currency !== 0) {
            CardGameStartLogic(gameProps, setGameProps, gameProgress)
            setGameProgress(2)
        }
    }

    const handleHit = (event) => {
        event.preventDefault()

        CardGameHit(gameProps, setGameProps)
    }

    const handleStay = (event) => {
        event.preventDefault()

        const newGameProp = CardGameStay(gameProps, setGameProps)
        CardGameEndLogic(newGameProp, setGameProps, results, setResults, setGameProgress, sendToApi)
    }

    return (
        <>
            <h2 className="page-title">Blackjack</h2>
            <main id="main-content">
                <CardGameRouting 
                    gameProgress={gameProgress} 
                    setGameProgress={setGameProgress} 
                    gameProps={gameProps}
                    player={player} 
                    userChoices={userChoices} 
                    setUserChoices={setUserChoices} 
                    result={results}
                    handleStart={handleStart} 
                    handleHit={handleHit} 
                    handleStay={handleStay} />
            </main>
        </>
    )
}