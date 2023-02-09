import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Funds } from "./funds/Funds"
import { CoinGame } from "./games/coingame/CoinGame"
import { Games } from "./games/Games"
import { HorseGame } from "./games/horsegame/HorseGame"
import { HomePage } from "./HomePage"
import { Profile } from "./profile/Profile"

export const ApplicationViews = () => {
    const [player, setPlayer] = useState({})

    const localLottoUser = localStorage.getItem("lotto_user")
    const lottoUserObject = JSON.parse(localLottoUser)

    useEffect(() => {
        fetch(`http://localhost:8088/players?id=${lottoUserObject.id}`)
            .then((res) => res.json())
            .then((data) => {
                setPlayer(data[0])
            })
    }, []);

    return (
        <div id="page-content">
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="games" element={ <Games /> } />
                <Route path="coingame" element={<CoinGame player={player} setPlayer={setPlayer} />} />
                <Route path="horsegame" element={<HorseGame player={player} setPlayer={setPlayer} />} />
                <Route path="funds" element={ <Funds player={player} setPlayer={setPlayer} /> } />
                <Route path="profile" element={ <Profile player={player} playerId={lottoUserObject.id} /> } />
            </Routes>
        </div>
    )
}