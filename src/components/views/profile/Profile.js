import { useEffect, useState } from "react";
import { CoinGame } from "./CoinGame";
import { HorseGame } from "./HorseGame";

export const Profile = () => {
    const [player, setPlayer] = useState({})
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])

    const localLottoUser = localStorage.getItem("lotto_user")
    const lottoUserObject = JSON.parse(localLottoUser)

    useEffect(() => {
        fetch(`http://localhost:8088/players?id=${lottoUserObject.id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer(data[0])
            })
        fetch(`http://localhost:8088/coinGames?playerId=${lottoUserObject.id}`)
            .then((res) => res.json())
            .then((data) => {
                setCoinGames(data)
            })
        fetch(`http://localhost:8088/horseGames?playerId=${lottoUserObject.id}&_expand=horse`)
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
                    <div>Total Currency: ${player.currency}</div>
                    <div>Total Wins: {player.wins}</div>
                    <div>Total Losses: {player.losses}</div>
                </ul>
            </section>
            <section>
                <article>
                    <h3>Coin Games</h3>
                    <ul>
                        {coinGames.map((coinGame) => <CoinGame coinGame={coinGame} />)}
                    </ul>
                </article>
                <article>
                    <h3>Horse Races</h3>
                    <ul>
                        {horseGames.map((horseGame) => <HorseGame horseGame={horseGame} />)}
                    </ul>
                </article>
            </section>
        </>
    )
} 