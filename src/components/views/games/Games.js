import { Link } from "react-router-dom"

export const Games = () => {
    return (
        <>
            <h2>Game List</h2>
            <section>
                <article>
                    <Link to="/coingame"><h3>Coin Flip</h3></Link>
                    <p>Call the correct side and you double your money!</p>
                </article>
                <article>
                    <Link to=""><h3>Horse Race</h3></Link>
                    <p>Choose a horse to bet on, riskier bets have better payout!</p>
                </article>
            </section>
        </>
    )
}