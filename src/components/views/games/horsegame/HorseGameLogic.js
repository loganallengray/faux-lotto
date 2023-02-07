/* 
    have two arrays, one with the horses, and another with the chances of the horse winning
    the indexes of the two will match each other
    make a function that will choose a random number and decide who wins
    return a "result" object that has all information needed for the horse game page
*/

export const HorseGameLogic = (horses, chosenHorse) => {
    const result = {}

    const items = []
    const weights = []


    for (const horse of horses) {
        items.push(horse)
        weights.push(horse.chances)
    }

    const findWinner = (items, weights) => {
        // get the cumulative for each of the weights
        const cumulativeWeights = [];
        for (let i = 0; i < weights.length; i += 1) {
            cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
        }
    
        // get total of the weight
        const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];

        // randomize to see who wins
        const randomNumber = maxCumulativeWeight * Math.random();
    
        // find the first cumulative weight that is higher than the random number
        for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
            if (cumulativeWeights[itemIndex] >= randomNumber) {
                // return the winning horse
                return items[itemIndex]
            }
        }
    }

    const winner = findWinner(items, weights)
    result.horse = winner

    if (winner === chosenHorse) {
        result.win = true
    } else {
        result.win = false
    }

    return result
}