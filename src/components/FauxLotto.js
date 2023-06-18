/* Holds Routes for Navbar, and all pages and views */

import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Authorized } from "./views/Authorized"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./views/ApplicationViews"
import "./FauxLotto.css"

export const FauxLotto = () => {
    return (
        // This is where the entire app is started, at the Login page, where you can log in and enter the rest of the site, or register a new account and be put into the site automatically after creating the account
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={
                // After being authorized as a user, you are sent to the actual app, which has a navbar element at the top at all times, and different application views displayed beneath
                <Authorized>
                    <>
                        <NavBar />
                        <ApplicationViews />
                    </>
                </Authorized>
            } />
        </Routes>
    )
}