import { useEffect, useState } from "react"
import { FeaturedCardGameList } from "./FeaturedCardGameList"
import { FeaturedCoinGameList } from "./FeaturedCoinGameList"
import { FeaturedHorseGameList } from "./FeaturedHorseGameList"
import "./HomePage.css"

export const HomePage = (player, setPlayer) => {
    const [coinGames, setCoinGames] = useState([])
    const [horseGames, setHorseGames] = useState([])
    const [cardGames, setCardGames] = useState([])
    const [playerDecks, setPlayerDecks] = useState([])
    const [dealerDecks, setDealerDecks] = useState([])
    const [showCoinGames, setShowCoinGames] = useState(true)
    const [showHorseGames, setShowHorseGames] = useState(false)
    const [showCardGames, setShowCardGames] = useState(false)
    const [selectedGameType, setSelectedGameType] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8088/coinGames?featured=true&_expand=player&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setCoinGames(data)
            })
        fetch(`http://localhost:8088/horseGames?featured=true&_expand=player&_expand=horse&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setHorseGames(data)
            })
        fetch(`http://localhost:8088/cardGames?featured=true&_expand=player&_sort=id&_order=desc`)
            .then((res) => res.json())
            .then((data) => {
                setCardGames(data)
            })
        fetch(`http://localhost:8088/playerDecks?_expand=card`)
            .then((res) => res.json())
            .then((data) => {
                setPlayerDecks(data)
            })
        fetch(`http://localhost:8088/dealerDecks?_expand=card`)
            .then((res) => res.json())
            .then((data) => {
                setDealerDecks(data)
            })
    }, []);

    useEffect(() => {
        if (selectedGameType === 1) {
            setShowCoinGames(true)
            setShowHorseGames(false)
            setShowCardGames(false)
        } else if (selectedGameType === 2) {
            setShowCoinGames(false)
            setShowHorseGames(true)
            setShowCardGames(false)
        } else {
            setShowCoinGames(false)
            setShowHorseGames(false)
            setShowCardGames(true)
        }
    }, [selectedGameType]);

    return (
        <>
        <div id="sidebar-container">
            <div id="home-QA-container">
                <h2>Welcome to Faux Lotto!</h2>
                <main id="main-content">
                    <div className="home-QA">
                        <h3>What is Faux Lotto?</h3>
                        <p>Faux Lotto is a website for people who are underage, don't have money, or just want to feel the thrill of gambling without any of the consequences!</p>
                    </div>
                    <div className="home-QA">
                        <h3>How do I start?</h3>
                        <p>First you'll need some money to bet with. Click on "Funds" in the bar up top. Once there you're able to add fake currency to your account.</p>
                    </div>
                    <div className="home-QA">
                        <h3>Ok. How do I gamble though?</h3>
                        <p>Once you've got some money, you can go to the games page, where you can select from a list of games to bet on. From there you just make a choice and then choose an amount to bet.</p>
                    </div>
                    <div className="home-QA">
                        <h3>What's the Profile in the top bar for?</h3>
                        <p>That is your profile. You use it to look at your stats, like how much money you currently have, or how many games you've won or lost total. You can also use it to look at your previously played games, where you can leave them be, delete them, or feature them on the front page for all to see.</p>
                    </div>
                    <div className="home-QA">
                        <h3>How do I feature or delete a game I've played?</h3>
                        <p>You click on the feature button to feature it. If you've featured a game by mistake, you can easily unfeature it by pressing the button again. You delete a game by pressing the delete button. Once you delete a game, it cannot be recovered.</p>
                    </div>
                </main>
            </div>
            <div id="game-space"></div>
        </div>
            <section id="game-info">
                <select 
                    id="game--selector"
                    onChange={(event) => setSelectedGameType(parseInt(event.target.value))}>
                    <option value="1">Coin Games</option>
                    <option value="2">Horse Races</option>
                    <option value="3">Blackjack Games</option>
                </select>
                {showCoinGames ? (
                    <article>
                        <ul>
                            {coinGames.map((coinGame) => <FeaturedCoinGameList coinGame={coinGame} setCoinGames={setCoinGames} key={coinGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
                {showHorseGames ? (
                    <article>
                        <ul>
                            {horseGames.map((horseGame) => <FeaturedHorseGameList horseGame={horseGame} setHorseGames={setHorseGames} key={horseGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
                {showCardGames ? (
                    <article>
                        <ul>
                            {cardGames.map((cardGame) => <FeaturedCardGameList cardGame={cardGame} dealerDecks={dealerDecks} playerDecks={playerDecks} key={cardGame.id} />)}
                        </ul>
                    </article>
                ) : ""}
            </section>
            </>
    )
}