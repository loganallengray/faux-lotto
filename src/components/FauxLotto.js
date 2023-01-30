/* Holds Routes for Navbar, and all pages and views */

import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Authorized } from "./views/Authorized"

export const FauxLotto = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={
                <Authorized>
                    <>
                        {/* <NavBar />
                        <ApplicationViews /> */}
                    </>
                </Authorized>
                
            } />
	    </Routes>
    )
}