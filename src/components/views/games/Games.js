import { Link } from "react-router-dom"
import "./Games.css"

export const Games = () => {
    return (
        <>
            <h2 className="page-title">Game List</h2>
            <main id="main-content">
                <section id="game-box-container">
                    <article className="game-box">
                        <Link to="/coingame"><h3>Coin Flip</h3></Link>
                        <p>Call the correct side and you double your money!</p>
                    </article>
                    <article className="game-box">
                        <Link to="/horsegame"><h3>Horse Race</h3></Link>
                        <p>Choose a horse to bet on, riskier bets have better payouts!</p>
                    </article>
                </section>
            </main>
        </>
    )
}