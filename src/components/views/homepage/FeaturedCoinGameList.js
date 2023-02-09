export const FeaturedCoinGameList = ({coinGame, setCoinGames}) => {
    return (coinGame.win ? (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game game--won">
            <h3 className="player-name">{coinGame?.player?.name}</h3>
            <h4>Win - {coinGame.choice}</h4>
            <div>Amount Gained: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div>{coinGame.date}</div>
        </li>
    ) : (
        <li key={coinGame.id} id={`coin-game-${coinGame.id}`} class="player--game game--lost">
            <h3 className="player-name">{coinGame?.player?.name}</h3>
            <h4>Loss - {coinGame.choice}</h4>
            <div>Amount Lost: ${parseFloat(coinGame.amountBet).toFixed(2)}</div>
            <div>{coinGame.date}</div>
        </li>
    ))
}