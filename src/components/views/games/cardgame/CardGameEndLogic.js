export const CardGameEndLogic = (gameProps, setGameProps, results, setResult, setGameProgress, sendToApi) => {
    let result = {...results};

    const playerDistance = 21 - gameProps.playerSum
    const dealerDistance = 21 - gameProps.dealerSum

    if (playerDistance > 0) {
        if (dealerDistance >= 0) {
            result.win = playerDistance < dealerDistance
        } else {
            result.win = true
        }
    } else if (playerDistance === 0) {
        result.win = true
    } else {
        result.win = false
    }

    setResult(result)
    setGameProps(gameProps)
    setGameProgress(3)
    sendToApi(result, gameProps)
}