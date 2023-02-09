import { useEffect, useState } from "react";
import { CoinGameList } from "./CoinGameList";
import { HorseGameList } from "./HorseGameList";
import "./Profile.css"

export const Profile = ({player, playerId}) => {
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])
    const [showCoinGames, setShowCoinGames] = useState(true)
    const [showHorseGames, setShowHorseGames] = useState(false)
    const [selectedGameType, setSelectedGameType] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8088/coinGames?playerId=${playerId}`)
            .then((res) => res.json())
            .then((data) => {
                setCoinGames(data)
            })
        fetch(`http://localhost:8088/horseGames?playerId=${playerId}&_expand=horse`)
            .then((res) => res.json())
            .then((data) => {
                setHorseGames(data)
            })
    }, []);

    useEffect(() => {
        if (selectedGameType === 1) {
            setShowCoinGames(true)
            setShowHorseGames(false)
        } else if (selectedGameType === 2) {
            setShowCoinGames(false)
            setShowHorseGames(true)
        }
    }, [selectedGameType]);

    return (
        <div id="sidebar-container">
            <div id="profile-container">
                <h2>{player.name}</h2>
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
            <section id="game-info">
                {showCoinGames ? (
                    <article>
                        <button
                            className="game--selector"
                            onClick={() => {
                                setSelectedGameType(2)
                            }}
                        >Show Horse Races</button>
                        <h3>Coin Games</h3>
                        <ul>
                            {coinGames.map((coinGame) => <CoinGameList coinGame={coinGame} setCoinGames={setCoinGames} key={coinGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
                {showHorseGames ? (
                    <article>
                        <button
                            className="game--selector"
                            onClick={() => {
                                setSelectedGameType(1)
                            }}
                        >Show Coin Games</button>
                        <h3>Horse Races</h3>
                        <ul>
                            {horseGames.map((horseGame) => <HorseGameList horseGame={horseGame} setHorseGames={setHorseGames} key={horseGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
            </section>
        </div>
    )
} 