import { Route, Routes } from "react-router-dom"
import { Funds } from "./funds/Funds"
import { CoinGame } from "./games/CoinGame"
import { Games } from "./games/Games"
import { Profile } from "./profile/Profile"

export const ApplicationViews = () => {
    const localLottoUser = localStorage.getItem("lotto_user")
    const lottoUserObject = JSON.parse(localLottoUser)

    return (
        <Routes>
            <Route path="games" element={ <Games /> } />
            <Route path="coingame" element={<CoinGame />} />
            <Route path="funds" element={ <Funds playerUser={lottoUserObject} /> } />
            <Route path="profile" element={ <Profile playerUser={lottoUserObject} /> } />
        </Routes>
    )
}