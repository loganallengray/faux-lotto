import { Route, Routes } from "react-router-dom"
import { Funds } from "./funds/Funds"
import { Games } from "./games/Games"
import { Profile } from "./profile/Profile"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="games" element={ <Games /> } />
            <Route path="funds" element={ <Funds /> } />
            <Route path="profile" element={ <Profile /> } />
        </Routes>
    )
}