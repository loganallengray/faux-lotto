/* 
    Define empty result object
    Get a random true or false through Math methods
    if true, heads, if false, tails
    add the result of the flip to the result object
    if the flip matches the call add win: true to the result object
    if not, add result: false to the result object
    return a copy of the result array
*/

export const CoinGameLogic = (userCall) => {
    const result = {}

    if (userCall) {
        result.choice = "Heads"
    } else {
        result.choice = "Tails"
    }

    const flip = Math.floor(Math.random() * 2) == 0

    if (flip) {
        result.flip = "Heads"
    } else {
        result.flip = "Tails"
    }

    if (flip === userCall) {
        result.win = true
    } else {
        result.win = false
    }

    return result
}