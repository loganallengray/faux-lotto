export const CardGameEndLogic = (gameProps, setGameProps, results, setResult, setGameProgress) => {
    let result = {...results};

    const playerDistance = 21 - gameProps.playerSum
    const dealerDistance = 21 - gameProps.dealerSum

    if (gameProps.dealerSum > 21) {
        result.win = true
        if (gameProps.playerSum > 21) {
            result.win = false
        }
    } else if (!(gameProps.playerSum > 21)) {
        result.win = playerDistance < dealerDistance
    }

    setResult(result)
    setGameProps(gameProps)
    setGameProgress(3)
}