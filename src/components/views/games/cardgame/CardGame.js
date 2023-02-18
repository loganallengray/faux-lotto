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
        if (!(gameProps.playerSum <= 21)) {
            CardGameEndLogic(gameProps, setGameProps, results, setResults, setGameProgress)
        }
    }, [gameProps]);

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
        CardGameEndLogic(newGameProp, setGameProps, results, setResults, setGameProgress)
    }

    console.log(results)

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