export const FeaturedHorseGameList = ({horseGame, setHorseGames}) => {
    return (horseGame.win ? (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game game--won">
            <h3 className="player-name">{horseGame?.player?.name}</h3>
            <h4>Win - {horseGame?.horse?.name}</h4>
            <div>Amount Gained: ${parseFloat(horseGame.newAmount).toFixed(2)}</div>
            <div>{horseGame.date}</div>
        </li>
    ) : (
        <li key={horseGame.id} id={`horse-game-${horseGame.id}`} class="player--game game--lost">
            <h3 className="player-name">{horseGame?.player?.name}</h3>
            <h4>Loss - {horseGame?.horse?.name}</h4>
            <div>Amount Lost: ${parseFloat(horseGame.amountBet).toFixed(2)}</div>
            <div>{horseGame.date}</div>
        </li>
    ))
}