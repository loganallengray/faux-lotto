import { useEffect, useState } from "react"
import { FeaturedCoinGameList } from "./FeaturedCoinGameList"
import { FeaturedHorseGameList } from "./FeaturedHorseGameList"
import "./HomePage.css"

export const HomePage = (player, setPlayer) => {
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])
    const [showCoinGames, setShowCoinGames] = useState(true)
    const [showHorseGames, setShowHorseGames] = useState(false)
    const [selectedGameType, setSelectedGameType] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8088/coinGames?featured=true&_expand=player&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setCoinGames(data)
            })
        fetch(`http://localhost:8088/horseGames?featured=true&_expand=player&_expand=horse&_sort=id&_order=desc`)
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
            <div>
                <h2>Welcome to Faux Lotto!</h2>
                <main id="main-content">
                    <p>Select a game to play from the Games page, but not before you add some funds to your account on the Funds page!</p>
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
                            {coinGames.map((coinGame) => <FeaturedCoinGameList coinGame={coinGame} setCoinGames={setCoinGames} key={coinGame.id} />)}
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
                            {horseGames.map((horseGame) => <FeaturedHorseGameList horseGame={horseGame} setHorseGames={setHorseGames} key={horseGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
            </section>
        </div>
    )
}