import { Route, Routes } from "react-router-dom"
import { Games } from "./games/Games"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="games" element={ <Games /> } />
            {/* <Route path="funds" element={ <TicketContainer /> } />
            <Route path="profile" element={ <TicketContainer /> } /> */}
        </Routes>
    )
}