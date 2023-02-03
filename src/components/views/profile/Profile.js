import { useEffect, useState } from "react";
import { CoinGameList } from "./CoinGameList";
import { HorseGameList } from "./HorseGameList";

export const Profile = ({player, playerId}) => {
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])

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

    return (
        <>
            <h2>{player.name}</h2>
            <section>
                <h3>Player Stats</h3>
                <ul>
                    <div>Total Currency: ${parseFloat(player.currency).toFixed(2)}</div>
                    <div>Total Wins: {player.wins}</div>
                    <div>Total Losses: {player.losses}</div>
                </ul>
            </section>
            <section>
                <article>
                    <h3>Coin Games</h3>
                    <ul>
                        {coinGames.map((coinGame) => <CoinGameList coinGame={coinGame} setCoinGames={setCoinGames} key={coinGame.id} />)}
                    </ul>
                </article>
                <article>
                    <h3>Horse Races</h3>
                    <ul>
                        {horseGames.map((horseGame) => <HorseGameList horseGame={horseGame} setHorseGames={setHorseGames} key={horseGame.id} />)}
                    </ul>
                </article>
            </section>
        </>
    )
} 