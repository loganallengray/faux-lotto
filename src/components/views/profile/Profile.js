import { useEffect, useState } from "react";
import { CardGameList } from "./CardGameList";
import { CoinGameList } from "./CoinGameList";
import { HorseGameList } from "./HorseGameList";
import "./Profile.css"

export const Profile = ({player, playerId}) => {
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])
    const [cardGames, setCardGames] = useState([])
    const [playerDecks, setPlayerDecks] = useState([])
    const [dealerDecks, setDealerDecks] = useState([])
    const [showCoinGames, setShowCoinGames] = useState(true)
    const [showHorseGames, setShowHorseGames] = useState(false)
    const [showCardGames, setShowCardGames] = useState(false)
    const [selectedGameType, setSelectedGameType] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8088/coinGames?playerId=${playerId}&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setCoinGames(data)
            })
        fetch(`http://localhost:8088/horseGames?playerId=${playerId}&_expand=horse&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setHorseGames(data)
            })
        fetch(`http://localhost:8088/cardGames?playerId=${playerId}&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setCardGames(data)
            })
        fetch(`http://localhost:8088/playerDecks?_expand=card`)
            .then((res) => res.json())
            .then((data) => {
                setPlayerDecks(data)
            })
        fetch(`http://localhost:8088/dealerDecks?_expand=card`)
            .then((res) => res.json())
            .then((data) => {
                setDealerDecks(data)
            })
    }, []);

    useEffect(() => {
        if (selectedGameType === 1) {
            setShowCoinGames(true)
            setShowHorseGames(false)
            setShowCardGames(false)
        } else if (selectedGameType === 2) {
            setShowCoinGames(false)
            setShowHorseGames(true)
            setShowCardGames(false)
        } else {
            setShowCoinGames(false)
            setShowHorseGames(false)
            setShowCardGames(true)
        }
    }, [selectedGameType]);

    return (
        <>
        <div id="sidebar-container">
            <div id="profile-container">
                <h2 className="page-title">{player.name}</h2>
                <main id="main-content">
                    <div id="profile-content">
                        <section id="player-info">
                            <h3>Player Stats</h3>
                                <div>Total Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                                <div>Total Wins: {player.wins}</div>
                                <div>Total Losses: {player.losses}</div>
                        </section>
                    </div>
                </main>
            </div>
            <div id="game-space"></div>
        </div>
        <section id="game-info">
            <select 
                id="game--selector"
                onChange={(event) => setSelectedGameType(parseInt(event.target.value))}>
                <option value="1">Coin Games</option>
                <option value="2">Horse Races</option>
                <option value="3">Blackjack Games</option>
            </select>
            {showCoinGames ? (
                <article>
                    <ul>
                        {coinGames.map((coinGame) => <CoinGameList coinGame={coinGame} setCoinGames={setCoinGames} key={coinGame.id} />)}
                    </ul>
                </article>
            ) : ""}
            {showHorseGames ? (
                <article>
                    <ul>
                        {horseGames.map((horseGame) => <HorseGameList horseGame={horseGame} setHorseGames={setHorseGames} key={horseGame.id} />)}
                    </ul>
                </article>
            ) : ""}
            {showCardGames ? (
                <article>
                    <ul>
                        {cardGames.map((cardGame) => <CardGameList cardGame={cardGame} setCardGames={setCardGames} dealerDecks={dealerDecks} playerDecks={playerDecks} key={cardGame.id} />)}
                    </ul>
                </article>
            ) : ""}
        </section>
        </>
    )
} 