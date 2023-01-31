export const HorseGame = ({horseGame}) => {
    {
        return (horseGame.win ? (
            <li key={horseGame.id}>
                <h4>Win - {horseGame?.horse?.name}</h4>
                <div>Amount Gained: ${horseGame.amountBet}</div>
                <div>{horseGame.date}</div>
            </li>
        ) : (
            <li key={horseGame.id}>
                <h4>Loss - {horseGame?.horse?.name}</h4>
                <div>Amount Lost: ${horseGame.amountBet}</div>
                <div>{horseGame.date}</div>
            </li>
        ))
    }
}