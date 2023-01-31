export const CoinGame = ({coinGame}) => {
    {
        return (coinGame.win ? (
            <li key={coinGame.id}>
                <h4>Win - {coinGame.choice}</h4>
                <div>Amount Gained: ${coinGame.amountBet}</div>
                <div>{coinGame.date}</div>
            </li>
        ) : (
            <li key={coinGame.id}>
                <h4>Loss - {coinGame.choice}</h4>
                <div>Amount Lost: ${coinGame.amountBet}</div>
                <div>{coinGame.date}</div>
            </li>
        ))
    }
}