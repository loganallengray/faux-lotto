import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    // Checks if the user has been authorized
    if (localStorage.getItem("lotto_user")) {
        // If authorized, return all of the application views in the app
        return children
    }
    else {
        // If not authorized, sends you back to the login page
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}
