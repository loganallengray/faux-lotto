import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            <ul className="navbar">
                <li 
                    id="navbar__home__container"
                    className="navbar__item navbar__home active">
                    <div
                        onClick={() => {navigate("/")}}
                    ><p id="navbar__home">Faux Lotto</p></div>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/games"><p>Games</p></Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/funds"><p>Funds</p></Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/profile"><p>Profile</p></Link>
                </li>
                {
                    localStorage.getItem("lotto_user")
                    ? <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("lotto_user")
                                navigate("/", {replace: true})
                            }}><p>Logout</p></Link>
                        </li>
                        : ""
                    }
            </ul>
            <div id="navbar-space"></div>
        </>
    )
}